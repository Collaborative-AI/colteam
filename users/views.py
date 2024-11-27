from django.views.decorators.cache import cache_page
from django.core.cache import cache
import enums
from auths.token_auth import get_token_from_request
from colteam.settings import CELERY_BROKER_URL
from .models import CustomUser, ApiKey
from rest_framework import generics
from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny
from rest_framework.decorators import permission_classes
from .serializers import *
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView, TokenViewBase
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from datetime import timedelta
from enums.messageEnums import *
from rest_framework.request import Request
from django.contrib.auth.hashers import make_password
from django.contrib.auth.hashers import check_password
from rest_framework_jwt.utils import jwt_decode_handler
from django.http import QueryDict
import random
import string
from django.core.mail import *
from colteam import settings
from django.core import signing
from django.utils.html import format_html
from .forms import SearchForm
from django.utils import timezone
from django.http import HttpResponseRedirect
from celery import Celery
import secrets, uuid, hashlib, time, os
from rest_framework.response import Response

app = Celery('users', broker=CELERY_BROKER_URL)


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        # 在 response 的内容中增加了 user_id
        # response.data['user_id'] = self
        return response


class LoginView(TokenObtainPairView):
    serializer_class = LoginSerializer


class RegisterView(TokenViewBase):
    permission_classes = ()
    authentication_classes = ()
    serializer_class = CustomUserSerializer

    @classmethod
    def register(cls, request: QueryDict):
        try:
            # 判断是否已经包含此用户名
            user = CustomUser.objects.filter(email=request.get('username')).first()
            if user is not None:
                if user.is_active:
                    return JsonResponse({'Duplicated': 'User already exists!'}, status=status.HTTP_409_CONFLICT)
                else:
                    verification_code = generate_verification_code()
                    user.verify_code = verification_code
                    user.send_code_time = timezone.now()
                    user.save()

                    send_verify_email(user.username, verification_code)
                    return JsonResponse(user.username, status=status.HTTP_200_OK, safe=False)
            elif user is None:
                request.__setitem__('email', request.get('username'))
                request.__setitem__('password', make_password(request.get('password')))
                request.__setitem__('is_active', False)
                verification_code = generate_verification_code()
                request.__setitem__('verify_code', verification_code)
                request.__setitem__('send_code_time', timezone.now())
                serializer = CustomUserSerializer(data=request)
                if serializer.is_valid():
                    user = serializer.save()
                    user_info = {
                        'id': user.id,
                        'username': user.username,
                    }

                    send_verify_email.delay(user.username, verification_code)
                    return JsonResponse(user_info, status=status.HTTP_201_CREATED)
                return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            else:
                verification_code = generate_verification_code()
                user.verify_code = verification_code
                user.password = make_password(request.get('password'))
                user.send_code_time = timezone.now()
                user.save()
                send_verify_email.delay(user.username, verification_code)
                user_info = {
                    'id': user.id,
                    'username': user.username,
                }
                return JsonResponse(user_info, status=status.HTTP_201_CREATED)

        except Exception as exc:
            return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request: Request, *args, **kwargs) -> JsonResponse:
        try:
            # super().post(request, *args, **kwargs)
            return self.register(request.data)
        except Exception as exc:
            return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def update_user_profile_by_id(request):
    try:
        update_data = request.data
        # serializer = CustomUserSerializer(data=update_data)
        # if serializer.is_valid():  
        # get user id from access token
        user_token = get_token_from_request(request)
        user_id = jwt_decode_handler(user_token)['user_id']
        user = CustomUser.objects.get(id=user_id)
        if 'home_address' in update_data:
            user.location = update_data['home_address']
        if 'research_interests' in update_data:
            user.research_interests = update_data['research_interests']
        if 'phone_number' in update_data:
            user.phone_number = update_data['phone_number']
        user.save()
        user_info = {
            'username': user.username,
            'home_address': user.location,
            'research_interests': user.research_interests,
            'phone_number': user.phone_number
        }
        return JsonResponse(user_info, status=status.HTTP_200_OK, safe=False)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


# TODO: serializer没变
@api_view(['GET'])
@cache_page(60 * 15)  # 缓存 15 分钟
def view_user_profile_by_id(request):
    try:
        user_token = get_token_from_request(request)
        user_id = jwt_decode_handler(user_token)['user_id']
        user = CustomUser.objects.get(id=user_id)
        serializer = CustomUserSerializer(user, many=False)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def change_password(request):
    try:
        json_data = request.data
        user_token = get_token_from_request(request)
        user_id = jwt_decode_handler(user_token)['user_id']
        user = CustomUser.objects.get(id=user_id)
        is_password_correct = check_password(json_data['old_password'], user.password)
        if is_password_correct:
            user.password = make_password(json_data['new_password'])
            user.save()
            return JsonResponse('You have successfully changed your password', status=status.HTTP_200_OK, safe=False)
        else:
            return JsonResponse('Old password is incorrect, please try again', status=status.HTTP_401_UNAUTHORIZED,
                                safe=False)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout(request):
    try:
        # set access token expired
        user_token = get_token_from_request(request)
        if user_token:
            user_access_token = AccessToken(user_token)
            user_access_token.set_exp(lifetime=timedelta(microseconds=1))
            cache.set(user_access_token, True, timeout=18000)
        # set refresh token expired (add it to blacklist)
        # refresh = json_data['refresh']
        # user_refresh_token = RefreshToken(refresh)
        # user_refresh_token.blacklist()
        return JsonResponse({'code': MessageType.LOGOUT_SUCCESSFULLY.value},
                            status=status.HTTP_205_RESET_CONTENT)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def search(request):
    try:
        form = SearchForm(request.data)
        results = []

        if form.is_valid():
            search_term = form.cleaned_data['search_term']
            if search_term:
                # Serialize the queryset to a list of dictionaries
                results = list(CustomUser.objects.filter(username=search_term).values('id', 'username', 'email'))

        return JsonResponse({
            'form_errors': form.errors if not form.is_valid() else None,
            'results': results
        }, status=status.HTTP_200_OK)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


# 模糊查询
@api_view(['POST'])
def fuzzy_search(request):
    try:
        form = SearchForm(request.data)
        results = []

        if form.is_valid():
            search_term = form.cleaned_data['search_term']
            if search_term:
                # Serialize the queryset to a list of dictionaries and limit to 10 results
                results = list(CustomUser.objects.filter(username__icontains=search_term).values('id', 'username', 'email')[:10])

        return JsonResponse({
            'form_errors': form.errors if not form.is_valid() else None,
            'results': results
        }, status=status.HTTP_200_OK)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CustomUser.objects.all().order_by('-date_joined')  # 使用自定义用户模型
    serializer_class = CustomUserSerializer


def generate_verification_code(length=6):
    characters = string.digits
    return ''.join(random.choice(characters) for _ in range(length))


@app.task(bind=False, ignore_result=True)
def send_verify_email(user_info, verification_code):
    serialized_data = signing.dumps(verification_code)
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [user_info]
    subject = 'Collaborative-AI email verification.'
    activation_link = f"http://127.0.0.1:8000/users/activate/{serialized_data}/"
    suffix_first = 'Sincerely,'
    suffix = "Colteam."
    html_message = format_html(
        "<html><body><h4>Thank you for joining our community.</h4><p>Please Click <a href='{}'>Here</a> to activate "
        "your account.</p><p>{}</p><p>{}</p></body></html>",
        activation_link, suffix_first, suffix
    )
    return send_mail(subject, "", email_from, recipient_list, html_message=html_message)


# TODO: 注释需调整
@api_view(['POST'])
# @authentication_classes([])
@permission_classes([AllowAny])
def resend_verify_email(request):
    try:
        user_data = request.data
        user = CustomUser.objects.get(username=user_data['username'])
        if user is None:
            return JsonResponse({'Not Exist': 'User is not exists!'}, status=status.HTTP_401_UNAUTHORIZED, safe=False)
        verification_code = generate_verification_code()
        user.verify_code = verification_code
        user.send_code_time = timezone.now()
        user.save()
        return JsonResponse('Your verify email has been successfully send, please check your email.',
                            status=status.HTTP_200_OK, safe=False)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST, safe=False)


# TODO: Return a front-end page
def activate_account(request, token):
    try:
        decoded_token = signing.loads(token)
        user = CustomUser.objects.get(verify_code=decoded_token)
        code_send_time = user.send_code_time
        verify_time = timezone.now()
        time_limit = timedelta(seconds=10 * 60)
        if ((verify_time - code_send_time) > time_limit):
            return JsonResponse({'message': str('verify code expired')}, status=status.HTTP_400_BAD_REQUEST)
        user.is_active = True
        user.save()
        return HttpResponseRedirect('http://localhost:3000/log_in')
    except CustomUser.DoesNotExist:
        return JsonResponse('Verification failed, please try again.', status=status.HTTP_400_BAD_REQUEST, safe=False)
    # 收到验证消息失败的时候的时候前端再跳转回注册页面
    # 如果验证失败则不做任何操作，前端不跳转且把验证按钮重新enable，如果成功则将数据库中is_active变成true


@api_view(['POST'])
@permission_classes([AllowAny])
def send_reset_password_email(request):
    try:
        user_data = request.data
        user = CustomUser.objects.get(username=user_data['email'])

        if user is None:
            return JsonResponse({'Not Exist': 'User is not exists!'}, status=status.HTTP_400_BAD_REQUEST, safe=False)

        email_from = settings.EMAIL_HOST_USER
        recipient_list = [user.username]
        user_id = signing.dumps(user.id)
        # print(signing.loads(user_id))
        subject = 'Collaborative-AI reset password.'
        reset_link = f"http://127.0.0.1:3000/reset_passwd/{user_id}/"
        suffix_first = 'Sincerely,'
        suffix = "Colteam."

        html_message = format_html(
            "<html><body><h4>Thank you for visiting Collaborative-AI, here is the link to reset your password:</h4>"
            "<p>Please click <a href='{}'>here</a> to reset your password.</p>"
            "<p>{}</p><p>{}</p></body></html>",
            reset_link, suffix_first, suffix
        )
        send_mail(subject, "", email_from, recipient_list, html_message=html_message)
        print('Your password reset email has been successfully send, please check your email.')
        return JsonResponse('Your password reset email has been successfully send, please check your email.',
                            status=status.HTTP_200_OK, safe=False)
        # return HttpResponseRedirect('http://localhost:3000/log_in')
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST, safe=False)


@api_view(['POST'])
@permission_classes([AllowAny])
def reset_password(request):
    try:
        json_data = request.data
        user_id = json_data['userid']
        user = CustomUser.objects.get(id=user_id)
        if user is None:
            return JsonResponse({'Not Exist': 'User is not exists!'}, status=status.HTTP_401_UNAUTHORIZED, safe=False)
        user.password = make_password(json_data['new_password'])
        user.save()
        return JsonResponse('Your password has been successfully reset.',
                            status=status.HTTP_200_OK, safe=False)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


# TODO: need to add user id into the api key
# TODO: add the permission into the api key
@api_view(['POST'])
def generate_api_key(request):
    try:
        # get user id from access token
        user_token_auth = get_token_from_request(request)
        user_id_auth = jwt_decode_handler(user_token_auth)['user_id']
        user_auth = CustomUser.objects.get(id=user_id_auth)
        # create api key
        key = create_api_key(user_auth.username)
        # save api key into database
        api_key = ApiKey(user=user_auth, key=key)
        api_key.save()
        data = {"key": key}
        return JsonResponse(data, status=status.HTTP_200_OK)
        # return JsonResponse('Your successfully create a api.',
        #                     status=status.HTTP_200_OK, safe=False)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)
    # return secrets.token_urlsafe(32)


# create random api key which is related to the user
def create_api_key(username):
    random_str = os.urandom(16)
    current_time = timezone.now().strftime('%Y%m%d%H%M%S').encode('utf-8')
    raw_key = username.encode('utf-8') + random_str + current_time
    return hashlib.sha256(raw_key).hexdigest()


@api_view(['GET'])
def list_api_key(request):
    try:
        # get user id from access token
        user_token_auth = get_token_from_request(request)
        user_id_auth = jwt_decode_handler(user_token_auth)['user_id']
        user_auth = CustomUser.objects.get(id=user_id_auth)
        # find all api key related to the user
        api_key_list = ApiKey.objects.filter(user=user_auth)
        serializer = ApiKeySerializer(api_key_list, many=True)
        # return api key list
        return JsonResponse(serializer.data, status=status.HTTP_200_OK, safe=False)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def delete_api_key(request):
    try:
        # get user id from access token
        user_token_auth = get_token_from_request(request)
        user_id_auth = jwt_decode_handler(user_token_auth)['user_id']
        user_auth = CustomUser.objects.get(id=user_id_auth)

        key = request.data.get('api_key')
        key_data = ApiKey.objects.get(user=user_auth, key=key)
        if key_data:
            key_data.delete()
            return Response({'message': 'Delete API key successfully'}, status=status.HTTP_200_OK)

    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([AllowAny])
def test(request):
    authorization_header = request.META.get('HTTP_API_KEY', '')#APIKEY
    print("here==="+authorization_header)
    auth_type, key = authorization_header.split()
    if auth_type.lower() == 'apikey':
        print("test==="+key)
    api_key = ApiKey.objects.get(key=key)
    if api_key.is_active:
        print("active==="+api_key.user.username)
    return Response({'message': 'test successfully'}, status=status.HTTP_200_OK)
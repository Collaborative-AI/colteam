import enums
from .models import CustomUser
from rest_framework import generics
from rest_framework import viewsets, status
from .serializers import CustomUserSerializer, MyTokenObtainPairSerializer, LoginSerializer
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView, TokenViewBase
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from datetime import timedelta
from enums.messageEnums import *
from rest_framework.request import Request
from django.contrib.auth.hashers import make_password
from rest_framework_jwt.utils import jwt_decode_handler
from django.http import QueryDict
import random
import string
from django.core.mail import *
from colteam import settings
from django.core import signing
from django.utils.html import format_html
from .forms import SearchForm


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
            request = request.copy()
            # 判断是否已经包含此用户名
            user = CustomUser.objects.filter(email=request.get('username')).first()
            if user is not None:
                return JsonResponse({'Duplicated': 'User already exists!'}, status=status.HTTP_409_CONFLICT)
            request.__setitem__('email', request.get('username'))
            request.__setitem__('password', make_password(request.get('password')))
            request.__setitem__('is_active', False)
            verification_code = generate_verification_code()
            request.__setitem__('verify_code', verification_code)
            serializer = CustomUserSerializer(data=request)
            if serializer.is_valid():
                user = serializer.save()
                user_info = {
                    'id': user.id,
                    'username': user.username,
                }
                send_verify_email(user, verification_code)
                return JsonResponse(user_info, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as exc:
            return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request: Request, *args, **kwargs) -> JsonResponse:
        try:
            super().post(request, *args, **kwargs)
            return self.register(request.data)
        except Exception as exc:
            return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


# class UserView(generics.GenericAPIView):

def get_token_from_request(request):
    authorization_header = request.META.get('HTTP_AUTHORIZATION', '')

    if not authorization_header:
        return None  # 如果请求头中没有 Authorization 字段，则返回 None

    try:
        auth_type, token = authorization_header.split()
        if auth_type.lower() == 'bearer':
            return token
        else:
            return None  # 如果认证类型不是 'token'，则返回 None
    except ValueError:
        return None  # 如果请求头无法分割成两部分（认证类型和令牌），则返回 None


@api_view(['POST'])
def update_user_profile_by_id(request):
    try:
        update_data = JSONParser().parse(request)
        serializer = CustomUserSerializer(data=update_data)
        if serializer.is_valid():
            # get user id from access token
            user_token = get_token_from_request(request)
            user_id = jwt_decode_handler(user_token)['user_id']
            user = CustomUser.objects.get(id=user_id)
            serializer.update(user, request.data)
            return JsonResponse({'code': MessageType.UPDATE_SUCCESSFULLY.value},
                                status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def view_user_profile_by_id(request):
    try:
        json_data = JSONParser().parse(request)
        user_token = get_token_from_request(request)
        user_id = jwt_decode_handler(user_token)['user_id']
        user = CustomUser.objects.get(id=user_id)
        serializer = CustomUserSerializer(user, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def change_password(request):
    try:
        json_data = JSONParser().parse(request)
        user_token = get_token_from_request(request)
        user_id = jwt_decode_handler(user_token)['user_id']
        user = CustomUser.objects.get(id=user_id)
        user.set_password(make_password(json_data['password']))
        user.save()
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout(request):
    try:
        json_data = JSONParser().parse(request)
        # set access token expired
        access = json_data['access']
        user_access_token = AccessToken(access)
        user_access_token.set_exp(lifetime=timedelta(microseconds=1))
        # set refresh token expired (add it to blacklist)
        refresh = json_data['refresh']
        user_refresh_token = RefreshToken(refresh)
        user_refresh_token.blacklist()
        return JsonResponse({'code': MessageType.LOGIN_SUCCESSFULLY.value},
                            status=status.HTTP_205_RESET_CONTENT)
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
    send_mail(subject, "", email_from, recipient_list, html_message=html_message)


# TODO: Return a front-end page
# TODO: Add verify time limit
def activate_account(request, token):
    try:
        decoded_token = signing.loads(token)
        user = CustomUser.objects.get(verify_code=decoded_token)
        if user is not None:
            user.is_active = True
            user.save()
            return JsonResponse("Your account is activated, Thank you", status=status.HTTP_200_OK, safe=False)
        else:
            return JsonResponse({'verification code failed'}, status=status.HTTP_400_BAD_REQUEST, safe=False)
    except CustomUser.DoesNotExist:
        return JsonResponse({'verification code false'}, status=status.HTTP_400_BAD_REQUEST, safe=False)


@api_view(['POST'])
def search(request):
    try:
        form = SearchForm(request.GET)
        results = []

        if form.is_valid():
            search_term = form.cleaned_data['search_term']
            if search_term:
                results = CustomUser.objects.filter(username=search_term)

        return JsonResponse({'form': form, 'results': results}, status=status.HTTP_200_OK)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


# 模糊查询
@api_view(['POST'])
def fuzzy_search(request):
    try:
        form = SearchForm(request.GET)
        results = []

        if form.is_valid():
            search_term = form.cleaned_data['search_term']
            if search_term:
                # 只返回前十个
                results = CustomUser.objects.filter(username__icontains=search_term)[:10]

        return JsonResponse({'form': form, 'results': results}, status=status.HTTP_200_OK)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)

from .models import CustomUser
from rest_framework import generics
from rest_framework import viewsets, status
from .serializers import CustomUserSerializer, MyTokenObtainPairSerializer, LoginSerializer
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView, TokenViewBase
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from datetime import timedelta
from enums.messageEnums import *
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from django.contrib.auth.hashers import make_password
from rest_framework_jwt.utils import jwt_decode_handler


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

    @api_view(['POST'])
    def register(self, request):
        try:
            register_data = JSONParser().parse(request)
            register_data['password'] = make_password(register_data['password'])
            serializer = CustomUserSerializer(data=register_data)
            if serializer.is_valid():
                user = serializer.save()
                user_info = {
                    'id': user.id,
                    'username': user.username,
                }
                return JsonResponse(user_info, status=status.HTTP_201_CREATED)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as exc:
            return JsonResponse({'message': str(exc)}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request, *args, **kwargs):
        # 覆盖 TokenViewBase 中的 post 方法
        # 在此处调用自定义函数
        return self.register(request)


class UserView(generics.GenericAPIView):

    @classmethod
    def get_token_from_request(cls, request):
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
    def update_user_profile_by_id(self, request):
        try:
            update_data = JSONParser().parse(request)
            serializer = CustomUserSerializer(data=update_data)
            if serializer.is_valid():
                # get user id from access token
                user_token = self.get_token_from_request(request)
                user_id = jwt_decode_handler(user_token)['user_id']
                user = CustomUser.objects.get(id=user_id)
                serializer.update(user, request.data)
                return JsonResponse({'code': MessageType.UPDATE_SUCCESSFULLY.value},
                                    status=status.HTTP_200_OK)
            return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as exc:
            return JsonResponse({'message': str(exc)}, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['GET'])
    def view_user_profile_by_id(self, request):
        try:
            json_data = JSONParser().parse(request)
            user_token = self.get_token_from_request(request)
            user_id = jwt_decode_handler(user_token)['user_id']
            user = CustomUser.objects.get(id=user_id)
            serializer = CustomUserSerializer(user, many=True)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        except Exception as exc:
            return JsonResponse({'message': str(exc)}, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['POST'])
    def change_password(self, request):
        try:
            json_data = JSONParser().parse(request)
            user_token = self.get_token_from_request(request)
            user_id = jwt_decode_handler(user_token)['user_id']
            user = CustomUser.objects.get(id=user_id)
            user.set_password(make_password(json_data['password']))
            user.save()
        except Exception as exc:
            return JsonResponse({'message': str(exc)}, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['POST'])
    def logout(self, request):
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
            return JsonResponse({'message': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CustomUser.objects.all().order_by('-date_joined')  # 使用自定义用户模型
    serializer_class = CustomUserSerializer

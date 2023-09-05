import jwt
import json
from .models import CustomUser
from django.contrib import auth
from rest_framework import viewsets, status
from .serializers import CustomUserSerializer, MyTokenObtainPairSerializer
from rest_framework.decorators import api_view
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from datetime import timedelta
from enums.messageEnums import *
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        # 在 response 的内容中增加了 user_id
        # response.data['user_id'] = self
        return response


@api_view(['POST'])
@authentication_classes([])  # 空列表表示不使用任何身份验证
@permission_classes([AllowAny])  # 允许任何用户访问
def register(request):
    try:
        register_data = JSONParser().parse(request)
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


@api_view(['POST'])
@authentication_classes([])  # 空列表表示不使用任何身份验证
@permission_classes([AllowAny])  # 允许任何用户访问
def login(request):
    try:
        login_data = JSONParser().parse(request)
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            user = authenticate(username=login_data['username'], password=login_data['password'])
            if user:
                tokens = MyTokenObtainPairSerializer.get_token(user)
                response = {
                    'code': MessageType.LOGIN_SUCCESSFULLY.value,
                    'id': user.id,
                    'tokens': tokens,
                }
                return JsonResponse(response, status=status.HTTP_200_OK)
            else:
                errmsg = {'code': MessageType.INVALID_CREDENTIALS.value, 'message': 'Invalid Credentials Provided'}
                return JsonResponse(errmsg, status=status.HTTP_401_UNAUTHORIZED)
        return JsonResponse(serializer.errors, status=status.HTTP_200_OK)
    except Exception as exc:
        return JsonResponse({'message': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def refresh_token(request):
    try:
        refresh_data = JSONParser().parse(request)
        token = TokenRefreshSerializer.validate(TokenRefreshSerializer(), refresh_data)
        response = {
            'id': refresh_data['id'],
            'access': str(token),
        }
        return JsonResponse(response, status=status.HTTP_200_OK)
    except Exception as exc:
        return JsonResponse({'message': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def update_user_profile_by_id(request):
    try:
        update_data = JSONParser().parse(request)
        serializer = CustomUserSerializer(data=update_data)
        if serializer.is_valid():
            # get user id from access token
            user_token = update_data['access']
            user_id = jwt.decode(user_token)['id']
            user = CustomUser.objects.get(id=user_id)
            serializer.update(user, request.data)
            return JsonResponse({'code': MessageType.UPDATE_SUCCESSFULLY.value},
                                status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as exc:
        return JsonResponse({'message': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def view_user_profile_by_id(request):
    try:
        json_data = JSONParser().parse(request)
        user_token = json_data['access']
        user_id = jwt.decode(user_token)['id']
        user = CustomUser.objects.get(id=user_id)
        serializer = CustomUserSerializer(user, many=True)
        return JsonResponse(serializer.data, status=status.HTTP_200_OK)
    except Exception as exc:
        return JsonResponse({'message': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def change_password(request):
    try:
        json_data = JSONParser().parse(request)
        user_token = json_data['access']
        user_id = jwt.decode(user_token)['id']
        user = CustomUser.objects.get(id=user_id)
        new_password = json_data['password']
        user.set_password(new_password)
        user.save()
    except Exception as exc:
        return JsonResponse({'message': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


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
        return JsonResponse({'message': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CustomUser.objects.all().order_by('-date_joined')  # 使用自定义用户模型
    serializer_class = CustomUserSerializer

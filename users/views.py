import jwt

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


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        # 在 response 的内容中增加了 user_id
        # response.data['user_id'] = self
        return response


@api_view(['POST'])
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
        return JsonResponse(exc, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    try:
        login_data = JSONParser().parse(request)
        serializer = CustomUserSerializer(data=login_data)
        if serializer.is_valid():
            user = authenticate(username=serializer.data.get('email'), password=serializer.data.get('password'))
            if user:
                tokens = MyTokenObtainPairSerializer.get_token(user)
                response = {
                    'id': user.id,
                    'tokens': tokens,
                }
                return JsonResponse(response, status=status.HTTP_200_OK)
            else:
                return JsonResponse({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as exc:
        return JsonResponse(exc, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def refresh_token(request):
    try:
        refresh_data = JSONParser().parse(request)
        token = TokenRefreshSerializer.validate(TokenRefreshSerializer(), refresh_data)
        response = {
            'id': request['id'],
            'access': str(token),
        }
        return JsonResponse(response, status=status.HTTP_200_OK)
    except Exception as exc:
        return JsonResponse(exc, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def update_user_profile(request):
    try:
        update_data = JSONParser().parse(request)
        serializer = CustomUserSerializer(data=update_data)
        if serializer.is_valid():
            # get user id from access token
            user_token = update_data['access']
            user_id = jwt.decode(user_token)['id']
            user = CustomUser.objects.get(id=user_id)
            serializer.update(user, request.data)
            return JsonResponse({'message': 'Update user profile successfully'}, status=status.HTTP_200_OK)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as exc:
        return JsonResponse(exc, status=status.HTTP_400_BAD_REQUEST)


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
        return JsonResponse(exc, status=status.HTTP_400_BAD_REQUEST)


def logout(request):
    try:

        return JsonResponse({'message': 'User logout successfully'}, status=status.HTTP_200_OK)
    except Exception as exc:
        return JsonResponse(exc, status=status.HTTP_400_BAD_REQUEST)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CustomUser.objects.all().order_by('-date_joined')  # 使用自定义用户模型
    serializer_class = CustomUserSerializer

from .models import CustomUser, CustomUserProfile
from rest_framework import viewsets, status
from .serializers import CustomUserSerializer, UpdateUserProfileSerializer
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.decorators import login_required
from django.contrib import auth
from django.shortcuts import get_object_or_404


def hello(request):
    return HttpResponse("Welcome to ColAI!")


@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        serializer = CustomUserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            token = AccessToken.for_user(user)
            return Response({'token': str(token)}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    if request.method == 'POST':
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)
        if user:
            # 如果用户凭据有效，生成或获取 Token
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['POST'])
@login_required
def updateUserProfile(request):
    if request.method == 'POST':
        serializer = UpdateUserProfileSerializer(data=request.data)
        if serializer.is_valid():
            user_id = request.data.get('id')
            new_phone_number = request.data.get('phone_number')
            new_address = request.data.get('address')
            new_signature = request.data.get('signature')
            user = get_object_or_404(CustomUser, pk=user_id)
            user_profile = get_object_or_404(CustomUserProfile, user=user)
            user.phone_number = new_phone_number
            user.address = new_address
            user_profile.signature = new_signature
            user.save()
            user_profile.save()
            return Response({'message': 'Update user profile successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@login_required
def logout(request):
    auth.logout(request)
    return Response({'message': 'User logout successfully'}, status=status.HTTP_200_OK)


@api_view(['POST'])
def testView1(request):
    # 解析前端传递的JSON数据
    input_data = request.data

    # 使用序列化器进行反序列化
    user_serializer = CustomUserSerializer(data=input_data)

    if user_serializer.is_valid():
        # 保存数据到数据库
        user_serializer.save()

        # 返回成功响应
        return JsonResponse({'message': 'User created successfully'}, status=201)
    else:
        # 返回验证错误响应
        return JsonResponse(user_serializer.errors, status=400)


@api_view(['GET'])
def testView2(request):
    # 在数据库中查询数据
    users = CustomUser.objects.filter(username="Remi")  # 使用自定义用户模型

    # 将请求对象添加到上下文中
    context = {'request': request}

    # 使用序列化器将数据序列化为JSON
    user_serializer = CustomUserSerializer(users, many=True, context=context)

    # 返回序列化后的数据
    return JsonResponse(user_serializer.data, safe=False)


class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CustomUser.objects.all().order_by('-date_joined')  # 使用自定义用户模型
    serializer_class = CustomUserSerializer

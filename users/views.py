# from django.contrib.auth.models import User, Group
from .models import CustomUser
from rest_framework import viewsets, status
from .serializers import CustomUserSerializer
# UserSerializer, GroupSerializer
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.test import TestCase
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate


def hello(request):
    return HttpResponse("Hello world ! ")


@api_view(['POST'])
def register(request):
    if request.method == 'POST':
        print(request.data)
        serializer = CustomUserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.save()
            token = AccessToken.for_user(user)
            return Response({'token': str(token)}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    # if request.method == 'POST':
    # email = request.data.get('email')  # This can be either username or email
    # password = request.data.get('password')

    # user = authenticate(email=email, password=password)

    # if user:
    #     # 如果用户凭据有效，生成或获取 Token
    #     token, created = Token.objects.get_or_create(user=user)
    #     return Response({'token': token.key}, status=status.HTTP_200_OK)
    # else:
    #     return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
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


# @api_view(['POST'])
# def testView1(request):
#     # 解析前端传递的JSON数据
#     input_data = request.data

#     # 使用序列化器进行反序列化
#     user_serializer = UserSerializer(data=input_data)

#     if user_serializer.is_valid():
#         # 保存数据到数据库
#         user_serializer.save()

#         # 返回成功响应
#         return JsonResponse({'message': 'User created successfully'}, status=201)
#     else:
#         # 返回验证错误响应
#         return JsonResponse(user_serializer.errors, status=400)

# @api_view(['GET'])  
# def testView2(request):
#     # 在数据库中查询数据
#     users = User.objects.filter(username="Remi")

#     # 将请求对象添加到上下文中
#     context = {'request': request}

#     # 使用序列化器将数据序列化为JSON
#     user_serializer = UserSerializer(users, many=True, context=context)

#     # 返回序列化后的数据
#     return JsonResponse(user_serializer.data,safe=False)

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = CustomUser.objects.all().order_by('-date_joined')  # 使用自定义用户模型
    serializer_class = CustomUserSerializer

# class UserViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows users to be viewed or edited.
#     """
#     queryset = User.objects.all().order_by('-date_joined')
#     serializer_class = UserSerializer


# class GroupViewSet(viewsets.ModelViewSet):
#     """
#     API endpoint that allows groups to be viewed or edited.
#     """
#     queryset = Group.objects.all()
#     serializer_class = GroupSerializer

# from django.shortcuts import render, redirect, get_object_or_404
# from .forms import UserRegistrationForm, UserUpdateForm, UserUpdatePasswordForm
# from django.contrib.auth.decorators import login_required
# from django.contrib import auth
# from django.contrib import messages
# from .models import UserProfile
# from django.contrib.auth.models import User


# def UserRegister(request):
#     if request.method == 'GET':
#         form = UserRegistrationForm()
#         return render(request, 'users/regpage.html', {'form': form})
#     elif request.method == 'POST':
#         form = UserRegistrationForm(request.POST)
#         if form.is_valid():
#             username = form.cleaned_data.get('username')
#             email = form.cleaned_data.get('email')
#             password = form.cleaned_data.get('password2')
#             first_name = form.cleaned_data.get('first_name')
#             last_name = form.cleaned_data.get('last_name')
#             user = User.objects.create_user(username=username, email=email, password=password, first_name=first_name,
#                                             last_name=last_name)
#             gender = form.cleaned_data.get('gender')
#             address = form.cleaned_data.get('address')
#             city = form.cleaned_data.get('city')
#             state = form.cleaned_data.get('state')
#             czip = form.cleaned_data.get('czip')
#             user_profile = UserProfile(user=user, gender=gender, address=address, city=city, state=state, czip=czip)
#             user_profile.save()
#             messages.success(request, f'Your account has been created. Please login now.')
#             return redirect('UserLogin')
#         else:
#             print(form.errors)
#             return render(request, 'users/regpage.html', {'form': form})
#
#
# def login(request):
#     if request.method == 'POST':
#         print(request.POST)
#         username = request.POST.get('username')
#         password = request.POST.get('password')
#         user = auth.authenticate(username=username, password=password)
#         if user is not None and user.is_active:
#             auth.login(request, user)
#             mes = "Hello! " + user.last_name + " " + user.first_name + ". How are doing today?"
#             messages.success(request, mes)
#             return redirect('Home')
#         else:
#             messages.warning(request, f'Username or password is not correct, please try again')
#             return render(request, 'users/loginpage.html')
#     else:
#         return render(request, 'users/loginpage.html')
#
#
# @login_required
# def logout(request):
#     auth.logout(request)
#     return render(request, 'users/logoutpage.html')
#
#
# @login_required
# def UserChangePassword(request):
#     pk = request.user.id
#     user = get_object_or_404(User, pk=pk)
#     if request.method == 'POST':
#         form = UserUpdatePasswordForm(request.POST)
#         if form.is_valid():
#             if form.cleaned_data['password1'] == form.cleaned_data['password2']:
#                 new_password = form.cleaned_data['password2']
#                 user.set_password(new_password)
#                 user.save()
#                 messages.success(request, f'You have sucessfully changed your password.')
#                 return redirect('UserLogin')
#             else:
#                 messages.warning(request, f"The two password fields didn't match! Please try again.")
#                 return render(request, 'users/passwordchange.html',{'form' : form})
#         else:
#             return render(request, 'users/passwordchange.html',{'form' : form})
#     else:
#         form = UserUpdatePasswordForm()
#         return render(request, 'users/passwordchange.html',{'form' : form})

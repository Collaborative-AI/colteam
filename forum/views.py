from django.shortcuts import render
from users.views import *
from rest_framework.decorators import api_view
from .serializers import ThreadSerializer, PostSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_jwt.utils import jwt_decode_handler
from models import Thread, Post
# Create your views here.

@api_view(['POST'])
def create_thread(request):

    serializer = ThreadSerializer(request)
    if serializer.is_valid():
        thread = serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'thread create failed'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_post(request):
    user_token_auth = get_token_from_request(request)
    user_id_auth = jwt_decode_handler(user_token_auth)['user_id']
    user_auth = CustomUser.objects.get(id=user_id_auth)

    thread_data = JSONParser().parse(request)
    thread_id = Thread.objects.get(thread_id = thread_data['thread_id']) 
    

    request_data = {key: value for key, value in request.data.items()}
    request_data['user'] = user_auth.pk
    request_data['thread'] = thread_id

    serializer = PostSerializer(data=request_data)
    if serializer.is_valid():
        post = serializer.save()
        return Response({'message': 'Create post successfully'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'post create failed'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def find_thread(request):
    try:
        thread_id = request.data.get('thread_id')  # 从请求数据中获取房间名字
        thread = Thread.objects.get(id=thread_id)
        serializer = ThreadSerializer(thread)
        return Response(serializer.data)
    except Thread.DoesNotExist:
        return Response({'message': 'Thread not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def find_post(request):
    try:
        post_id = request.data.get('post_id')  # 从请求数据中获取房间名字
        post = Post.objects.get(id=post_id)
        serializer = ThreadSerializer(post)
        return Response(serializer.data)
    except Thread.DoesNotExist:
        return Response({'message': 'Thread not found'}, status=status.HTTP_404_NOT_FOUND)


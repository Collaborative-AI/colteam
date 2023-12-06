from django.shortcuts import render
from users.views import *
from rest_framework.decorators import api_view
from .serializers import ThreadSerializer, PostSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_jwt.utils import jwt_decode_handler
from .models import Thread, Post
from rest_framework.pagination import PageNumberPagination



class CustomPageNumberPagination(PageNumberPagination):
    page_size = 20  # 每页显示的数量
    page_size_query_param = 'page_size'
    max_page_size = 100

@api_view(['POST'])
def create_thread(request):

    serializer = ThreadSerializer(data=request.data)
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

    thread_id = request.data.get('thread_id')

    request_data = {
        'content': request.data.get('content'),  # Adjust this based on your actual field names
        'user': user_auth.pk,
        'thread': thread_id,
    }

    serializer = PostSerializer(data=request_data)
    if serializer.is_valid():
        post = serializer.save()
        return Response({'message': 'Create post successfully'}, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'post create failed'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def find_thread(request):
    try:
        thread_id = request.data.get('thread_id')  # 从请求数据中获取话题id
        thread = Thread.objects.get(id=thread_id)
        serializer = ThreadSerializer(thread)
        return Response(serializer.data)
    except Thread.DoesNotExist:
        return Response({'message': 'Thread not found'}, status=status.HTTP_404_NOT_FOUND)
    
@api_view(['GET'])
def find_post(request):
    try:
        post_id = request.data.get('post_id')  # 从请求数据中获取帖子id
        post = Post.objects.get(id=post_id)
        serializer = PostSerializer(post)
        return Response(serializer.data)
    except Thread.DoesNotExist:
        return Response({'message': 'Thread not found'}, status=status.HTTP_404_NOT_FOUND)

# 找出该话题对应的帖子
@api_view(['GET'])
def find_related_post(request):
    try:
        # 在 Thread 模型中查找给定话题ID的帖子
        thread_id = request.data.get('thread_id') 
        thread = Thread.objects.get(id=thread_id)
        related_posts = Post.objects.filter(thread=thread).order_by("id")

        # 不使用分页器分页, 使用 PostSerializer 序列化帖子对象
        # serializer = PostSerializer(related_posts, many=True)
        # return Response(serializer.data)

        # 使用分页器分页
        paginator = CustomPageNumberPagination()
        result_record = paginator.paginate_queryset(related_posts, request)
        serializer = PostSerializer(result_record, many=True)
        return paginator.get_paginated_response(serializer.data)

    except Thread.DoesNotExist:
        return Response({"message": "Topic not found"}, status=404)
    except Exception as e:
        return Response({"message": str(e)}, status=500)


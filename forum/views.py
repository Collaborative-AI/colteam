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
from projects.models import ProjectDetail
from projects.serializers import ProjectDetailSerializer
from tags.tag import Tag


class CustomPageNumberPagination(PageNumberPagination):
    page_size = 20  # 每页显示的数量
    page_size_query_param = 'page_size'
    max_page_size = 100


@api_view(['POST'])
def create_thread(request):
    user_token_auth = get_token_from_request(request)
    user_id_auth = jwt_decode_handler(user_token_auth)['user_id']
    user_auth = CustomUser.objects.get(id=user_id_auth)
    project_id = request.data.get('project_id')
    request_data = {
        'title': request.data.get('title'),  # Adjust this based on your actual field names
        'user': user_auth.pk,
        'project': project_id,
    }
    tags_data = ProjectDetail.objects.get(id=project_id)
    serializer = ThreadSerializer(data=request_data)
    if serializer.is_valid():
        thread = serializer.save()
        # add project tags
        tags = []
        for tag_name in tags_data:
            tag = Tag.objects.create(name=tag_name)
            tags.append(tag)
        thread.tags.set(tags)
        thread.save()
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
def get_thread_by_id(request):
    try:
        thread_id = request.data.get('thread_id')  # 从请求数据中获取话题id
        thread = Thread.objects.get(id=thread_id)
        serializer = ThreadSerializer(thread)
        return Response(serializer.data)
    except Thread.DoesNotExist:
        return Response({'message': 'Thread not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def delete_post(request):
    try:
        post_id = request.data.get('post_id')  # 从请求数据中获取帖子id
        post = Post.objects.get(id=post_id)
        post.content = "The post has been deleted"
        serializer = PostSerializer(post)
        return Response(serializer.data)
    except Thread.DoesNotExist:
        return Response({'message': 'Thread not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_post_by_id(request):
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


# 找出该项目对应的主题
@api_view(['GET'])
def find_threads_by_project(request):
    try:
        # 在 Thread 模型中查找给定话题ID的帖子
        project_id = request.data.get('project_id')
        project = ProjectDetail.objects.get(id=project_id)
        related_project = Thread.objects.filter(project=project).order_by("id")

        # 不使用分页器分页, 使用 PostSerializer 序列化帖子对象
        # serializer = ThreadSerializer(related_project, many=True)
        # return Response(serializer.data)
        paginator = CustomPageNumberPagination()
        result_record = paginator.paginate_queryset(related_project, request)
        serializer = ThreadSerializer(result_record, many=True)
        return paginator.get_paginated_response(serializer.data)


    except Thread.DoesNotExist:
        return Response({"message": "Project not found"}, status=404)
    except Exception as e:
        return Response({"message": str(e)}, status=500)


@api_view(['POST'])
def search(request):
    try:
        form = SearchForm(request.GET)
        results = []
        if form.is_valid():
            search_term = form.cleaned_data['search_term']
            if search_term:
                results = Thread.objects.filter(title=search_term)

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
                results = Thread.objects.filter(title__icontains=search_term)[:10]

        return JsonResponse({'form': form, 'results': results}, status=status.HTTP_200_OK)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def add_tags(request):
    try:
        thread_id = request.data.get('thread_id')
        thread = Thread.objects.get(id=thread_id)
        exist_tags = thread.tags
        for tag in request.data.get('tags'):
            if tag not in exist_tags:
                t = Tag.objects.create(name=tag)
                thread.tags.add(t)
        serializer = ThreadSerializer(data=thread)
        if serializer.is_valid():
            thread = serializer.save()
            return Response({'message': 'Add tags successfully'}, status=status.HTTP_201_CREATED)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def remove_tags(request):
    try:
        thread_id = request.data.get('thread_id')
        thread = Thread.objects.get(id=thread_id)
        exist_tags = thread.tags
        for tag in request.data.get('tags'):
            if tag in exist_tags:
                thread.tags.filter(name=tag).delete()
        serializer = ThreadSerializer(data=thread)
        if serializer.is_valid():
            thread = serializer.save()
            return Response({'message': 'Delete tags successfully'}, status=status.HTTP_201_CREATED)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)

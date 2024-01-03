from django.shortcuts import render
from users.views import *
from rest_framework.decorators import api_view
from .serializers import *
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import authentication_classes, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_jwt.utils import jwt_decode_handler
from .models import *
from rest_framework.pagination import PageNumberPagination
from projects.models import ProjectDetail
from projects.serializers import ProjectDetailSerializer
from tags.tag import Tag
from django.utils import timezone

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
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    else:
        return Response({'message': 'post create failed'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_thread_by_threadId(request):
    try:
        thread_id = request.data.get('thread_id')  # 从请求数据中获取话题id
        thread = Thread.objects.get(id=thread_id, visible=True) 
        serializer = ThreadSerializer(thread)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Thread.DoesNotExist:
        return Response({'message': 'Thread not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def delete_post(request):
    try:
        post_id = request.data.get('post_id')  # 从请求数据中获取帖子id
        post = Post.objects.get(id=post_id)
        update_data = {
            'visible': False,
            'last_modified_time': timezone.now()
        }
        serializer = PostSerializer(post, data=update_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Post.DoesNotExist:
        return Response({'message': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
def get_post_by_postId(request):
    try:
        post_id = request.data.get('post_id')  # 从请求数据中获取帖子id
        post = Post.objects.get(id=post_id, visible=True) 
        serializer = PostSerializer(post)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Thread.DoesNotExist:
        return Response({'message': 'Thread not found'}, status=status.HTTP_404_NOT_FOUND)


# 找出该话题对应的帖子
@api_view(['GET'])
def get_posts_by_threadId(request):
    try:
        # 在 Thread 模型中查找给定话题ID的帖子
        thread_id = request.data.get('thread_id')
        thread = Thread.objects.get(id=thread_id, visible=True) 
        related_posts = Post.objects.filter(thread=thread, visible=True).order_by("id")

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
def get_threads_by_projectId(request):
    try:
        # 在 Thread 模型中查找给定话题ID的帖子
        project_id = request.data.get('project_id')
        project = ProjectDetail.objects.get(id=project_id)
        related_project = Thread.objects.filter(project=project, visible=True).order_by("id")

        # 不使用分页器分页, 使用 PostSerializer 序列化帖子对象
        # serializer = ThreadSerializer(related_project, many=True)
        # return Response(serializer.data)
        paginator = CustomPageNumberPagination()
        result_record = paginator.paginate_queryset(related_project, request)
        serializer = ThreadSerializer(result_record, many=True)
        return paginator.get_paginated_response(serializer.data)
    except ProjectDetail.DoesNotExist:
            return Response({"message": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
    except Thread.DoesNotExist:
        return Response({"message": "Project not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
def precise_search_by_title(request):
    try:
        form = SearchForm(request.GET)
        results = []
        if form.is_valid():
            search_title = form.cleaned_data['title']
            if search_title:
                results = Thread.objects.filter(title=search_title, visible=True) 
                serializer = ThreadSerializer(results, many=True)
                return Response({'results': serializer.data}, status=status.HTTP_200_OK)
            else:
                results = Thread.objects.filter(visible=True).order_by('last_modified_time')[:10]
                return Response({'results': serializer.data}, status=status.HTTP_200_OK)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
    except Exception as exc:
        return JsonResponse({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)


# 模糊查询
@api_view(['POST'])
def fuzzy_search_by_title(request):
    try:
        form = SearchForm(request.GET)
        results = []

        if form.is_valid():
            title_key_words = form.cleaned_data['title_key_words']
            if title_key_words:
                # 只返回前十个
                results = Thread.objects.filter(title__icontains=title_key_words, visible=True)[:10]
                serializer = ThreadSerializer(results, many=True)
                return Response({'results': serializer.data}, status=status.HTTP_200_OK)
            else:
                results = Thread.objects.filter(visible=True).order_by('last_modified_time')[:10]
                return Response({'results': serializer.data}, status=status.HTTP_200_OK)
        return Response(form.errors, status=status.HTTP_400_BAD_REQUEST)
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

@api_view(['GET'])
def get_thread_by_postId(request):
    try:
        post_id = request.query_params.get('post_id')
        _post = Post.objects.get(id=post_id)
        correspond_thread = Thread.objects.get(post=_post, visible=True) 
        serializer = ThreadSerializer(data=correspond_thread)
        return Response(serializer.data, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        return Response({'message': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)
    except Thread.DoesNotExist:
        return Response({'message': 'No corresponding thread found.'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as exc:
        return Response({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def delete_thread(request):
    try:
        thread_id = request.data.get('thread_id')  # 从请求数据中获取帖子id
        thread = Thread.objects.get(id=thread_id)
        update_data = {
            'visible': False,
            'last_modified_time': timezone.now()
        }
        serializer = ThreadSerializer(thread, data=update_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    except Thread.DoesNotExist:
        return Response({'message': 'Thread not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def like_thread(request):
    user_token_auth = get_token_from_request(request)
    user_id_auth = jwt_decode_handler(user_token_auth)['user_id']
    user_auth = CustomUser.objects.get(id=user_id_auth)

    thread_id = request.data.get('thread_id')
    thread = Thread.objects.get(id=thread_id)
    if Thread_Like.objects.filter(user=user_auth, thread=thread).exists():
        return Response({'message': 'You have already liked this thread'}, status=status.HTTP_400_BAD_REQUEST)

    request_data = {
        'user': user_auth.pk,
        'thread': thread_id,
    }

    serializer = Thread_LikeSerializer(data=request_data)
    if serializer.is_valid():
        Thread_Like = serializer.save()
        thread.like_count += 1
        thread.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'You can not like this thread yet.'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def dislike_thread(request):
    user_token_auth = get_token_from_request(request)
    user_id_auth = jwt_decode_handler(user_token_auth)['user_id']
    user_auth = CustomUser.objects.get(id=user_id_auth)

    thread_id = request.data.get('thread_id')
    thread = Thread.objects.get(id=thread_id)
    if Thread_Dislike.objects.filter(user=user_auth, thread=thread).exists():
        return Response({'message': 'You have already disliked this thread'}, status=status.HTTP_400_BAD_REQUEST)

    request_data = {
        'user': user_auth.pk,
        'thread': thread_id,
    }

    serializer = Thread_DislikeSerializer(data=request_data)
    if serializer.is_valid():
        Thread_Dislike = serializer.save()
        thread.dislike_count += 1
        thread.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'You can not like this thread yet.'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def like_post(request):
    user_token_auth = get_token_from_request(request)
    user_id_auth = jwt_decode_handler(user_token_auth)['user_id']
    user_auth = CustomUser.objects.get(id=user_id_auth)

    post_id = request.data.get('post_id')
    post = Post.objects.get(id=post_id)
    if Post_Like.objects.filter(user=user_auth, post=post).exists():
        return Response({'message': 'You have already liked this post'}, status=status.HTTP_400_BAD_REQUEST)

    request_data = {
        'user': user_auth.pk,
        'post': post_id,
    }

    serializer = Post_LikeSerializer(data=request_data)
    if serializer.is_valid():
        Post_Like = serializer.save()
        post.like_count += 1
        post.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response({'message': 'You can not like this post yet.'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def add_thread_in_collector(request):
    user_token_auth = get_token_from_request(request)
    user_id_auth = jwt_decode_handler(user_token_auth)['user_id']
    user_auth = CustomUser.objects.get(id=user_id_auth)

    try:
        thread_id = request.data.get('thread_id')
        thread = Thread.objects.get(id=thread_id)
    except Thread.DoesNotExist:
        return Response({'message': 'Thread does not exist'}, status=status.HTTP_404_NOT_FOUND)
    
    collector, created = Collector.objects.get_or_create(user=user_auth)

    if collector.threads.filter(id=thread.id).exists():
        return Response({'message': 'Thread is already in collector'}, status=status.HTTP_400_BAD_REQUEST)

    collector.threads.add(thread)
    serializer = CollectorSerializer(collector)
    serializer.save()
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def edit_post_by_postId(request):
    try:
        post_id = request.data.get('post_id')
        post = Post.objects.get(id=post_id)
        post_content = request.data.get('content')
        update_data = {
            'content': post_content,
            'last_modified_time': timezone.now()
        }
        serializer = PostSerializer(post, data=update_data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
    except Post.DoesNotExist:
        return Response({'message': 'Post not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as exc:
        return Response({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_thread_by_tagIds(request):
    try:
        tag_ids = request.data.get('tag_ids')
        threads = Thread.objects.filter(tags__id__in=tag_ids, visible=True).distinct().order_by('last_modified_time')
        if threads.exists():
            serializer = ThreadSerializer(threads, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'No thread was found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as exc:
        return Response({'error': str(exc)}, status=status.HTTP_400_BAD_REQUEST)

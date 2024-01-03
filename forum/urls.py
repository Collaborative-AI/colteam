from django.urls import path, include
# from django.contrib.auth import views as auth_views
from . import views
# from rest_framework.routers import DefaultRouter

from django.urls import path
from . import views

urlpatterns = [
    path('create_thread/', views.create_thread, name="create_thread"),
    path('create_post/', views.create_post, name='create_post'),
    path('delete_post/', views.delete_post, name='delete_post'),
    path('get_thread_by_threadId/', views.get_thread_by_threadId, name='get_thread_by_threadId'),
    path('get_post_by_postId/', views.get_post_by_postId, name='get_post_by_postId'),
    path('get_posts_by_threadId/', views.get_posts_by_threadId, name='get_posts_by_threadId'),
    path('get_threads_by_projectId/', views.get_threads_by_projectId, name='get_threads_by_projectId'),
    path('precise_search_by_title/', views.precise_search_by_title, name='precise_search_by_title'),
    path('fuzzy_search_by_title/', views.fuzzy_search_by_title, name='fuzzy_search_by_title'),
    path('add_tags/', views.add_tags, name='add_tags'),
    path('remove_tags/', views.remove_tags, name='remove_tags'),
    path('get_thread_by_postId/', views.get_thread_by_postId, name='get_thread_by_postId'),
]
from django.urls import path, include
# from django.contrib.auth import views as auth_views
from . import views
# from rest_framework.routers import DefaultRouter

from django.urls import path
from . import views

urlpatterns = [
    path('create_thread/', views.create_thread, name="create_thread"),
    path('create_post/', views.create_post, name='create_post'),
    path('get_thread_by_id/', views.get_thread_by_id, name='get_thread_by_id'),
    path('get_post_by_id/', views.get_post_by_id, name='get_post_by_id'),
    path('find_related_post/', views.find_related_post, name='find_related_post'),
    path('find_related_thread/', views.find_related_thread, name='find_related_thread'),
    path('search/', views.search, name='search'),
    path('fuzzy_search/', views.fuzzy_search, name='fuzzy_search'),
    path('find_threads_by_project/', views.find_threads_by_project, name='find_threads_by_project'),

    
]
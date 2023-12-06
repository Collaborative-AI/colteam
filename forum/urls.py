from django.urls import path, include
# from django.contrib.auth import views as auth_views
from . import views
# from rest_framework.routers import DefaultRouter

from django.urls import path
from . import views

urlpatterns = [
    path('create_thread/', views.create_thread, name="create_thread"),
    path('create_post/', views.create_post, name='create_post'),
    path('find_thread/', views.find_thread, name='find_thread'),
    path('find_post/', views.find_post, name='find_post'),
    path('find_related_post/', views.find_related_post, name='find_related_post'),

    
]
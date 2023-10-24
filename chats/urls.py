from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views
from rest_framework.routers import DefaultRouter

from django.urls import path
from . import views

urlpatterns = [
    path('test_chats/<str:room_name>/', views.test_chats, name="test_chats"),
    path('create_room/<str:room_name>/', views.create_room, name='create_room'),
    path('find_room/<str:room_name>/', views.find_room, name='find_room'),
]

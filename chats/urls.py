from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views
from rest_framework.routers import DefaultRouter

from django.urls import path
from . import views

urlpatterns = [
    path('create_room/', views.create_room, name="create_room"),
    path('find_room/', views.find_room, name='find_room'),
    path('create_flychat/', views.create_flychat, name="create_flychat"),
    path('find_flychat/', views.find_flychat, name='find_flychat'),
    # path('create_roomchat/', views.create_roomchat, name="create_roomchat"),
    # path('find_roomchat/', views.find_roomchat, name='find_roomchat'),
]

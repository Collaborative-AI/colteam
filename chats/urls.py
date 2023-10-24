from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views
from rest_framework.routers import DefaultRouter

from .views import (
    ChatsApiView,
)

router = DefaultRouter()
router.register(r'all', views.ChatsApiView)

#  projects/create
urlpatterns = [
    path('', include(router.urls)),
]
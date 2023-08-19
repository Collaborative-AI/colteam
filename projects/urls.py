from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views
from rest_framework.routers import DefaultRouter

from .views import (
    ProjectApiView,
)

router = DefaultRouter()
router.register(r'projects', views.ProjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path('hello/', views.hello, name='hello'),
    path('projects/', ProjectApiView.as_view()),
    path('create/', views.createProject, name='createProject'),
    path('update/', views.updateProject, name='updateProject'),
    path('delete/', views.deleteProject, name='deleteProject'),
]

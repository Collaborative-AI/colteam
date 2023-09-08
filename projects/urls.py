from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views
from rest_framework.routers import DefaultRouter

from .views import (
    ProjectApiView,
)

router = DefaultRouter()
router.register(r'all', views.ProjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('create/', views.create_project, name='createProject'),
    path('update/', views.update_project, name='updateProject'),
    path('delete/', views.delete_project, name='deleteProject'),
    path('a_project/', views.view_one_project, name='viewOneProject'),
    # path('a_project/<str:a_project>', views.view_one_project, name='viewOneProject'),
    path('all_projects/', views.all_projects, name='view_all_projects'),
    path('my_projects/', views.my_projects, name='view_my_projects'),
    
]

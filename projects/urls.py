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
    # path('project_list/', views.projList, name='project-list'),
    # path('project/<str:a_project>', views.oneProject, name='one-project'),
]

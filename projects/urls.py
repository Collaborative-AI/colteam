from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views
from rest_framework.routers import DefaultRouter

from .views import (
    ProjectApiView,
)

router = DefaultRouter()
router.register(r'all', views.ProjectViewSet)

#  projects/create
urlpatterns = [
    path('', include(router.urls)),
    path('create/', views.create_project, name='createProject'),
    path('update/', views.update_project, name='updateProject'),
    path('delete/', views.delete_project, name='deleteProject'),
    # find a project by project id
    path('detail/find', views.view_one_project, name='viewOneProject'),
    path('detail/view_all', views.all_projects, name='view_all_projects'),
    path('detail/view_my', views.view_my_projects, name='view_my_projects'),
    path('search/', views.search, name='search_projects'),
    path('fuzzy/search/', views.fuzzy_search, name='fuzzy_search_projects'),
]

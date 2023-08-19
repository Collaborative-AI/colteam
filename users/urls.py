from django.urls import path, include
from django.contrib.auth import views as auth_views
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'users', views.UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('hello/', views.hello, name='hello'),
    path('testView1/', views.testView1, name='testView1'),
    path('testView2/', views.testView2, name='testView2'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('updateProfile/', views.updateUserProfile, name='updateUserProfile'),
]
from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

router = DefaultRouter()
router.register(r'all', views.UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='tokenObtainPair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='tokenRefresh'),
    path('api/token/verify/', TokenVerifyView.as_view(), name='tokenVerify'),
    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
    path('updateProfile/', views.update_user_profile_by_id, name='updateUserProfileByID'),
    path('viewProfile/', views.view_user_profile_by_id, name='viewUserProfileByID'),
]
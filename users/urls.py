from . import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

router = DefaultRouter()
router.register(r'all', views.UserViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('register/', views.RegisterView.as_view(), name='register_view'),
    path('login/', views.LoginView.as_view(), name='login'),
    path('logout/', views.logout, name='logout'),
    path('profile/update/', views.update_user_profile_by_id, name='update_user_profile_by_id'),
    path('profile/view/', views.view_user_profile_by_id, name='view_user_profile_by_id'),
    path('password/change/', views.change_password, name='change_password'),
    path('token/refresh/', TokenRefreshView.as_view(), name='refresh_token'),
    path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
    path('activate/<str:token>/', views.activate_account, name='activate_account'),
]
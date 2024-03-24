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
    path('search/', views.search, name='search_users'),
    path('fuzzy/search/', views.fuzzy_search, name='fuzzy_search_users'),
    path('resendVerify/', views.resend_verify_email, name='resend_email'),
    path('sendResetPasswordEmail/', views.send_reset_password_email, name='send_reset_password_email'),
    path('resetPassword/', views.reset_password, name='reset_password'),
    path('apiKey/generate/', views.generate_api_key, name='generate_api_key'),
    path('apiKey/list/', views.list_api_key, name='list_api_key'),
    path('apiKey/test/', views.test, name='test_api_key'),
    path('apiKey/delete/', views.delete_api_key, name='delete_api_key'),
]

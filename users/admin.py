from django.contrib import admin
# Register your models here.
# from .models import UserProfile
from .models import CustomUserProfile

# admin.site.register(UserProfile)
admin.site.register(CustomUserProfile)

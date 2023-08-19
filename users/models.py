from django.contrib.auth.models import AbstractUser
from djongo import models


class CustomUser(AbstractUser):
    # first_name = models.CharField(max_length=30)
    # last_name = models.CharField(max_length=30)

    # 添加你的其他自定义字段

    def __str__(self):
        return self.username  # 或者其他适当的表示形式


class CustomUserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='custom_user_profile')
    info = models.TextField("user information", null=True)

    class Meta:
        verbose_name = 'Custom User Profile'

    def __str__(self):
        return "{}'s Profile".format(self.user.username)

    def get_user_info(self):
        return self.info


from django.contrib.auth.models import AbstractUser
from djongo import models
from .permissions import UserPermissions
from datetime import datetime

class CustomUser(AbstractUser):
    phone_number = models.CharField("phone number", max_length=11, default='', blank=True)
    location = models.CharField("user location",  max_length=100, default='', blank=True)
    signature = models.TextField("user signature", default='', blank=True)
    bio = models.TextField("user bio", default='', blank=True)
    # 关联权限
    my_permission = models.ForeignKey(
        UserPermissions,
        on_delete=models.CASCADE,
        related_name='user_permissions',
        blank=True,
        null=True,
    )
    verify_code = models.TextField("verify code", default='', blank=True)
    send_code_time = models.DateTimeField("code send time", auto_now=False,default = datetime.now)

    def __str__(self):
        return self.username




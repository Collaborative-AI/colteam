from django.contrib.auth.models import AbstractUser
from djongo import models


class CustomUser(AbstractUser):
    phone_number = models.CharField("phone number", default='', blank=True)
    location = models.CharField("user location", default='', blank=True)
    signature = models.TextField("user signature", default='', blank=True)
    bio = models.TextField("user bio", default='', blank=True)

    def __str__(self):
        return self.username


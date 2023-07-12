from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    gender = models.CharField(max_length=11, default='', blank=True)
    address = models.CharField(max_length=100, default='', blank=True)
    city = models.CharField(max_length=100, default='', blank=True)
    state = models.CharField(max_length=100, default='', blank=True)
    czip = models.CharField(max_length=100, default='', blank=True)

    class Meta:
        verbose_name = 'User Profile'

    def __str__(self):
        return "{}".format(self.user.__str__())

from djongo import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)


    class Meta:
        verbose_name = 'User Profile'

    def __str__(self):
        return "{}".format(self.user.__str__())

class User(models.Model):
    userName = models.CharField(max_length = 20)
    passWord = models.CharField(max_length = 100)
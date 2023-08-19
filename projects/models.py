from django.db import models
from djongo import models
from django.contrib.auth.models import User


# Create your models here.
class ProjectDetail(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()

    def __str__(self):
        return '(%s, %s)'%(self.owner.username, self.description)


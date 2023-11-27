
from django.db import models
from users.models import CustomUser
class Thread(models.Model):
    title = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    

class Post(models.Model): 
    thread = models.ForeignKey(Thread, on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(CustomUser, null=True, on_delete=models.SET_NULL)
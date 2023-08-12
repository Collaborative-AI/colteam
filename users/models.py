# from djongo import models
# from django.contrib.auth.models import User


# class UserProfile(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)


#     class Meta:
#         verbose_name = 'User Profile'

#     def __str__(self):
#         return "{}".format(self.user.__str__())

# class User(models.Model):
#     userName = models.CharField(max_length = 20)
#     passWord = models.CharField(max_length = 100)
    
from django.contrib.auth.models import AbstractUser
from djongo import models

class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)
    firstName = models.CharField(max_length=30)
    lastName = models.CharField(max_length=30)
    
    # 添加你的其他自定义字段
    
    def __str__(self):
        return self.username  # 或者其他适当的表示形式

class CustomUserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='customuser_profile_user')

    class Meta:
        verbose_name = 'Custom User Profile'

    def __str__(self):
        return "{}'s Profile".format(self.user.username)





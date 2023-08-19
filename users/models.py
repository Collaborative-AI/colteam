from django.contrib.auth.models import AbstractUser
from djongo import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class CustomUser(AbstractUser):
    phone_num = models.CharField("phone number", max_length=11, default='', blank=True)
    address = models.CharField("user address", max_length=100, default='', blank=True)

    # 添加你的其他自定义字段

    def __str__(self):
        return self.username  # 或者其他适当的表示形式


class CustomUserProfile(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE, related_name='custom_user_profile')
    signature = models.TextField("user signature", default='', blank=True)

    class Meta:
        verbose_name = 'Custom User Profile'

    def __str__(self):
        return "{}'s Profile".format(self.user.username)

    def get_user_signature(self):
        return self.signature

    @receiver(post_save, sender=CustomUser)
    def create_user_info(sender, instance, created, **kwargs):
        if created:
            CustomUserProfile.objects.create(user=instance)

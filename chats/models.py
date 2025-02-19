from django.db import models
from users.models import CustomUser
from django.utils import timezone


class FlyChat(models.Model):
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='sent_messages')
    receiver = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='received_messages')
    content = models.TextField()
    timestamp = models.DateTimeField(auto_now_add=True)


class Room(models.Model):
    name = models.CharField(max_length=128)
    online = models.ManyToManyField(to=CustomUser, blank=True)

    def get_online_count(self):
        return self.online.count()

    def join(self, user):
        try:
            self.online.get(id=user.id)
        except CustomUser.DoesNotExist:
            # 如果不存在，将其添加到在线用户列表中
            self.online.add(user)
            self.save()
        # self.online.add(user)
        # self.save()

    def leave(self, user):
        self.online.remove(user)
        self.save()

    def __str__(self):
        return f'{self.name} ({self.get_online_count()})'


class RoomChat(models.Model):
    user = models.ForeignKey(to=CustomUser, on_delete=models.CASCADE)
    room = models.ForeignKey(to=Room, on_delete=models.CASCADE)
    content = models.CharField(max_length=512)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username}: {self.content} [{self.timestamp}]'

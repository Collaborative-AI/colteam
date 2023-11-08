from rest_framework import serializers
from .models import FlyChat, Room, RoomChat
from django.utils import timezone
from users.models import CustomUser
from users.serializers import CustomUserSerializer


class FlyChatSerializer(serializers.ModelSerializer):
    # sender = CustomUserSerializer(read_only=True)
    # receiver = CustomUserSerializer(read_only=True)
    sender = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())
    receiver = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all())

    # timestamp = serializers.DateTimeField(format="%Y-%m-%d %H:%M:%S")
    class Meta:
        model = FlyChat
        fields = "__all__"
        extra_kwargs = {
            'id': {
                'required': True
            }
        }
        # fields = ['id', 'sender', 'receiver', 'content', 'timestamp']


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = ['id', 'name', 'online']


class RoomChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomChat
        fields = ['id', 'user', 'room', 'content', 'timestamp']

from rest_framework import serializers
from .models import Thread, Post
from users.models import CustomUser
from users.serializers import CustomUserSerializer


class ThreadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread
        fields = "__all__"
        extra_kwargs = {
            'id': {
                'required': True
            }
        }


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"
        extra_kwargs = {
            'id': {
                'required': True
            }
        }

from rest_framework import serializers
from .models import *
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

class Post_LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post_Like
        fields = ['user', 'post']  

class Thread_LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread_Like
        fields = ['user', 'thread']  

class Thread_DislikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thread_Dislike
        fields = ['user', 'thread']

class CollectorSerualizer(serializers.ModelSerializer):
    class Meta:
        model = Collector
        fields = ['user', 'threads']

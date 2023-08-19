# from django.contrib.auth.models import User, Group
from .models import CustomUser, CustomUserProfile
from rest_framework import serializers


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"  # 你的自定义字段
        read_only_fields = ['username', 'email', 'password']
        extra_kwargs = {
            'username': {
                'required': True
            },
            'email': {
                'required': True
            },
            'password': {
                'required': True
            }
        }


class UpdateUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser, CustomUserProfile
        fields = "__all__"  # 你的自定义字段
        read_only_fields = ['id', 'phone_number', 'address', 'signature']
        extra_kwargs = {
            'id': {
                'required': True
            },
            'phone_number': {
                'required': False,
                'max_length': 11
            },
            'address': {
                'required': False,
                'max_length': 100
            },
            'signature': {
                'required': False
            }
        }

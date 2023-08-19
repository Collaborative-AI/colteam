from .models import CustomUser, CustomUserProfile
from rest_framework import serializers


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"  # 你的自定义字段
        read_only_fields = ['id', 'username', 'email', 'password']
        extra_kwargs = {
            'id': {
                'required': True
            },
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


class CustomUserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUserProfile
        fields = "__all__"

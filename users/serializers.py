# from django.contrib.auth.models import User, Group
from .models import CustomUser
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

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CustomUser(**validated_data)
        user.set_password(password)
        user.save()
        return user


from rest_framework import serializers
from .models import ProjectDetail
from users.models import CustomUser
from users.serializers import CustomUserSerializer  

# class ProjectDetailSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = ProjectDetail
#         fields = "__all__"
#         extra_kwargs = {
#             'id': {
#                 'required': True
#             }
#         }



class ProjectDetailSerializer(serializers.ModelSerializer):
    user = CustomUserSerializer(read_only=True)

    class Meta:
        model = ProjectDetail
        fields = "__all__"
        extra_kwargs = {
            'id': {
                'required': True
            }
        }
       
        



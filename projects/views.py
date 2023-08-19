from django.shortcuts import render

from .serializers import ProjectDetailSerializer
from rest_framework import viewsets, status
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.test import TestCase
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from .models import ProjectDetail

class ProjectApiView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    #view list
    def viewList(self, request, *args, **kwargs):
        projects = ProjectDetail.objects.filter(owner = request.user.id)
        serializer = ProjectDetailSerializer(projects, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    #add
    def addProject(self, request, *args, **kwargs):
        data = {
            'owner': request.user.id,
            'description': request.data.get('description'),
        }
        serializer = ProjectDetailSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


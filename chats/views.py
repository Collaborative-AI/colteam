from django.shortcuts import render
from .models import *
from django.http import HttpResponse

# Create your views here.

def create_room(room_name):
    room = Room.objects.create(name=room_name)
    return room

def test_chats(request,room_name):
    room = create_room(room_name)
    return HttpResponse(f"Room created: {room.name}")

def find_room(request, room_name):
    try:
        room = Room.objects.get(name=room_name)
        return HttpResponse(f"Room '{room_name}' found.")
    except Room.DoesNotExist:
        raise Http404("Room not found")
# Create your tests here.
from channels.testing import WebsocketCommunicator
from django.test import TestCase
from chats.consumers import *
import json
from channels.layers import get_channel_layer
from asgiref.testing import ApplicationCommunicator
from channels.db import database_sync_to_async

class ChatConsumerTest(TestCase):
    @database_sync_to_async
    def create_room(self, name):
        return Room.objects.create(name=name)

    async def test_chat_consumer(self):
        room = await self.create_room("test_room")

        communicator = WebsocketCommunicator(ChatConsumer.as_asgi(), f"/ws/{room.name}/")
        connected, _ = await communicator.connect()
        self.assertTrue(connected)

        # await communicator.send_json_to({
        #     "type": "websocket.send",
        #     "text": json.dumps({"message": "Hello, world!"}),
        # })

        # response = await communicator.receive_json_from()
        # self.assertEqual(response, {"message": "Hello, world!"})

        await communicator.disconnect()

from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from elasticsearch_dsl import Text
from chats.models import RoomChat


@registry.register_document
class RoomChatIndex(Document):
    user = fields.ObjectField(properties={
        'id': fields.IntegerField(),
        'username': fields.TextField(),
        # 添加其他 user 相关的字段
    })

    room = fields.ObjectField(properties={
        'id': fields.IntegerField(),
        'name': fields.TextField(),
        # 添加其他 room 相关的字段
    })

    content = fields.TextField()
    timestamp = fields.DateField()

    class Index:
        name = 'roomchat_index'
        settings = {
            'number_of_shards': 2,
            'number_of_replicas': 3,
        }

    class Django:
        model = RoomChat
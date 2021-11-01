
from django.contrib.auth import get_user_model
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
import json
from .models import Card, Comment, Maintainer



class ChatConsumer(WebsocketConsumer):

    def getComments(self, data):
        print(data)
        commentInCards =  Comment.objects.filter(comment_mapped_to=data['cardId'])
        content = {
            'command': 'comment',
            'messages': self.commentlist_to_json(commentInCards)
        }
        self.send_message(content)

    def newComment(self, data):
        commented_by = Maintainer.objects.filter(id = data['commentBy'])
        comment_mapped_to = Card.objects.filter(id=data['cardId'])
        newcomment = Comment.objects.create(
        commented_by=commented_by,
        comment_mapped_to = comment_mapped_to,
        comment_desc =data['commentDesc'])
        content = {
            'command': 'newComment',
            'comment': self.singlecomment_to_json(newcomment)
        }
        return self.send_chat_message(content)
    def deleteComment(self, data):
        comment = Comment.objects.filter(id=data['commentId'])
        comment.delete()
        content = {
            'command': 'deleteComment',
            'commentId': data['commentId']
        }
        return self.send_chat_message(content)

    def commentlist_to_json(self, commentlist):
        result = []
        for comment in commentlist:
            result.append(self.singlecomment_to_json(comment))
        return result

    def singlecomment_to_json(self, comment):
        return {
            'id': comment.id,
            'commented_by_id': comment.commented_by,
            'commented_by_user': comment.commented_by.name,
            'comment_desc': comment.comment_desc,
            'comment_time ': str(comment.comment_time )
        }

    commands = {
        'getComments': getComments,
        'newComment': newComment,
        'deleteComment': deleteComment
    }

    def connect(self):
        self.room_name = self.scope['url_route']['kwargs']['card_id']
        print("roomn")
        print(self.room_name)
        self.room_group_name = 'chat_%s' % self.room_name
        print(self.room_group_name)
        print(self.channel_name)
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )
        self.accept()

    def disconnect(self, close_code):
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data):
        data = json.loads(text_data)
        self.commands[data['command']](self, data)

    def send_chat_message(self, comment):
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': comment
            }
        )

    def send_message(self, comment):
        self.send(text_data=json.dumps(comment))

    def chat_message(self, event):
        message = event['message']
        self.send(text_data=json.dumps(message))
# chat/routing.py
from django.urls import path

from TracKer import consumers

websocket_urlpatterns = [
    path('ws/comment/<int:card_id>/', consumers.ChatConsumer.as_asgi()),
]
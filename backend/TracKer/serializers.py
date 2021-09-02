from rest_framework import serializers
from .models import Maintainer,Project,List,Card,Comment

class Maintainererializer(serializers.ModelSerializer):
    class Meta:
        model = Maintainer
        fields = ['name', 'year', 'admin', 'disable']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = ['project_name', 'project_desc', 'project_maintained_by']

class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = List
        fields = ['list_name', 'list_mapped_to']

class CardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Card
        fields = ['card_title', 'card_desc', 'is_card_assigned', 'card_mapped_to', 'caed_assigned_to']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['comment_desc', 'comment_time', 'comment_mapped_to', 'commented_by']
from django.db import models
from ckeditor.fields import RichTextField
from django.db.models.base import Model
from django.db.models.deletion import CASCADE
from django.db.models.expressions import F

# Create your models here.
class Maintainer(models.Model):
    name=models.CharField(max_length=100)
    class Year(models.IntegerChoices):
        FIRST = 1
        SECOND = 2
        THIRD = 3
        FOURTH = 4
        FIFTH = 5

    year=models.IntegerField(choices=Year.choices)
    admin = models.BooleanField(default=False)
    disable = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.name}"


class Project(models.Model):
    project_name=models.CharField(max_length=100)
    project_desc = RichTextField()
    project_maintained_by=models.ManyToManyField(Maintainer)
    
    def __str__(self):
        return f"{self.project_name}"


class List(models.Model):
    list_name = models.CharField(max_length=100)
    list_mapped_to=models.ForeignKey(Project,on_delete=CASCADE)

    def __str__(self):
        return f"{self.list_name}"

class Card(models.Model):
    card_title = models.CharField(max_length=100)
    card_desc= RichTextField()
    is_card_assigned=models.BooleanField(default=False)
    card_mapped_to=models.ForeignKey(List,on_delete=CASCADE)
    card_assigned_to = models.ManyToManyField(Maintainer)

    def __str__(self):
        return f"{self.card_title}"


class Comment(models.Model):
    comment_desc = RichTextField()
    comment_time = models.DateTimeField(auto_now_add=True)
    comment_mapped_to=models.ForeignKey(Card,on_delete=CASCADE)
    commented_by=models.ForeignKey(Maintainer,on_delete=CASCADE)












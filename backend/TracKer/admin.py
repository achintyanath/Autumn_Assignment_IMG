from .models import Card, Comment, List, Maintainer, Project
from django.contrib import admin

# Register your models here.
admin.site.register(Maintainer)
admin.site.register(Project)
admin.site.register(List)
admin.site.register(Card)
admin.site.register(Comment)
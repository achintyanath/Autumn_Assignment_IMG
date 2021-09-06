# Generated by Django 3.2.7 on 2021-09-06 16:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('TracKer', '0005_auto_20210906_1648'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='comment_mapped_to',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments_in_card', to='TracKer.card'),
        ),
    ]

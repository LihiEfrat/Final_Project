# Generated by Django 5.0.6 on 2024-06-15 12:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='exercise',
            name='videoUrl',
            field=models.CharField(default='fake', max_length=100),
            preserve_default=False,
        ),
    ]

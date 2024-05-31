# Generated by Django 5.0.6 on 2024-05-31 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='user_id',
            field=models.CharField(default='fake', max_length=10, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='therapist',
            name='user_id',
            field=models.CharField(default='fake', max_length=10, unique=True),
            preserve_default=False,
        ),
    ]

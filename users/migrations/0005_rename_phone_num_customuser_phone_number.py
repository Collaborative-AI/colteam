# Generated by Django 4.1.10 on 2023-08-19 14:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_remove_customuser_firstname_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='customuser',
            old_name='phone_num',
            new_name='phone_number',
        ),
    ]

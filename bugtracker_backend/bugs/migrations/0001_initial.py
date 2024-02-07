# Generated by Django 4.1.5 on 2024-01-26 18:10

from django.conf import settings
import django.contrib.postgres.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('projects', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Bug',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.TextField(max_length=300, null=True)),
                ('title', models.CharField(max_length=255)),
                ('date', models.DateField(auto_now_add=True)),
                ('type', models.CharField(max_length=255, null=True)),
                ('department_name', models.CharField(max_length=255, null=True)),
                ('is_archived', models.BooleanField(default=False, null=True)),
                ('priority', models.CharField(choices=[('Critical', 'Critical'), ('High', 'High'), ('Normal', 'Normal'), ('Low', 'Low')], default='Normal', max_length=32)),
                ('status', models.CharField(choices=[('In progress', 'In progress'), ('To be tested', 'To be tested'), ('Pending', 'Pending'), ('Fixed', 'Fixed'), ('Closed', 'Closed'), ('Rejected', 'Rejected'), ('New', 'New')], default='Open', max_length=32)),
                ('archived_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bug_archived', to=settings.AUTH_USER_MODEL)),
                ('assigned_to', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bug_assigned', to=settings.AUTH_USER_MODEL)),
                ('created_by', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='bug_created', to=settings.AUTH_USER_MODEL)),
                ('project', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='projects.project')),
            ],
            options={
                'permissions': (('assign_bug', 'assign bug'),),
            },
        ),
        migrations.CreateModel(
            name='BugHistory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(auto_now_add=True)),
                ('data', django.contrib.postgres.fields.ArrayField(base_field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=500), size=500), null=True, size=200)),
                ('comment', models.TextField(blank=True, null=True)),
                ('bug', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='bugs.bug')),
            ],
        ),
        migrations.CreateModel(
            name='BugComment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateField(auto_now_add=True)),
                ('description', models.TextField()),
                ('created_by', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
                ('related_bug', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='bugs.bug')),
            ],
        ),
    ]

# Generated by Django 3.2.6 on 2021-09-19 23:42

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='ShelterModel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('ward', models.CharField(max_length=10)),
                ('gakku', models.CharField(max_length=200)),
                ('name', models.CharField(max_length=200)),
                ('capacity', models.IntegerField(default=0)),
                ('tel', models.CharField(max_length=200)),
                ('address', models.CharField(max_length=200)),
                ('hokui', models.DecimalField(decimal_places=8, max_digits=10)),
                ('tokei', models.DecimalField(decimal_places=8, max_digits=11)),
                ('url', models.URLField()),
                ('image', models.URLField()),
                ('distance', models.IntegerField(default=0)),
            ],
        ),
    ]
# Generated by Django 5.1.4 on 2025-01-05 16:36

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Patient',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('age', models.IntegerField()),
                ('nric', models.CharField(max_length=255, validators=[django.core.validators.RegexValidator(message='Enter a valid NRIC', regex='[A-Z]\\d{7}[A-Z]')])),
                ('gender', models.CharField(choices=[('M', 'Male'), ('F', 'Female')], max_length=4)),
                ('date_of_birth', models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name='Ward',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('available_beds', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='WardType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('A1', 'A1'), ('B1', 'B1'), ('B2', 'B2'), ('C1', 'C1'), ('C2', 'C2')], max_length=2)),
                ('number_of_beds', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='Admission',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('reason_for_admission', models.CharField(max_length=255)),
                ('date_and_time_of_admission', models.DateTimeField()),
                ('is_discharged', models.BooleanField()),
                ('date_and_time_of_discharge', models.DateTimeField(blank=True, null=True)),
                ('patient_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.patient')),
                ('assigned_ward', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.ward')),
            ],
        ),
        migrations.AddField(
            model_name='ward',
            name='type',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.wardtype'),
        ),
    ]

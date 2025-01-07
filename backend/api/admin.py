from django.contrib import admin

# Register your models here.
from .models import Patient, WardType, Ward, Admission

class WardTypeAdmin(admin.ModelAdmin):
    ordering=['name']
    list_display = ['name', 'number_of_beds']
admin.site.register(Patient)
admin.site.register(Admission)
admin.site.register(Ward)
admin.site.register(WardType, WardTypeAdmin)

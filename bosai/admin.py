from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import ShelterModel

# Register your models here.
class ShelterModelResource(resources.ModelResource):
    class Meta:
        model = ShelterModel
        exclude = ()

@admin.register(ShelterModel)
class ShelterModelAdmin(ImportExportModelAdmin):
    list_display =  ('id', 'ward', 'gakku', 'name',)   # �ꗗ�ɏo����������
    # list_display = ('number', 'name',)  # �ꗗ�ɏo����������
    list_display_links = ('id', 'ward', 'gakku', 'name',)  # �C�������N�ŃN���b�N�ł��鍀��
    # list_display_links = ('number', 'name',)  # �C�������N�ŃN���b�N�ł��鍀��
    resource_class = ShelterModelResource



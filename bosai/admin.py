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
    list_display =  ('id', 'ward', 'gakku', 'name',)   # 一覧に出したい項目
    # list_display = ('number', 'name',)  # 一覧に出したい項目
    list_display_links = ('id', 'ward', 'gakku', 'name',)  # 修正リンクでクリックできる項目
    # list_display_links = ('number', 'name',)  # 修正リンクでクリックできる項目
    resource_class = ShelterModelResource



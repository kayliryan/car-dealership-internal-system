from django.urls import path

from .views import api_create_technician

urlpatterns = [
    path("technicians/", api_create_technician, name="api_create_technicians"),
]
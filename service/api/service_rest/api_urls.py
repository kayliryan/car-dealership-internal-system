from django.urls import path

from .views import api_create_technician, api_list_appointments

urlpatterns = [
    path("technicians/", api_create_technician, name="api_create_technicians"),
    path("appointments/", api_list_appointments, name="api_create_appointments"),
]
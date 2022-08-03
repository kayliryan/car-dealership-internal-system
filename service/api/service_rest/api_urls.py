from django.urls import path

from .views import api_create_technician, api_list_appointments, api_show_appointment, api_alter_appointment

urlpatterns = [
    path("technicians/", api_create_technician, name="api_create_technicians"),
    path("appointments/", api_list_appointments, name="api_create_appointments"),
    path("appointments/<int:pk>/", api_alter_appointment, name="api_delete_appointment"),
    path("appointments/<str:vin>/", api_show_appointment, name="api_show_appointment"),
]
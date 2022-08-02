from django.urls import path
from .views import api_list_customer, api_salesperson
urlpatterns = [
    path("customers/", api_list_customer, name="list_customers"),
    path("salesperson/", api_salesperson, name="list_salesperson"),
]
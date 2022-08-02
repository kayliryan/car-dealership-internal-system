from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Customer, SalesPerson, SalesRecord, AutomobileVO
from django.http import JsonResponse
import json
# Create your views here.

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone",
        "id"
    ]

class SalesPersonEncoder(ModelEncoder):
    model=SalesPerson
    properties=[
        "name",
        "number",
        "id"
    ]


#list customers / create Customer
    #get/post
@require_http_methods(["GET", "POST"])
def api_list_customer(request):
    if request.method=="GET":
        customer = Customer.objects.all()
        return JsonResponse(
            {"customer":customer},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        print(content)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except:
            return JsonResponse(
                {"message": "Customer cannot be created"},
                status=400,
            )
            
#Create Salesperson
@require_http_methods(["GET","POST"])
def api_salesperson(request):
    if request.method=="GET":
        salesperson = SalesPerson.objects.all()
        return JsonResponse(
            {"Salesperson": salesperson},
            encoder=SalesPersonEncoder
        )
    else:
        content = json.loads(request.body)
        try:
#list salesperson sales history

#List all Sales

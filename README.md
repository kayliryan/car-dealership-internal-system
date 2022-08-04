# CarCar

Team:
* Kayli Ryan - Services
* Jonathan Chen - Sales

## Overview of Project
Explain project


## Steps to follow
This program is ran using Docker and React. Unpack the zip file into a directory named project-beta. Start in this high level directory and run the following commands in your terminal:  "docker-compose build" to build the images and "docker-compose up" to start your containers. Once all 7 containers are running, React can be accessed through your browser at http://localhost:3000/

## Design
![CarCar napkin](Resources/layout1.png)*Layout*

## Service microservice
My entities are Appointments and Technicians while Automobile is my Value Object, getting its information through a poller from the Inventory microservice.
There are 2 bounded contexts: Technician, and Service. My Technician Bounded Context contains only itself while my Service Bounded Context contains the Service Appointments and Service History. For proper implementation of our Service Appointment we need to know if the car that the customer is bringing in was purchased from the dealership. This information is communicated by the Inventory Microservice through the "vip" and "vin" attributes. 


The Service Microservice uses a poller to  create AutomobileVO's for every car that exists in inventory, with its corresponding VIN and VIP status. Whenever a new appointment is being created, our microservice checks to see if an AutomobileVO with that corresponding VIN exists. If it does, we know that this car was purchased from the dealership and we are able to mark the appointment as having a VIP status through the vip=True attribute attached to the VO. If our microservice can not find a matching VIN in our AutomobileVO's then it will create a new AutomobileVO for it through our views and assign it the attribute "vip=False". 


In React we have pages to see a list of all upcoming service appointments, as well as a page called Service History where you can look up a VIN number to see all past service appointments. The "completed" attribute on the Appointment model is what allows this to happen in the backend. All freshly created appointments have an attribute "completed=False". Our Service Appointments page therefore only shows the appointments that have not been completed. The moment the user clicks the "Finished" button on the List Appointments page our microservice marks "completed=True", and removes this appointment from the list. The Service History page is where all "completed=True" appointments live, ready to be shown once the corresponding VIN is typed into the search bar. 

## Sales microservice
### Modeling
From looking at the requirements and looking at the design layout that we created it was clear that Customer, Salesperson, Salesrecord, and AutomobileVO would have to be modeled. 

#### Customer Model
The customer model has a one to many relationship to the Salesperson model beause 1 person can buy cars from many different salespersons. Outside of that relationship, the customer model is rather self-contained just holding the customer's Name, Address, and Phone number

#### Salesperson
The salesperson in my design would be considered the aggregate root pulling in information from all of the other models. The salesperson has a many-to-many relationship with the salesrecord model because multiple salespersons can have multiple sales with a record attached. 

#### Salesrecord

#### AutomobileVO

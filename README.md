# Final-Hotels_Se4458
 
Hotel Booking System
Overview
This project is a hotel booking system similar to Hotels.com. It includes functionalities for hotel admins to manage room availability, users to search for hotels, book rooms, and receive notifications. The system consists of several microservices interacting through APIs, RabbitMQ for messaging, Redis for caching, and MySQL for the database. The services are containerized using Docker for easy deployment and scalability.

Technology Stack

Node.js: Backend runtime environment.

Express.js: Web framework for Node.js.

RabbitMQ: Messaging broker for handling notifications.

Redis: In-memory data structure store for caching.

MySQL: Relational database management system.

Docker: Containerization platform.

API Gateway: Manages and routes requests to the appropriate services.

-	All REST services is versionable and support pagination when needed
  
Functional Requirements
Hotel Admin Service
Add/Update Rooms: Admins can add or update room availability between specified start and end dates.
Authentication: This service requires authentication for admin operations.
Hotel Search Service
Search Hotels: Users can search for hotels by destination, dates, and number of people. Only rooms marked as vacant by admins will appear in results.
Discounted Prices: Logged-in clients see prices with a 10% discount.
Map View: Users can view searched hotels on a map ("Haritada Göster").
Book Hotel Service
Book Hotel: Users can book a hotel room from the hotel detail page. The hotel’s capacity is adjusted accordingly for the specified dates.
No Payment Transaction: This service does not handle payment transactions.
Notification Service
Nightly Scheduled Task:
Notify hotel administrators when the hotel capacity is below 20% for the next month.
Pull new hotel reservations from the queue and send reservation details to admins.

DOCKER :

![dockerfinal](https://github.com/Dogapinarr/Final-Hotels_Se4458/assets/147092474/9c972cfb-dbc9-4a9c-856e-2d7a2e1a2600)

![dockerfinalcont](https://github.com/Dogapinarr/Final-Hotels_Se4458/assets/147092474/783493a9-c40e-41a8-a235-325025bea6c4)



API GATEWAY :

![Ekran görüntüsü 2024-06-10 212653](https://github.com/Dogapinarr/Final-Hotels_Se4458/assets/147092474/5564c6c9-ba0f-4266-a6cd-a6ab8407b4f2)
![Ekran görüntüsü 2024-06-10 212630](https://github.com/Dogapinarr/Final-Hotels_Se4458/assets/147092474/ff02717b-469f-4001-9227-e7b23763e532)
![Ekran görüntüsü 2024-06-10 212523](https://github.com/Dogapinarr/Final-Hotels_Se4458/assets/147092474/394da488-122b-43a4-b686-19f6e0eca8e5)
![Ekran görüntüsü 2024-06-10 212846](https://github.com/Dogapinarr/Final-Hotels_Se4458/assets/147092474/04155fb7-0dc0-41ad-9844-60f0f910a9f2)
![Ekran görüntüsü 2024-06-10 212825](https://github.com/Dogapinarr/Final-Hotels_Se4458/assets/147092474/9f621a68-2032-4632-92ca-7d293f4c1d60)
![Ekran görüntüsü 2024-06-10 212802](https://github.com/Dogapinarr/Final-Hotels_Se4458/assets/147092474/13b17d15-ecba-41e2-99ff-3f005e8659ee)


ER Diagram :


![er diagram final](https://github.com/Dogapinarr/Final-Hotels_Se4458/assets/147092474/99442fb1-0304-4132-a78a-98a067cebc38)

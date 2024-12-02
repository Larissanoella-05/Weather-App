Weathe# SkyMinder


SkyMinder is a weather forecast application that allows users to search for and view weather updates for various locations. It uses **HTML**, **CSS**, and **JavaScript** for a seamless user experience and integrates APIs for geocoding and weather data.


---


## Table of Contents


1. [Description](#description)
2. [Technologies](#technologies)
3. [Live Demo](#live-demo)
4. [Features](#features)
5. [APIs Used](#apis-used)
6. [Setup and Deployment](#setup-and-deployment)
  - [Prerequisites](#prerequisites)
  - [File Transfer](#file-transfer)
  - [Nginx Configuration](#nginx-configuration)
  - [HAProxy Configuration](#haproxy-configuration)
  - [Permissions and Directory Setup](#permissions-and-directory-setup)
7. [Running Locally](#running-locally)
8. [Code Overview](#code-overview)
9. [Author](#author)
10. [Contribution](#contribution)


---


## Description


SkyMinder is a web application that allows users to search for weather forecasts in various locations. The app uses **HTML**, **CSS**, and **JavaScript** to create an interactive, user-friendly interface. By leveraging APIs for geocoding and weather forecasting, SkyMinder provides real-time updates with a visually appealing display.


The application implements `localStorage` to remember the last searched location, ensuring a seamless user experience.


---


## Technologies


- **HTML, CSS, JavaScript**: For building the frontend and adding interactivity.
- **Nginx**: For serving static files and managing HTTP requests on backend servers.
- **HAProxy**: For load balancing traffic between multiple backend servers.
- **Ubuntu**: As the server operating system.
- **scp**: For secure file transfer between local and remote servers.


---


## Live Demo


The live application can be accessed here: [SkyMinder](http://54.91.121.160)


---


## Features


- Fetch weather data for any city in the world.
- Automatic location storage using `localStorage`.
- Real-time updates with visual weather icons.
- Load balanced across multiple servers for reliability and scalability.


---


## APIs Used


1. **Open-Meteo Geocoding API**


  - **Endpoint**: 
    `https://geocoding-api.open-meteo.com/v1/search?name={location}`
  - **Purpose**: To fetch the latitude, longitude, and other metadata for a given location name.


2. **Open-Meteo Weather Forecast API**
  - **Endpoint**: 
    `https://api.open-meteo.com/v1/forecast?latitude={latitude}&longitude={longitude}&timezone={timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
  - **Purpose**: To fetch the daily weather forecast, including temperature ranges and weather conditions.


---


## Setup and Deployment


### Prerequisites


- Two backend servers with Ubuntu installed:
 - **100.27.229.141**
 - **54.173.13.94**
- One load balancer server with Ubuntu installed:
 - **54.91.121.160**
- Nginx installed on backend servers.
- HAProxy installed on the load balancer server.


### File Transfer


1. **Transfer Files to Backend Servers**: 
   Use `scp` to transfer application files to the backend servers:
  ```bash
  scp -r ./Weather-App ubuntu@100.27.229.141:/var/www/html/
  scp -r ./Weather-App ubuntu@54.173.13.94:/var/www/html/
  ```
2. **Ensure the application files (index.html, styles.css, script.js) are located under /var/www/html/Weather-App on both servers**.


  ## Nginx Configuration


  +Install Nginx:


  ```
  sudo apt update
  sudo apt install nginx -y
  ```


  +Configure Nginx:
  Edit the Nginx configuration file:


  ```
  sudo nano /etc/nginx/sites-available/default
  ```


  +Replace the content with:


```
server {
listen 80;
server*name *;
root /var/www/html/Weather-App;
index index.html;


   location / {
       try_files $uri $uri/ =404;
   }


}
```


+Restart Nginx:


```
sudo systemctl restart nginx


```


## HAProxy Configuration


+Install HAProxy:


```
sudo apt update
sudo apt install haproxy -y
```


+Configure HAProxy:
Edit the HAProxy configuration file:


```
sudo nano /etc/haproxy/haproxy.cfg
```


Add the following configuration under the frontend and backend sections:


```
frontend http_front
bind \*:80
default_backend http_back


backend http_back
balance roundrobin
server server1 100.27.229.141:80 check
server server2 54.173.13.94:80 check
```


+Restart HAProxy:


```
sudo systemctl restart haproxy
```


Verify the load balancer by visiting its IP (e.g., http://54.91.121.160). Requests should alternate between the backend servers.


## Permissions and Directory Setup


+Set Ownership for Files:
Ensure the Ubuntu user has ownership of the application directory:


```


sudo chown -R ubuntu:ubuntu /var/www/html/Weather-App
```


+Set Permissions for the Directory:
Adjust permissions for /var/www/html/Weather-App to ensure readability:


```
sudo chmod -R 755 /var/www/html/Weather-App
```


### Running Locally


Clone the repository:


```
git clone https://github.com/larissanoella-05/Weather-App.git
```


## Navigate to the project directory:


```
cd Weather-App
```


## Open the application in your browser:
Open the index.html file in your browser to view the application.



### Author
Shimirwa larissa Noella


Contribution
I welcome contributions, suggestions, and feedback to enhance this project. Please feel free to reach out or submit a pull request.


Happy Coding!



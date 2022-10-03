# mso_Kleinanzeigen_backend

This is the backend for the mso_Kleinanzeigen app. It is a simple REST API that is used to store and retrieve data from a database. The frontend for this app can be found [here](https://github.com/MajoKl/mso_Kleinanzeigen_frontend). The current state of the app supports the following features:

1. first user accounts with oauth2 through github
2. create, edit and delete articles
3. search for articles
4. add articles to favorites

Soon to be added features will include:

1. chat between users
2. better search functionality



## Installation
docker run --name nginx_mso_kleinazeige_dev -p 3001:80 -v "$(pwd)/nginx.conf":/etc/nginx/nginx.conf -d nginx



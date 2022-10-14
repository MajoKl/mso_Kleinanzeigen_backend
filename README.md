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

### Manual installation

1. Clone the repository
2. Install the dependencies with `npm install`
3. Create a folder called `config` in the root directory.
4. Create a file called `.env` in the `config` folder.
5. Add the following lines to the `.env` file:

```text
OAuth_CLIENT_SECRET=your_client_secret
OAuth_CLIENT_ID=your_client_id
PORT=your_port
MONGODB_URL=mongodb://10.20.100.20:27017/mso-kleinanzeigen-dev(as an example)
JWT_SECRET=your_jwt_secret
FRONENDURL=your_frontend_url
COOKIE_URL=your_cookie_url(without a subdomain)
```

6. Run the app with `npm start`

### Docker installation

1. Clone the repository
2. run `docker-compose up --build` in the root directory

## Usage
WIP
### API(REST)
WIP
### Backgroud jobs
WIP
## Models
WIP
## Contributing
WIP
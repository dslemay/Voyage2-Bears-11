# Voyage2-Bears-11

## Set up dev environment

1. Use `npm install` in both the root and client directories to get all your dependencies.
2. Environment variables are stored in a file called dev.js in /config. This is not commited to version control and will need to be added on your local install. See below for the variables and formatting that should be in this file.
3. Use `npm run dev` at the root level to run both your front end and back end servers.

Servers have automatic refreshing which should always work when making changes to the front end, but changes to the back end will sometimes require that you kill the server and restart it.

## Storing your Environment Variables

Below is the format for inserting your environment variables into /config/dev.js. The formatting of the key names must be followed exactly in order for the app to work.

* yelpClientID and yelpClientSecret: These variables are needed in order to access the Yelp Fusion API which is utilized in the application to fetch data on hotels and POIs for each location.
* database: This variable is the URI to connect to your database. This project utilizes MongoDB for it's database architecture.
* cookieSecret: This variable is for signing the cookies and maintaining persistent user sessions to enable user authentication.

```
module.exports = {
  yelpClientID: '',
  yelpClientSecret: '',
  database: '',
  cookieSecret: ''
};
```

## Contributors

This project was created and built as part of the Chingu Vopyage 2 cohort. Contributing developers are:

* [Adrian Bernardo](https://github.com/bernar83)
* [Alex Steele](https://github.com/alexsteele110)
* [Daniel Lemay](https://github.com/dslemay)
* [Jarold Wong](https://github.com/jaroldwong)
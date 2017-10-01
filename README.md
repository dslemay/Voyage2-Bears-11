# Voyage2-Bears-11

## Set up dev environment

1. Use `npm install` in both the root and client directories to get all your dependencies.
2. Create a `.env` file at the root level and store your DATABASE variable in it with the url to access the MongoDB database.
3. Use `npm run dev` at the root level to run both your front end and back end servers.

Servers have automatic refreshing which should always work when making changes to the front end, but changes to the back end will sometimes require that you kill the server and restart it.

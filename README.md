This is a full stack application with it's backend in Java Spring Boot, and frontend in React.
Everything is run using docker compose, and is behind an nginx container.
The intended host for this application is a Linux virtual machine running an Ubuntu distribution.


These are the steps needed to run the application:
1. Run `required.sh` script.
2. A dns is needed in order to utilize https. Register the ip of the host under any dns. Ports 80 and 443 should be exposed to inbound traffic
3. Generate certificates for https.
4. In case you want to populate the database with some starting records user all the `populate{Entity}.sql` file.
5. `docker-compose up` to set up the backend.
6. For the frontend, netlify deployment could be used. For build commands, tell netlify to use `npm build`.
7. The following environment variables should be set for the frontend: `SERVER_LINK` should contain the url to the api. 


Alternatively for backend you can do:
1. Run `required.sh` script.
2. A dns is needed in order to utilize https. Register the ip of the host under any dns. Ports 80 and 443 should be exposed to inbound traffic
3. Generate certificates for https.
4. Run `run.sh` script.

# Lab 5x assignment

To make things easier with deployments, you will be using this repository for a while. Check this link weekly for new requirements: https://github.com/UBB-SDI-23/Lab-5x-assignments/blob/main/README.md 

Commit and push everything to this repository.

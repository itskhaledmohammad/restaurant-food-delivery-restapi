# Resturant Food Delivery RESTAPI
# ERD (Entity Relationship Diagram)
![Alt text](/images/ERD.png "ERD")

# Steps to run the project
1.  Make sure your have `node`, `docker` and `docker-compose` installed. 
2. `git clone` the project to your local machine 
3.  Rename the `.dev.env.sample` inside the `config` directory to `.dev.env`
4. Then run `npm install`, which will install all the required dependencies 
5. Inside it, assign value to each of the variables. 
     Example: 
     `POSTGRES_USER=foodman`
     `POSTGRES_PASSWORD=spicyshushi`
     `POSTGRES_DB=food_delivery_system`
6. Now, as the JWT is signed with Asynchronous keys, so you can put yours in the `keys` directory or you can run the command: `node generateKeys.js` which will generate `id_rsa_priv.pem` and `id_rsa_pub.pem`,  inside the `keys` directory 
7. Now run `sudo docker-compose up --build` which will spin up 3 containers needed for the project.
8. After than run the command: `npm run rms`, which will migrate and seed the database.
9. And Finally you should be able to access the api at: `localhost/api/v1/`

Here is a list to Postman Collection that you can use to play with the api: https://www.getpostman.com/collections/81ec368366c4eacab421

Happy Hacking! :tada:

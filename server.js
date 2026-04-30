require("dotenv").config();
const app = require('./src/app');

const connectToDB = require("./src/config/db")


connectToDB()

app.listen(3000, () => {
    console.log("Server is running on 3000"); 
}) 

// keJUazGppTjsDXC1

// mongodb+srv://nikesh21soni_db_user:keJUazGppTjsDXC1@cluster0.bhdtmge.mongodb.net/
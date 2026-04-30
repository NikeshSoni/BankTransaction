

const mongoose = require("mongoose")

function connectToDB(params) {

    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Server is conncetec ");
        }).catch(err => {
            console.log("<Mat kar ");
            process.exit(1)
        })
}

module.exports = connectToDB; 
const mongoose = require('mongoose')

exports.dbConnection = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => { console.log("Db connection done") })
        .catch((err) => {
            console.error("An error occured", err)
            process.exit(1)
        });
}
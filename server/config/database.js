const mongoose = require("mongoose");

exports.connect = () => {
    const mongoURL = process.env.MONGODB_URL;
    if (!mongoURL) {
        console.error("MongoDB URI is not defined in environment variables");
        process.exit(1); // Exit process with failure
    }

    mongoose
        .connect(mongoURL)
        .then(() => console.log("Database connected successfully"))
        .catch((error) => {
            console.error("Failed to connect to the database");
            console.error(error);
            process.exit(1); // Exit process with failure
        });
};

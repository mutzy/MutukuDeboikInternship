import mongoose from "mongoose";
// import "../envConfig.ts";

export const mongooseConnection = async () => {


    try {
        const mongoUri = process.env.MONGODB_URI;

        if (!mongoUri) {
            throw new Error("MONGODB_URI is not defined in environment variables.");
        }

        await mongoose.connect(mongoUri);

        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit process with failure
    }
}
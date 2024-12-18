import mongoose from "mongoose";

const connectMongo = async () => {
    try {
        const connect=await mongoose.connect(process.env.MONGO_URI);
        const db = connect.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.on('connected', console.log.bind(console, 'connected to database'))   
        
        
    } catch (error) {
        console.log("Error connecting to database", error);
        process.exit(1);        
    }
}

export default connectMongo;
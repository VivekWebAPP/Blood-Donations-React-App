import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const ConnectionString = process.env.CONNECTION_STRING;

const ConnectToDB = async () => {
    try {
        await mongoose.connect(ConnectionString);
        console.log('Connected To DB');
    } catch (error) {
        console.log('Failed To Connect To DB');
    }
}

export default ConnectToDB;
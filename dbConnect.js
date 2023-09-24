import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        await connect(process.env.DATABASE_URI);
    } catch (err) {
        console.log(err);
    }
}

export default connectDB;
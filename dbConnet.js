import { connect } from 'mongoose';

const connectDB = async () => {
    try {
        await connect("mongodb+srv://admin:RDYaw0q3If0n1nV9@mycluster.ijl6jr0.mongodb.net/jptv20_tinyblogs?retryWrites=true&w=majority");
        // await connect("mongodb+srv://admin:o27M12VEOjusFP9g@dbcluster.yfyyot2.mongodb.net/?retryWrites=true&w=majority");
    } catch (err) {
        console.log(err);
    }
}

export default connectDB;
import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/Test_MST');
        console.log('Connection successfully!');
    } catch (err) {
        console.log(err, 'Connection Failed');
    }
}

import mongoose from "mongoose";

 const connectDB = async () => {
  try {
    //registering the event
    mongoose.connection.on("connected", () =>
      console.log("Database Connected")
    );
    //connect with the database
    await mongoose.connect(`${process.env.MONGODB_URI}/groceryApp`);
  } catch (error) {
    console.error(error.message);
  }
};
export default connectDB;

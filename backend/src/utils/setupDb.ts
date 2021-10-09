import * as mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWD}@cluster0.n2nuj.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        dbName: process.env.MONGO_DATABASE_NAME,
      }
    );
    console.info("MongoDB Connected...");
  } catch (error) {
    console.log({
      level: "error",
      message: "Error connecting",
      metadata: error,
    });
    process.exit(1);
  }
};

export default connectDB;

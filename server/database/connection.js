import mongoose from "mongoose";



// mongoose.connect(process.env.MONGO_URL, () => {
//     console.log("Connected to MongoDB");
// });
// mongoose.set("strictQuery", false);
// mongoose.connect(dotenv.config.DB,{ useNewUrlParser: true });
import dotenv from 'dotenv' 
dotenv.config({ path: 'ENV_FILENAME' });

mongoose.set('strictQuery', false);
export default async () => {
  try {
    return (
        mongoose.connect(process.env.MONGO_URL)
        )
        
  } catch (error) {
    console.log("Database error",error);
  }
};

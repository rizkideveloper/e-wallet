import mongoose from "mongoose";
const { Schema } = mongoose;

const transationSchema = new Schema({
  user_id: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "user_id is required"],
  },
  transaction_date: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "name is required"],
  },
  category: {
    type: String,
    enum: {
      values: ["masuk", "keluar"],
      message: "{VALUE} is not supported",
      required: [true, "category is required"],
    },
  },
  price: {
    type: Number,
    required: [true, "price is required"],
  },
});

const Transaction = mongoose.model("Transaction", transationSchema);

export default Transaction;

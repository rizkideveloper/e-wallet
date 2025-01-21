import asyncHandler from "../middlewares/asyncHandler.js";
import Transaction from "../models/TransactionModel.js";
import User from "../models/userModel.js";

export const getAllTransaction = asyncHandler(async (req, res) => {
    res.send('All Transaction')

    // const user_id = await User.findById(req.user._id).select("_id");
    // res.send(user_id);
    
});

export const detailTransaction = asyncHandler(async (req, res) => {
  res.send("Detail Transaction");
});

export const storeTransaction = asyncHandler(async (req, res) => {
  const user_id = await User.findById(req.user._id).select("_id");
  const newTransaction = await Transaction.create({
    user_id: user_id,
    transaction_date: req.body.date,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price
  });

  return res.status(200).json({
    status: "Success",
    message: "Transaction has been added",
    data: newTransaction
  });

});

export const updateTransaction = asyncHandler(async (req, res) => {
  res.send("Update Transaction");
});

export const deleteTransaction = asyncHandler(async (req, res) => {
  res.send("Delete Transaction");
});

export const fileUploadTransaction = asyncHandler(async (req, res) => {
  res.send("File Upload Transaction");
});

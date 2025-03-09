import asyncHandler from "../middlewares/asyncHandler.js";
import Transaction from "../models/TransactionModel.js";
import User from "../models/userModel.js";

export const getAllTransaction = asyncHandler(async (req, res) => {
  
  const transactions = await Transaction.find({ user_id: req.user._id });
  return res.status(200).json({
    data: transactions,
  });
});

export const getTransactionByCategory = asyncHandler(async (req,res) => {
  const category = req.params.category
  const transation_category = await Transaction.find({user_id: req.user._id, category: category})
  
  return res.status(200).json({
    data: transaction_category,
  });
});

export const detailTransaction = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;
  const transaction = await Transaction.findById(paramsId);
  return res.status(200).json({
    data: transaction,
  });
});

export const storeTransaction = asyncHandler(async (req, res) => {
  const user_id = await User.findById(req.user._id).select("_id");
  const newTransaction = await Transaction.create({
    user_id: user_id,
    transaction_date: req.body.date,
    name: req.body.name,
    category: req.body.category,
    price: req.body.price,
  });

  return res.status(200).json({
    status: "Success",
    message: "transaction has been added",
    data: newTransaction,
  });
});

export const updateTransaction = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;
  const transaction = await Transaction.findByIdAndUpdate(paramsId,req.body,{
    runValidators : true,
    new: true
  });

  return res.status(200).json({
    message: 'transaction has been updated!',
    data: transaction,
  });
});

export const deleteTransaction = asyncHandler(async (req, res) => {
  const paramsId = req.params.id;
  await Transaction.findByIdAndDelete(paramsId);

  return res.status(200).json({
    message: "transaction has been deleted!",
  });
});

export const fileUploadTransaction = asyncHandler(async (req, res) => {
  res.send("File Upload Transaction");
});

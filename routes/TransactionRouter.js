import express from "express"
import { protectedMiddleware } from "../middlewares/authMiddleware.js";
import { getAllTransaction, detailTransaction, storeTransaction, updateTransaction, deleteTransaction, fileUploadTransaction } from "../controllers/TransactionController.js";
const router = express.Router();

//get /api/v1/transaction/getAll
router.get("/", getAllTransaction )

//get /api/v1/transaction/show
router.get("/show/:id", detailTransaction);

//post /api/v1/transaction/store
router.post("/store", storeTransaction);

//put /api/v1/transaction/update
router.put("/update/:id", updateTransaction);

//delete /api/v1/transaction/delete
router.delete("/delete/:id", deleteTransaction);


export default router;

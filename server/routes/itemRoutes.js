import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import cloudinary from "../storage/storage.js";
import Item from "../models/itemModel.js";
import upload from "../middleware/multer.js";
import {
  createItem,
  getFilteredItemsItems,
  getItems,
  getSearchedItems,
  getSellersItems,
} from "../controllers/itemController.js";

const router = express.Router();

// router.post("/create-item", protect, createItem);
router.get("/get-items", getItems);
router.get("/get-filtered-items", getFilteredItemsItems);
router.get("/get-searched-items", getSearchedItems);
router.get("/get-sellers-items", protect, getSellersItems);
router.post(
  "/create-item",
  upload.single("image"),
  protect,
  async function (req, res) {
    const img = await cloudinary.uploader.upload(
      req.file.path,
      function (err, result) {
        if (err) {
          console.log(err);
          return res.status(500).json({
            success: false,
            message: "Error",
          });
        }

        return result;
      }
    );
    const { itemTitle, itemDescription, itemPrice, category, subCategory } =
      await req.body;
    const user = await req.user;
    console.log(user, "user");
    if (user.role !== "seller") {
      res.status(400).json({
        message: "Only sellers can create an item",
      });
    }
    if (
      !itemTitle ||
      !itemDescription ||
      !itemPrice ||
      !category ||
      !subCategory
    ) {
      res.status(400).json({
        message: "Please fill up all fields",
      });
    }

    console.log(img.secure_url, "liu");
    const item = await Item.create({
      itemTitle: itemTitle,
      itemDescription: itemDescription,
      itemImage: img.secure_url,
      itemPrice: itemPrice,
      category: category,
      user: req.user._id,
      subCategory: subCategory,
    });
    if (item) {
      res.status(201).json(item);
    } else {
      res.status(400).json({
        message: "Try again please",
      });
    }
  }
);

export default router;

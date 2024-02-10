import asyncHandler from "express-async-handler";
import Item from "../models/itemModel.js";

//create an item

export const createItem = asyncHandler(async (req, res) => {
  console.log(req.file);
  const {
    itemTitle,
    itemDescription,
    itemPrice,
    category,
    subCategory,
    itemImage,
  } = await req.body;
  const user = await req.user;
  console.log(user);
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
    !subCategory ||
    !itemImage
  ) {
    res.status(400).json({
      message: "Please fill up all fields",
    });
  }

  const item = await Item.create({
    itemTitle: itemTitle,
    itemDescription: itemDescription,
    itemImage: itemImage,
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
});

export const getItems = asyncHandler(async (req, res) => {
  const items = await Item.find();
  console.log(items, "it");
  if (items) {
    res.status(200).json(items);
  } else {
    res.status(400).json({
      message: "Error occured",
    });
  }
});
export const getFilteredItemsItems = asyncHandler(async (req, res) => {
  const { category } = await req.body;
  if (!category) {
    res.status(400).json({
      message: "Please add data",
    });
  }
  const items = await Item.find({ category: category });
  console.log(items);
  if (items) {
    res.status(200).json(items);
  } else {
    res.status(400).json({
      message: "Error occured",
    });
  }
});
export const getSearchedItems = asyncHandler(async (req, res) => {
  const { name } = await req.body;
  if (!name) {
    res.status(400).json({
      message: "Please add data",
    });
  }
  const items = await Item.find({ itemTitle: { $regex: name, $options: "i" } });
  console.log(items);
  if (items) {
    res.status(200).json(items);
  } else {
    res.status(400).json({
      message: "No data found",
    });
  }
});

export const getSellersItems = asyncHandler(async (req, res) => {
  const items = await Item.find({ user: req.user.id });
  res.status(200).json(items);
});

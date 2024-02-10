import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please add a user"],
  },
  itemTitle: {
    type: String,
    required: true,
  },
  itemDescription: {
    type: String,
    required: true,
  },
  itemImage: {
    type: String,
  },
  itemPrice: {
    type: String,
    required: true,
  },
  itemAvailable: {
    type: Boolean,
    default: false,
  },
  itemRating: {
    type: Number,
    default: 0,
  },
  itemCount: {
    type: Number,
    default: 0,
    // required: true,
  },
  category: {
    type: String,
    required: true,
  },
  subCategory: {
    type: String,
    required: true,
  },
});

const Item = mongoose.model("Item", itemSchema);
export default Item;

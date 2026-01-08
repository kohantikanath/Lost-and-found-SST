import mongoose, { Schema, model, models } from "mongoose";

const FoundItemSchema = new Schema(
  {
    itemName: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        "ID Cards",
        "Bottles",
        "Wallets",
        "Electronics",
        "Stationery",
        "Others",
      ],
    },
    imageUrl: { type: String, required: true }, // URL from Cloudinary
    locationKept: {
      type: String,
      required: true,
      enum: [
        "Reception",
        "Security Desk",
        "Hostel Desk",
        "Library",
        "Cafeteria",
        "Labs",
      ],
    },
    foundDate: { type: Date, required: true },
    description: { type: String },
    contactInfo: { type: String },
    status: {
      type: String,
      default: "available",
      enum: ["available", "claimed"],
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

// Check if the model already exists to prevent re-compilation in Next.js HMR
const FoundItem = models.FoundItem || model("FoundItem", FoundItemSchema);

export default FoundItem;

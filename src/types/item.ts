// src/types/item.ts

export type Category =
  | "ID Cards"
  | "Bottles"
  | "Wallets"
  | "Electronics"
  | "Stationery"
  | "Others";

export type HandoverLocation =
  | "Reception"
  | "Security Desk"
  | "Hostel Desk"
  | "Library"
  | "Cafeteria"
  | "Labs";

export interface FoundItem {
  _id?: string;
  itemName: string;
  category: Category;
  imageUrl: string;
  locationKept: HandoverLocation;
  foundDate: string;
  description?: string;
  contactInfo?: string;
  status: "available" | "claimed";
  createdAt: string;
}

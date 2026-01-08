"use client";

import { useState } from "react";
import { FoundItem } from "@/types";
import ItemCard from "./ItemCard";
import EmptyState from "./EmptyState";

export default function FilteredItems({
  initialItems,
  onReportClick,
}: {
  initialItems: FoundItem[];
  onReportClick: () => void;
}) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    "ID Cards",
    "Bottles",
    "Wallets",
    "Electronics",
    "Stationery",
    "Others",
  ];

  const filtered = initialItems.filter((item) => {
    const matchesSearch = item.itemName
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === "All" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      {/* Search & Filter UI */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search items..."
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#161926] border border-gray-800 rounded-2xl py-4 px-12 text-white placeholder-gray-500 outline-none focus:border-[#f06524] transition-all"
          />
          <span className="absolute left-4 top-4 text-xl">🔍</span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-5 py-2 rounded-full border transition-all text-xs font-bold ${
                activeCategory === cat
                  ? "bg-[#f06524] border-[#f06524] text-white shadow-lg shadow-[#f06524]/20"
                  : "border-gray-800 text-gray-400 hover:border-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.length > 0 ? (
          filtered.map((item) => <ItemCard key={item._id} item={item} />)
        ) : (
          <div className="col-span-full">
            <EmptyState onReportClick={onReportClick} />
          </div>
        )}
      </div>
    </>
  );
}

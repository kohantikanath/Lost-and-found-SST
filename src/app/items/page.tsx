"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import FilteredItems from "@/components/FilteredItems";
import Modal from "@/components/ui/Modal";
import ReportForm from "@/components/forms/ReportForm";
import { FoundItem } from "@/types";

export default function ItemsDashboard() {
  const { getToken } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<FoundItem[]>([]);
  const [activeTab, setActiveTab] = useState<"lost" | "found">("found");

  useEffect(() => {
    async function fetchItems() {
      const token = await getToken();
      const res = await fetch("/api/items", {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    }
    fetchItems();
  }, []);

  const filteredItems = items.filter((item) => item.itemType === activeTab);

  return (
    <main className="p-6 bg-[#0f111a] min-h-screen">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-white text-2xl font-black">Campus Lost & Found</h1>
          <p className="text-gray-500 text-sm">
            Real-time lost & found updates
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#f06524] px-5 py-2.5 rounded-xl text-white font-bold hover:scale-105 transition-all shadow-lg shadow-[#f06524]/20"
        >
          + Report Item
        </button>
      </header>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-gray-800">
        <button
          onClick={() => setActiveTab("found")}
          className={`px-6 py-3 font-bold transition-all ${
            activeTab === "found"
              ? "text-[#f06524] border-b-2 border-[#f06524]"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Found Items
        </button>
        <button
          onClick={() => setActiveTab("lost")}
          className={`px-6 py-3 font-bold transition-all ${
            activeTab === "lost"
              ? "text-[#f06524] border-b-2 border-[#f06524]"
              : "text-gray-400 hover:text-gray-300"
          }`}
        >
          Lost Items
        </button>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Report an Item"
      >
        <ReportForm
          onSuccess={() => {
            setIsModalOpen(false);
            window.location.reload(); // Refresh to show new item
          }}
        />
      </Modal>

      <FilteredItems
        initialItems={filteredItems}
        onReportClick={function (): void {
          throw new Error("Function not implemented.");
        }}
      />
    </main>
  );
}

"use client";
import { useState, useEffect } from "react";
import FilteredItems from "@/components/FilteredItems";
import Modal from "@/components/ui/Modal";
import ReportForm from "@/components/forms/ReportForm";
import { FoundItem } from "@/types";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [items, setItems] = useState<FoundItem[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchItems() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/items`, {
        cache: "no-store",
      });
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchItems();
  }, []);

  const handleReportSuccess = () => {
    setIsModalOpen(false);
    fetchItems(); // Refresh items after successful report
  };

  if (loading) {
    return (
      <main className="p-6 bg-[#0f111a] min-h-screen flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </main>
    );
  }

  return (
    <main className="p-6 bg-[#0f111a] min-h-screen pb-24">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-white text-2xl font-black tracking-tight">
            Campus Found Items
          </h1>
          <p className="text-gray-500 text-sm">Centralized Lost & Found Hub</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-[#f06524] px-5 py-2.5 rounded-xl text-white text-sm font-bold hover:scale-105 transition-transform shadow-lg shadow-[#f06524]/20"
        >
          + Report
        </button>
      </header>

      {/* The Pop-up Form */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Report Found Item"
      >
        <ReportForm onSuccess={handleReportSuccess} />
      </Modal>

      <FilteredItems
        initialItems={items}
        onReportClick={() => setIsModalOpen(true)}
      />
    </main>
  );
}

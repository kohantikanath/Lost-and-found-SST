"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FoundItem } from "@/types";

interface ItemDetailsClientProps {
  item: FoundItem;
  optimizedUrl: string;
  isAdmin: boolean;
}

export default function ItemDetailsClient({
  item,
  optimizedUrl,
  isAdmin,
}: ItemDetailsClientProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [collectLoading, setCollectLoading] = useState(false);
  const [itemState, setItemState] = useState(item);

  const handleHandover = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCollectLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch(`/api/items/${item._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          isCollected: true,
          collectedBy: {
            name: formData.get("studentName"),
            idNumber: formData.get("idNumber"),
            date: new Date().toISOString(),
          },
        }),
      });

      if (response.ok) {
        alert("Item marked as handed over!");
        setItemState({ ...itemState, isCollected: true });
      } else {
        alert("Failed to record handover");
      }
    } catch (error) {
      console.error("Handover Error:", error);
      alert("Failed to record handover");
    } finally {
      setCollectLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f111a] text-white p-4 pb-20 md:p-10">
      <div className="max-w-2xl mx-auto">
        {/* Navigation */}
        <Link
          href="/items"
          className="flex items-center gap-2 text-gray-500 mb-6 hover:text-white transition-colors"
        >
          <span className="text-xl">←</span> <span>Back to Dashboard</span>
        </Link>

        {/* Main Card */}
        <div className="bg-[#161926] rounded-[32px] overflow-hidden border border-gray-800 shadow-2xl">
          {/* Large Image Header */}
          <div
            className="relative h-80 w-full bg-gray-900 cursor-zoom-in"
            onClick={() => setIsZoomed(true)}
          >
            <Image
              src={optimizedUrl}
              alt={item.itemName}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute top-4 left-4">
              <span className="bg-[#0f111a]/80 backdrop-blur-md text-[#7c3aed] text-[10px] font-black px-4 py-1.5 rounded-full border border-gray-700 uppercase tracking-widest">
                {item.category}
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <h1 className="text-4xl font-black mb-2 capitalize tracking-tight">
              {item.itemName}
            </h1>
            <p className="text-gray-500 text-sm mb-4">
              Reported on{" "}
              {new Date(item.foundDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <div className="bg-[#0f111a] p-3 rounded-lg border border-gray-800/50 mb-8">
              <p className="text-xs text-gray-500 uppercase font-semibold tracking-wider">
                Reported by
              </p>
              <p className="text-gray-200 font-semibold">{item.reportedBy}</p>
              <p className="text-xs text-gray-500">{item.reportedByEmail}</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {/* Handover Location */}
              <div className="bg-[#0f111a] p-6 rounded-2xl border border-gray-800">
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] mb-2">
                  Pick-up Location
                </p>
                <p className="text-[#f06524] font-black text-2xl">
                  {item.locationKept}
                </p>
              </div>

              {/* Description */}
              {item.description && (
                <div className="px-2">
                  <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em] mb-2">
                    Description
                  </p>
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {item.description}
                  </p>
                </div>
              )}

              {/* Offline Disclaimer Box */}
              <div className="mt-4 p-5 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex gap-4 items-start">
                <span className="text-2xl">📢</span>
                <div>
                  <p className="text-blue-400 font-bold text-sm mb-1">
                    Handover Instructions
                  </p>
                  <p className="text-blue-300/70 text-sm leading-snug">
                    Item handover happens offline at the mentioned location.
                    Please bring a valid Student ID for verification.
                  </p>
                </div>
              </div>

              {/* Admin-Only Handover Console */}
              {isAdmin && !itemState.isCollected && (
                <div className="bg-[#f06524]/10 border border-[#f06524]/20 p-6 rounded-3xl mt-8">
                  <h3 className="text-[#f06524] font-black mb-4">
                    Admin Handover Console
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">
                    Record the details of the student collecting this item.
                  </p>
                  <form onSubmit={handleHandover} className="space-y-4">
                    <input
                      type="text"
                      name="studentName"
                      placeholder="Student Name"
                      required
                      className="w-full bg-[#0f111a] p-3 rounded-xl border border-gray-800 text-white placeholder-gray-500 focus:border-[#f06524] outline-none"
                    />
                    <input
                      type="text"
                      name="idNumber"
                      placeholder="ID Card Number"
                      required
                      className="w-full bg-[#0f111a] p-3 rounded-xl border border-gray-800 text-white placeholder-gray-500 focus:border-[#f06524] outline-none"
                    />
                    <button
                      type="submit"
                      disabled={collectLoading}
                      className={`w-full py-3 rounded-xl font-bold transition-all ${
                        collectLoading
                          ? "bg-gray-600 cursor-not-allowed"
                          : "bg-[#f06524] hover:bg-[#d95a1f] active:scale-95"
                      }`}
                    >
                      {collectLoading ? "Recording..." : "Mark as Handed Over"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Zoom Overlay */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative w-full h-full">
            <Image
              src={item.imageUrl}
              alt={item.itemName}
              fill
              className="object-contain"
            />
          </div>
          <button
            className="absolute top-10 right-10 text-white text-4xl"
            onClick={() => setIsZoomed(false)}
          >
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

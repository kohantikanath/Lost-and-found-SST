"use client";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FoundItem } from "@/types";

export default function ItemDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [item, setItem] = useState<FoundItem | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchItem() {
      try {
        const resolvedParams = await params;
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/items/${resolvedParams.id}`,
          {
            cache: "no-store",
          }
        );
        if (res.ok) {
          const data = await res.json();
          setItem(data);
        }
      } catch (error) {
        console.error("Failed to fetch item:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchItem();
  }, [params]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f111a] flex items-center justify-center">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-[#0f111a] flex flex-col items-center justify-center p-6">
        <p className="text-gray-400 mb-4">
          Item not found or has been claimed.
        </p>
        <Link href="/" className="text-[#f06524] font-bold underline">
          Return Home
        </Link>
      </div>
    );
  }

  const optimizedUrl = item.imageUrl.replace(
    "/upload/",
    "/upload/w_800,h_600,c_fill,g_auto/"
  );

  return (
    <div className="min-h-screen bg-[#0f111a] text-white p-4 pb-20 md:p-10">
      <div className="max-w-2xl mx-auto">
        {/* Navigation */}
        <Link
          href="/"
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
            <p className="text-gray-500 text-sm mb-8">
              Reported on{" "}
              {new Date(item.foundDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>

            <div className="grid grid-cols-1 gap-6">
              {/* Handover Location - High Visibility */}
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
          <button className="absolute top-10 right-10 text-white text-4xl">
            &times;
          </button>
        </div>
      )}
    </div>
  );
}

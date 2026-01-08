"use client";
import { useState } from "react";

interface ReportFormProps {
  onSuccess: () => void;
}

export default function ReportForm({ onSuccess }: ReportFormProps) {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(e.currentTarget);
      const file = formData.get("image") as File;

      // 1. Upload Photo to Cloudinary
      const cloudData = new FormData();
      cloudData.append("file", file);
      cloudData.append("upload_preset", "campus_lost");

      const cloudRes = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        { method: "POST", body: cloudData }
      );

      const fileData = await cloudRes.json();

      if (!fileData.secure_url) throw new Error("Image upload failed");

      // 2. Save Data to MongoDB via our API
      const response = await fetch("/api/items", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          itemName: formData.get("itemName"),
          category: formData.get("category"),
          locationKept: formData.get("locationKept"),
          foundDate: new Date().toISOString(),
          imageUrl: fileData.secure_url,
        }),
      });

      if (response.ok) {
        onSuccess();
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Item Name */}
      <div>
        <label className="block text-sm mb-1 text-gray-300">Item Name *</label>
        <input
          name="itemName"
          required
          className="w-full p-3 rounded-xl bg-[#0f111a] border border-gray-800 focus:border-[#f06524] outline-none text-white"
          placeholder="e.g. Blue Water Bottle"
        />
      </div>

      {/* Category Dropdown */}
      <div>
        <label className="block text-sm mb-1 text-gray-300">Category *</label>
        <select
          name="category"
          required
          className="w-full p-3 rounded-xl bg-[#0f111a] border border-gray-800 text-white"
        >
          <option>ID Cards</option>
          <option>Bottles</option>
          <option>Electronics</option>
          <option>Others</option>
        </select>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm mb-1 text-gray-300">Photo *</label>
        <input
          type="file"
          name="image"
          accept="image/*"
          required
          className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:bg-[#f06524] file:text-white hover:file:bg-[#d95a1f] file:cursor-pointer"
        />
      </div>

      {/* Handover Location */}
      <div>
        <label className="block text-sm mb-1 text-gray-300">
          Where did you leave it? *
        </label>
        <select
          name="locationKept"
          required
          className="w-full p-3 rounded-xl bg-[#0f111a] border border-gray-800 text-white"
        >
          <option>Reception</option>
          <option>Security Desk</option>
          <option>Library</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-4 rounded-xl font-bold transition-all ${
          loading
            ? "bg-gray-600 cursor-not-allowed"
            : "bg-[#f06524] hover:bg-[#d95a1f] active:scale-95"
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Uploading...
          </span>
        ) : (
          "Submit Report"
        )}
      </button>
    </form>
  );
}

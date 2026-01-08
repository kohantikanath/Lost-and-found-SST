import Image from "next/image";
import Link from "next/link";
import { FoundItem } from "@/types"; // Import the shared interface

interface ItemCardProps {
  item: FoundItem;
}

export default function ItemCard({ item }: ItemCardProps) {
  const optimizedUrl = item.imageUrl.replace(
    "/upload/",
    "/upload/w_800,h_600,c_fill,g_auto/"
  );

  return (
    <Link href={`/item/${item._id}`}>
      <div className="bg-[#161926] border border-gray-800 rounded-2xl overflow-hidden shadow-xl transition-all cursor-pointer hover:border-gray-700 active:scale-[0.98]">
        {/* Image Container */}
        <div className="relative h-48 w-full bg-gray-900">
          <Image
            src={optimizedUrl}
            alt={item.itemName}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            priority={false}
          />
          {/* Category Badge */}
          <div className="absolute top-3 left-3 bg-[#0f111a]/80 backdrop-blur-md text-[10px] uppercase tracking-wider font-bold px-3 py-1 rounded-full text-white border border-gray-700/50">
            {item.category}
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-white truncate pr-2 tracking-tight">
              {item.itemName}
            </h3>
          </div>

          <div className="flex flex-col gap-3">
            {/* Location Badge */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                Stored at
              </span>
              <span className="text-[#f06524] text-[11px] font-black bg-[#f06524]/10 px-2 py-0.5 rounded border border-[#f06524]/20">
                {item.locationKept}
              </span>
            </div>

            {/* Footer Info */}
            <div className="flex justify-between items-center mt-2 pt-3 border-t border-gray-800/50">
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase font-medium">
                  Found on
                </span>
                <span className="text-xs text-gray-300 font-semibold">
                  {new Date(item.foundDate).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
              <Link
                href={`/item/${item._id}`}
                className="text-[#7c3aed] text-xs font-black bg-[#7c3aed]/10 px-4 py-2.5 rounded-xl hover:bg-[#7c3aed]/20 transition-all active:scale-95"
              >
                Details →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

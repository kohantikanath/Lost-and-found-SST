export default function SearchHeader() {
  return (
    <div className="mb-6 space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search items (e.g. bottle, keys...)"
          className="w-full bg-[#161926] border border-gray-800 rounded-xl py-3 px-11 text-white placeholder-gray-500 outline-none focus:border-[#f06524]"
        />
        <span className="absolute left-4 top-3.5 text-gray-500">🔍</span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {["All", "ID Cards", "Electronics", "Bottles"].map((cat) => (
          <button
            key={cat}
            className="whitespace-nowrap px-4 py-1.5 rounded-full border border-gray-800 text-xs font-medium text-gray-400 active:bg-[#f06524] active:text-white"
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

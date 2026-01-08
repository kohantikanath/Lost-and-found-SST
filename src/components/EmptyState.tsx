interface EmptyStateProps {
  onReportClick: () => void;
}

export default function EmptyState({ onReportClick }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-[#161926] rounded-3xl border border-dashed border-gray-800">
      <div className="w-20 h-20 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
        <svg
          className="w-10 h-10 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-white mb-2">No items found yet</h2>
      <p className="text-gray-400 text-sm max-w-xs mb-8">
        Everything seems to be with its owner. If you found something, help the
        community by reporting it!
      </p>
      <button
        onClick={onReportClick}
        className="bg-[#f06524] text-white px-8 py-3 rounded-xl font-bold hover:scale-105 transition-transform"
      >
        Report an Item
      </button>
    </div>
  );
}

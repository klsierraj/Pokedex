type Props = {
  sort: "number" | "name";
  onChange: (sort: "number" | "name") => void;
};

export function SortDropdown({ sort, onChange }: Props) {
  return (
    <div className="absolute top-20 right-4 bg-white rounded-2xl shadow-lg overflow-hidden z-10 w-48">
      {/* Header */}
      <div className="bg-primary px-4 py-3">
        <span className="text-white font-bold text-sm">Sort by:</span>
      </div>
      
      {/* Options */}
      <div className="py-2">
        <div
          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-background"
          onClick={() => onChange("number")}
        >
          <input
            type="radio"
            checked={sort === "number"}
            readOnly
            className="w-4 h-4"
            style={{ accentColor: "#DC0A2D" }}
          />
          <span className="text-sm text-gray-dark font-medium">Number</span>
        </div>
        <div
          className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-background"
          onClick={() => onChange("name")}
        >
          <input
            type="radio"
            checked={sort === "name"}
            readOnly
            className="w-4 h-4"
            style={{ accentColor: "#DC0A2D" }}
          />
          <span className="text-sm text-gray-dark font-medium">Name</span>
        </div>
      </div>
    </div>
  );
}

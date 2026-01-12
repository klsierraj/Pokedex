interface SearchInputProps {
    value: string;
    onChange: (v: string) => void;
    onClear: () => void;
  }
  
  export function SearchInput({ value, onChange, onClear }: SearchInputProps) {
    return (
      <div className="flex items-center bg-white border border-gray-light rounded-full px-3 py-2 shadow-drop-2">
        <span className="material-symbols-outlined text-gray-medium mr-2">
          search
        </span>
  
        <input
          className="flex-1 outline-none text-sm"
          placeholder="Search"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
  
        {value.length > 0 && (
          <button onClick={onClear}>
            <span className="material-symbols-outlined text-gray-medium">
              close
            </span>
          </button>
        )}
      </div>
    );
  }
  
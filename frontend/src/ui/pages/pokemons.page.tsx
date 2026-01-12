import { useEffect, useState } from "react";
import { AppBar } from "../components/AppBar/AppBar";
import { SearchInput } from "../components/SearchInput/SearchInput";
import { SortDropdown } from "../components/SortDropdown/SortDropdown";
import { PokemonGrid } from "../components/PokemonGrid/PokemonGrid";
import { makeListPokemonsUseCase } from "../../infra/factories/pokemon.factory";
import type { Pokemon } from "../../core/domain/models/pokemon";

export function PokemonsPage() {
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 20,
    total_pages: 0
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<"number" | "name">("number");
  const [showSort, setShowSort] = useState(false);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    setLoading(true);
    const useCase = makeListPokemonsUseCase();
    useCase.execute(currentPage, 20)
      .then((result) => {
        setPokemons(result.pokemons);
        setPagination(result.pagination);
      })
      .catch((err) => {
        console.error("Error loading pokemons:", err);
      })
      .finally(() => setLoading(false));
  }, [currentPage]);

  const filtered = pokemons
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) =>
      sort === "number"
        ? a.number - b.number
        : a.name.localeCompare(b.name)
    );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.total_pages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full min-h-screen bg-primary px-2 flex flex-col">
      <AppBar />

      <div className="flex-1 bg-white rounded-t-2xl shadow-[0px_-4px_10px_rgba(0,0,0,0.1)]">
        
        {/* Search + Sort */}
        <div className="flex items-center gap-2 px-4 pt-4 pb-2">
          <div className="flex-1">
            <SearchInput
              value={search}
              onChange={setSearch}
              onClear={() => setSearch("")}
            />
          </div>

          {/* Botón Sort */}
          <button
            onClick={() => setShowSort(!showSort)}
            className="w-10 h-10 bg-white border border-gray-light rounded-full flex items-center justify-center shadow-drop-2 font-bold text-gray-dark"
          >
            {sort === "number" ? "#" : "A"}
          </button>
        </div>

        {/* Sort card */}
        {showSort && (
          <SortDropdown
            sort={sort}
            onChange={(s) => {
              setSort(s);
              setShowSort(false);
            }}
          />
        )}

        {/* Grid */}
        {loading ? (
          <div className="flex justify-center py-8">
            <div className="text-gray-medium">Loading...</div>
          </div>
        ) : (
          <>
            <div className="px-4 pb-6">
              <PokemonGrid pokemons={filtered} />
            </div>
            
            {/* Pagination */}
            {!search && pagination.total_pages > 1 && (
              <div className="flex items-center justify-center gap-2 px-4 pb-6">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    currentPage === 1
                      ? "bg-gray-light text-gray-medium cursor-not-allowed"
                      : "bg-white text-gray-dark hover:bg-gray-background shadow-drop-2"
                  }`}
                >
                  Previous
                </button>
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, pagination.total_pages) }, (_, i) => {
                    let pageNum;
                    if (pagination.total_pages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= pagination.total_pages - 2) {
                      pageNum = pagination.total_pages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`w-8 h-8 rounded-lg text-sm font-medium ${
                          currentPage === pageNum
                            ? "bg-primary text-white"
                            : "bg-white text-gray-dark hover:bg-gray-background shadow-drop-2"
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === pagination.total_pages}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    currentPage === pagination.total_pages
                      ? "bg-gray-light text-gray-medium cursor-not-allowed"
                      : "bg-white text-gray-dark hover:bg-gray-background shadow-drop-2"
                  }`}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

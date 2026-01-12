import pokeball from "../../../assets/pokeball.png";

export function AppBar() {
  return (
    <header className="w-full h-16 bg-primary flex items-center px-4 gap-2 shadow-md">
      <img
        src={pokeball}
        alt="pokeball"
        className="w-6 h-6 object-contain"
      />
      <span className="text-white text-xl font-bold">
        Pokédex
      </span>
    </header>
  );
}

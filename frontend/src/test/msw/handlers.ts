import { http, HttpResponse } from "msw";

type LoginBody = {
  username: string;
  password: string;
};

export const handlers = [
  http.post("/api/v1/login", async ({ request }) => {
    const body = (await request.json()) as LoginBody;

    if (body.username === "admin" && body.password === "admin") {
      return HttpResponse.json({
        token: "mock-jwt",
        user: { username: "admin" }
      });
    }

    return new HttpResponse("Unauthorized", { status: 401 });
  }),

  // Pokemon list endpoint
  http.get("/api/v1/pokemons", ({ request }) => {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "20", 10);

    const mockPokemons = Array.from({ length: limit }, (_, i) => ({
      name: `pokemon-${page * limit + i + 1}`,
      number: page * limit + i + 1,
      image_url: `https://example.com/${page * limit + i + 1}.png`
    }));

    return HttpResponse.json({
      success: true,
      pokemons: mockPokemons,
      pagination: {
        total: 100,
        page,
        limit,
        total_pages: Math.ceil(100 / limit)
      }
    });
  }),

  // Pokemon search endpoint (must come before /:id to avoid route conflict)
  http.get("/api/v1/pokemons/search", ({ request }) => {
    const url = new URL(request.url);
    const name = url.searchParams.get("name");

    if (!name || name === "nonexistentpokemon12345") {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }

    // Handle trimmed names (pikachu, "pikachu", "  pikachu  ")
    const trimmedName = name.trim();
    
    if (trimmedName === "pikachu") {
      return HttpResponse.json({
        name: "pikachu",
        number: 25,
        image_url: "https://example.com/25.png"
      });
    }

    return HttpResponse.json({ error: "Not found" }, { status: 404 });
  }),

  // Pokemon detail endpoint (must come after /search)
  http.get("/api/v1/pokemons/:id", ({ params }) => {
    const id = parseInt(params.id as string, 10);

    if (id === 99999) {
      return HttpResponse.json({ error: "Not found" }, { status: 404 });
    }

    return HttpResponse.json({
      id,
      name: `pokemon-${id}`,
      types: ["normal"],
      height: 0.7,
      weight: 6.9,
      abilities: ["ability1"],
      moves: ["move1", "move2"],
      base_stats: {
        hp: 45,
        attack: 49,
        defense: 49,
        special_attack: 65,
        special_defense: 65,
        speed: 45
      },
      image_url: `https://example.com/${id}.png`
    });
  })
];

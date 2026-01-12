# Pokedex Backend

Rails API backend for the Pokedex application. Provides authentication and Pokemon data by integrating with PokeAPI.

## 🚀 Tech Stack

- **Rails 8.1.1** - Ruby web framework
- **Ruby** - Programming language
- **SQLite3** - Database
- **JWT** - Authentication tokens
- **HTTParty** - HTTP client for PokeAPI integration
- **Puma** - Web server
- **RSpec** - Testing framework

## 📋 API Endpoints

### Authentication
- `POST /api/v1/login` - User authentication (returns JWT token)

### Pokemon (requires authentication)
- `GET /api/v1/pokemons` - List Pokemon with pagination (`?page=1&limit=20`)
- `GET /api/v1/pokemons/:id` - Get Pokemon details
- `GET /api/v1/pokemons/search?name=:name` - Search Pokemon by name

## 🛠️ Getting Started

### Prerequisites

- Ruby 3.3+
- Bundler

### Installation

```bash
# Install dependencies
bundle install

# Setup database
rails db:create db:migrate

# Seed database (if needed)
rails db:seed
```

### Development

```bash
# Start server
bin/dev

# Server runs on http://localhost:3000
```

### Testing

```bash
# Run tests
bundle exec rspec
```

## 🔐 Authentication

All Pokemon endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <token>
```

Get a token by logging in with:
- Username: `admin`
- Password: `admin`

## 📦 Features

- JWT-based authentication
- Integration with PokeAPI
- CORS enabled for frontend
- Pagination support
- Error handling

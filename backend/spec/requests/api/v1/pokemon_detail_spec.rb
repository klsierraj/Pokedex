# spec/requests/api/v1/pokemon_detail_spec.rb
require 'rails_helper'
require 'webmock/rspec'

RSpec.describe "GET /api/v1/pokemons/:id", type: :request do
  let(:valid_token) { Authentication::TokenService.encode("admin") }
  let(:pokemon_id) { 1 }
  
  before do
    stub_request(:get, "https://pokeapi.co/api/v2/pokemon/1")
      .to_return(
        status: 200,
        body: {
          id: 1,
          name: "bulbasaur",
          abilities: [
            { ability: { name: "overgrow" } },
            { ability: { name: "chlorophyll" } }
          ],
          moves: [
            { move: { name: "tackle" } },
            { move: { name: "vine-whip" } },
            { move: { name: "growl" } }
          ],
          forms: [
            { name: "bulbasaur" }
          ],
          sprites: {
            front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
          }
        }.to_json,
        headers: { 'Content-Type': 'application/json' }
      )
  end
  
  describe "with authentication" do
    it "returns pokemon details with abilities, moves and forms" do
      get "/api/v1/pokemons/#{pokemon_id}", 
          headers: { "Authorization" => "Bearer #{valid_token}" }
      
      expect(response).to have_http_status(:ok)
      
      json = JSON.parse(response.body)
      expect(json["id"]).to eq(1)
      expect(json["name"]).to eq("bulbasaur")
      expect(json["abilities"]).to be_an(Array)
      expect(json["moves"]).to be_an(Array)
      expect(json["forms"]).to be_an(Array)
      expect(json["image_url"]).to be_present
    end
  end
  
  describe "without authentication" do
    it "returns unauthorized" do
      get "/api/v1/pokemons/#{pokemon_id}"
      
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
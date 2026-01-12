module Api::V1
    class PokemonsController < ApplicationController
      before_action :authenticate
      
      def index
        result = Pokemon::ApiClient.list(
          page: params[:page] || 1,
          limit: params[:limit] || 20
        )
        
        if result[:success]
          render json: result
        else
          render json: { error: result[:error] }, status: :service_unavailable
        end
      end
      
      def show
        result = Pokemon::ApiClient.find(params[:id])
        
        if result[:success]
          render json: format_pokemon_detail(result[:data])
        else
          render json: { error: result[:error] }, status: :not_found
        end
      end
      
      def search
        result = Pokemon::ApiClient.find_by_name(params[:name])
        
        if result[:success]
          render json: format_pokemon_search(result[:data])
        else
          render json: { error: result[:error] }, status: :not_found
        end
      end
      
      private
      
      def authenticate
        token = request.headers["Authorization"]&.split(" ")&.last
        unless Authentication::TokenService.valid?(token)
          render json: { error: "Unauthorized" }, status: :unauthorized
        end
      end
      
      def format_pokemon_detail(data)
        image_url = data.dig("sprites", "other", "official-artwork", "front_default") || 
                    data.dig("sprites", "front_default")
        {
          id: data["id"],
          name: data["name"],
          types: data["types"]&.map { |t| t["type"]["name"] } || [],
          height: (data["height"] / 10.0).round(1),
          weight: (data["weight"] / 10.0).round(1),
          abilities: data["abilities"]&.first(2)&.map { |a| a["ability"]["name"] } || [],
          moves: data["moves"]&.first(2)&.map { |m| m["move"]["name"] } || [],
          base_stats: {
            hp: data["stats"]&.find { |s| s["stat"]["name"] == "hp" }&.dig("base_stat") || 0,
            attack: data["stats"]&.find { |s| s["stat"]["name"] == "attack" }&.dig("base_stat") || 0,
            defense: data["stats"]&.find { |s| s["stat"]["name"] == "defense" }&.dig("base_stat") || 0,
            special_attack: data["stats"]&.find { |s| s["stat"]["name"] == "special-attack" }&.dig("base_stat") || 0,
            special_defense: data["stats"]&.find { |s| s["stat"]["name"] == "special-defense" }&.dig("base_stat") || 0,
            speed: data["stats"]&.find { |s| s["stat"]["name"] == "speed" }&.dig("base_stat") || 0
          },
          image_url: image_url
        }
      end
      
      def format_pokemon_search(data)
        image_url = data.dig("sprites", "other", "official-artwork", "front_default") || 
                    data.dig("sprites", "front_default")
        {
          name: data["name"],
          number: data["id"],
          image_url: image_url
        }
      end
    end
  end
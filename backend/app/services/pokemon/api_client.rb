# app/services/pokemon/api_client.rb
module Pokemon
    class ApiClient
      BASE_URL = "https://pokeapi.co/api/v2"
      MAX_LIMIT = 100
      
      def self.list(page: 1, limit: 20)
        # Normalizar parámetros
        page = normalize_page(page)
        limit = normalize_limit(limit)
        
        cache_key = "pokemon_list_page_#{page}_limit_#{limit}"
        
        Rails.cache.fetch(cache_key, expires_in: 1.hour) do
          fetch_pokemon_list(page, limit)
        end
      end
      
      def self.find(id)
        id = id.to_i
        return { success: false, error: "Invalid ID" } if id < 1
        
        cache_key = "pokemon_detail_#{id}"
        
        Rails.cache.fetch(cache_key, expires_in: 1.hour) do
          fetch_pokemon_detail(id)
        end
      end
      
      def self.find_by_name(name)
        return { success: false, error: "Name cannot be blank" } if name.blank?
        
        cache_key = "pokemon_by_name_#{name.downcase}"
        
        Rails.cache.fetch(cache_key, expires_in: 1.hour) do
          fetch_pokemon_by_name(name.downcase)
        end
      end
      
      private
      
      def self.normalize_page(page)
        page = page.to_i
        page < 1 ? 1 : page
      end
      
      def self.normalize_limit(limit)
        limit = limit.to_i
        if limit < 1
          20
        elsif limit > MAX_LIMIT
          MAX_LIMIT
        else
          limit
        end
      end
      
      def self.fetch_pokemon_list(page, limit)
        offset = (page - 1) * limit
        
        response = HTTParty.get("#{BASE_URL}/pokemon?offset=#{offset}&limit=#{limit}")
        
        if response.success?
          {
            success: true,
            pokemons: format_pokemon_list(response.parsed_response["results"]),
            pagination: build_pagination(response.parsed_response["count"], page, limit)
          }
        else
          { success: false, error: "Failed to fetch pokemon list" }
        end
      end
      
      def self.fetch_pokemon_detail(id)
        response = HTTParty.get("#{BASE_URL}/pokemon/#{id}")
        
        if response.success?
          { success: true, data: response.parsed_response }
        else
          { success: false, error: "Pokemon not found" }
        end
      end
      
      def self.fetch_pokemon_by_name(name)
        response = HTTParty.get("#{BASE_URL}/pokemon/#{name}")
        
        if response.success?
          { success: true, data: response.parsed_response }
        else
          { success: false, error: "Pokemon not found" }
        end
      end
      
      def self.format_pokemon_list(results)
        results.map do |pokemon|
          {
            name: pokemon["name"],
            number: extract_id_from_url(pokemon["url"]),
            image_url: build_image_url(extract_id_from_url(pokemon["url"]))
          }
        end
      end
      
      def self.build_pagination(total_count, page, limit)
        {
          total: total_count,
          page: page,
          limit: limit,
          total_pages: (total_count.to_f / limit).ceil
        }
      end
      
      def self.extract_id_from_url(url)
        url.split("/").last.to_i
      end
      
      def self.build_image_url(id)
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/#{id}.png"
      end
    end
  end
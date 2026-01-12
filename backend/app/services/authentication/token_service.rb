
module Authentication
    class TokenService
      SECRET_KEY = Rails.application.secret_key_base
      ALGORITHM = 'HS256'
      
      class << self
        def encode(username)
          payload = {
            username: username,
            exp: 24.hours.from_now.to_i
          }
          JWT.encode(payload, SECRET_KEY, ALGORITHM)
        end
        
        def decode(token)
          JWT.decode(token, SECRET_KEY, true, algorithm: ALGORITHM).first
        rescue JWT::DecodeError
          nil
        end
        
        def valid?(token)
          decode(token).present?
        end
      end
    end
  end
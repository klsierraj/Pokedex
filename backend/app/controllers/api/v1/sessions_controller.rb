# app/controllers/api/v1/sessions_controller.rb
module Api::V1
    class SessionsController < ApplicationController
      def create
        username = params[:username].to_s.strip
        password = params[:password].to_s.strip
        
        if username == "admin" && password == "admin"
          token = Authentication::TokenService.encode(username)
          
          render json: { 
            token: token,
            user: { username: username }
          }, status: :ok
        else
          render json: { 
            error: "Invalid credentials" 
          }, status: :unauthorized
        end
      end
    end
  end
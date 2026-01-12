require 'rails_helper'

RSpec.describe "POST /api/v1/login", type: :request do
  context "with valid credentials" do
    it "returns JWT token" do
      post "/api/v1/login", params: { 
        username: "admin", 
        password: "admin" 
      }
      
      expect(response).to have_http_status(:ok)
      
      json = JSON.parse(response.body)
      expect(json["token"]).to be_present
      expect(json["user"]["username"]).to eq("admin")
    end
  end
  
  context "with invalid credentials" do
    it "returns unauthorized" do
      post "/api/v1/login", params: { 
        username: "wrong", 
        password: "wrong" 
      }
      
      expect(response).to have_http_status(:unauthorized)
      expect(JSON.parse(response.body)["error"]).to eq("Invalid credentials")
    end
  end
end
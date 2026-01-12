require 'rails_helper'

RSpec.describe Authentication::TokenService do
  describe '.encode' do
    it 'generates a JWT token with username' do
      token = described_class.encode('admin')
      
      expect(token).to be_a(String)
      expect(token.split('.').count).to eq(3)
    end
  end
  
  describe '.decode' do
    let(:token) { described_class.encode('admin') }
    
    it 'decodes token and returns username' do
      decoded = described_class.decode(token)
      
      expect(decoded['username']).to eq('admin')
      expect(decoded['exp']).to be_present  
    end
    
    it 'returns nil for invalid token' do
      expect(described_class.decode('invalid.token.here')).to be_nil
    end
  end
  
  describe '.valid?' do
    it 'returns true for valid token' do
      token = described_class.encode('admin')
      expect(described_class.valid?(token)).to be true
    end
    
    it 'returns false for invalid token' do
      expect(described_class.valid?('invalid')).to be false
    end
  end
end
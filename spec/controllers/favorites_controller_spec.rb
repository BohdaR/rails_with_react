# frozen_string_literal: true

require "rails_helper"

RSpec.describe FavoritesController, type: :controller do
  let(:favorites) { Favorite.all }

  before(:each) do
    user = User.create(email: "example@gmail.com", password: "password123")
    sign_in user
  end

  describe "favorites#index" do
    before(:each) { get :index }

    it "renders a successful response" do
      expect(response). to have_http_status(:success)
    end

    it "renders all favorites" do
      expect(JSON.parse(response.body)).to eq(favorites.as_json)
    end
  end
end

# frozen_string_literal: true

require "rails_helper"

RSpec.describe FavoritesController, type: :controller do
  let(:favorites) { Favorite.all }
  let(:place) { create(:place) }
  let(:favorite) { create(:favorite) }

  before(:each) do
    current_user = create(:user)
    sign_in(current_user)
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

  describe "favorites#create" do
    it "creates a new favorite" do
       form_data = {
         favorites: {
         place_id: place.id
       }
     }
       post :create, params: form_data
       expect(response).to have_http_status(:success)
     end
  end

  describe "favorites#destroy" do
    before(:each) do
      delete :destroy, params: { id: favorite.id }
    end
    it "renders a successful response" do
      expect(response).to have_http_status(:success)
    end
  end
end

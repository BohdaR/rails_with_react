# frozen_string_literal: true

require "rails_helper"

RSpec.describe FavoritesController, type: :controller do
  let(:favorites) { Favorite.all }
  let(:user) { create(:user) }
  let(:employee) { create(:employee, user:) }
  let(:place) { create(:place) }
  let(:favorite) { create(:favorite) }

  let(:allowed_action) { create(:allowed_action) }
  let(:subject) { create(:subject) }
  let(:scope) { create(:scope) }
  let(:permission) { create(:permission, allowed_action:, subject:, scope:) }
  let(:role) { create(:role) }

  before(:each) do
    role.permissions << permission
    employee.roles << role
    sign_in(user)
  end


  let(:valid_attributes) do
    {
      place_id: place.id,
      employee_id: employee.id
    }
  end

  let(:invalid_attributes) do
    {
      place_id: -10,
      employee_id: "12"
    }
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
       post :create, params: { favorite: valid_attributes }
       expect(response).to have_http_status(:success)
     end

    it "valid attributes adds a new favorite" do
     expect { post :create, params: { favorite: valid_attributes } }.to change { Favorite.all.count }.by(1)
   end

    it "renders bad request status" do
      post :create, params: { favorite: invalid_attributes }
      expect(response).to have_http_status(:bad_request)
    end

    it "does not add an invalid favorite" do
      expect { post :create, params: { favorite: invalid_attributes } }.to change { Favorite.all.count }.by(0)
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

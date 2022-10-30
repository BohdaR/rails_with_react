# frozen_string_literal: true

require "rails_helper"

RSpec.describe ReservationsController, type: :controller do
  let(:reservations) { Reservation.all }
  let(:place) { create(:place) }
  let(:reservation) { create(:reservation) }

  let(:valid_attributes) do
    {
      place_id: place.id,
      start_at: "2022-10-30T18:07",
      end_at: "2022-10-31T22:07"
    }
  end

  let(:invalid_attributes) do
    {
      place_id: 18,
      start_at: nil,
      end_at: Time.now + 4.hours
    }
  end

  before(:each) do
    current_user = create(:user)
    sign_in(current_user)
  end

  describe "reservations#index" do
    before(:each) { get :index }

    it "renders a successful response" do
      expect(response). to have_http_status(:success)
    end

    it "renders all reservations" do
      expect(JSON.parse(response.body)).to eq(reservations.as_json)
    end
  end

  describe "reservations#show" do
    it "renders a successful response" do
      get :show, params: { id: reservation.id }
      expect(response).to have_http_status(:success)
    end
  end

  describe "reservations#create" do
    it "renders a successful response" do
      post :create, params: { reservation: valid_attributes }
      expect(response).to have_http_status(:success)
    end

    it "renders bad request status" do
      post :create, params: { reservation: invalid_attributes }
      expect(response).to have_http_status(:bad_request)
    end
  end

  describe "reservations#update" do
    it "renders bad request status" do
      post :update, params: { id: reservation.id, reservation: invalid_attributes }
      expect(response).to have_http_status(:bad_request)
    end
  end
  describe "reservations#destroy" do
    before(:each) do
      delete :destroy, params: { id: reservation.id }
    end
    it "renders a successful response" do
      expect(response).to have_http_status(:success)
    end
    it "returns deleted reservation" do
      expect(JSON.parse(response.body)).to eq(reservation.as_json)
    end
  end
end

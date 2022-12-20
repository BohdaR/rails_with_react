# frozen_string_literal: true

require "rails_helper"

RSpec.describe ReservationsController, type: :controller do
  let(:reservations) { Reservation.all }
  let(:place) { create(:place) }
  let(:reservation) { create(:reservation) }

  let(:allowed_action) { create(:allowed_action) }
  let(:auth_group) { create(:auth_group) }
  let(:subject) { create(:subject) }
  let(:scope) { create(:scope) }
  let(:permission) { create(:permission, subject:, scope:, auth_group:) }
  let(:role) { create(:role, auth_group:) }

  let(:user) { create(:user) }
  let(:employee) { create(:employee, user:) }

  before(:each) do
    permission.allowed_actions << allowed_action
    employee.roles << role
    role.permissions << permission
    sign_in(user)
  end

  let(:valid_attributes) do
    {
      employee_id: employee.id,
      place_id: place.id,
      start_at: Time.now + 4.hour,
      end_at: Time.now + 6.hour
    }
  end

  let(:invalid_attributes) do
    {
      employee_id: employee.id,
      place_id: 18,
      start_at: nil,
      end_at: Time.now + 4.hours
    }
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
    it "renders a successful response", skip: true do
      post :create, params: { reservation: valid_attributes }
      expect(response).to have_http_status(:success)
    end

    it "valid attributes adds a new reservation", skip: true do
      expect { post :create, params: { reservation: valid_attributes } }.to change { Reservation.all.count }.by(1)
    end

    it "renders bad request status" do
      post :create, params: { reservation: invalid_attributes }
      expect(response).to have_http_status(:bad_request)
    end

    it "does not add an invalid reservation" do
      expect { post :create, params: { reservation: invalid_attributes } }.to change { Reservation.all.count }.by(0)
    end
  end

  describe "reservations#update" do
    it "renders success status" do
      post :update, params: { id: reservation.id, reservation: valid_attributes }
      expect(response).to have_http_status(:success)
    end
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

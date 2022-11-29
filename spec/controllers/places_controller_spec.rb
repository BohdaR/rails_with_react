# frozen_string_literal: true

require "rails_helper"

RSpec.describe PlacesController, type: :controller do
  let(:allowed_action) { create(:allowed_action) }
  let(:subject) { create(:subject) }
  let(:scope) { create(:scope) }
  let(:permission) { create(:permission, allowed_action:, subject:, scope:) }
  let(:role) { create(:role) }
  let(:user) { create(:user) }
  let(:employee) { create(:employee, user:) }

  before(:all) do
    User.create(email: "foo@bar.com", password: "SomeUserPass")
    create(:company)
    Office.where(
      company: Company.first,
      street: "вул. Костя Левицького",
      house_number: "75a",
      town: "Львів",
      province: "Львівська обл.",
      country: "Україна"
    ).first_or_create
    Room.where(company: Company.first, floor: 1, office: Office.first, name: "Some test room").first_or_create
    Place.where(room: Room.first, number: 1).first_or_create
    Place.where(room: Room.first, number: 2).first_or_create
    Place.where(room: Room.first, number: 3).first_or_create
    Place.where(room: Room.first, number: 4).first_or_create
    Employee.create(user: User.first, company: Company.first, office: Office.first)
  end
  before(:each) do
    role.permissions << permission
    employee.roles << role
    sign_in(user)
  end
  after(:all) do
    Company.first.destroy
    User.first.destroy
  end
  let(:places) {
    Place.all
  }
  let(:place) {
    Place.first
  }
  let(:room_id) {
    Room.first
  }
  describe "index action" do
    it "returns http success" do
      get :index, params: { room_id: }
      expect(response).to have_http_status(:success)
    end
    it "render all places if there are no booked places" do
      get :index, params: { room_id: }
      expect(JSON.parse(response.body)).to eq(places.as_json)
    end
    describe "not render booked places" do
      before(:all) do
        Reservation.create(
          employee: Employee.first,
          place: Place.first,
          start_at: Time.now + 1.hour,
          end_at: Time.now + 1.day
        )
      end
      let(:booked_place) do
        Place.find(Reservation.first.place.id)
      end
      it "not render booked place if place booked period within period between look_from and look_to" do
        get :index, params: { room_id:, look_from: Time.now, look_to: Time.now + 2.day }
        expect(JSON.parse(response.body)).not_to include(booked_place.as_json)
      end
      it "not render booked place if look_from within place booked period" do
        get :index, params: { room_id:, look_from: Time.now + 2.hour, look_to: Time.now + 2.day }
        expect(JSON.parse(response.body)).not_to include(booked_place.as_json)
      end
      it "not render booked place if look_to within place booked period" do
        get :index, params: { room_id:, look_from: Time.now, look_to: Time.now + 5.hour }
        expect(JSON.parse(response.body)).not_to include(booked_place.as_json)
      end
      it "not render booked place if look_from and look_to within place booked period" do
        get :index, params: { room_id:, look_from: Time.now + 2.hour, look_to: Time.now + 5.hour }
        expect(JSON.parse(response.body)).not_to include(booked_place.as_json)
      end
      it "render booked place if look_from and look_to not within place booked period" do
        get :index, params: { room_id:, look_from: Time.now + 1.day + 2.hour, look_to: Time.now + 2.day }
        expect(JSON.parse(response.body)).to include(booked_place.as_json)
      end
    end
  end
  describe "show action" do
    before(:each) do
      get :show, params: { room_id: Room.first.id, id: place.id }
    end
    it "returns http success" do
      expect(response).to have_http_status(:success)
    end
    it "render correct place" do
      expect(JSON.parse(response.body)).to eq(place.as_json)
    end
  end
  describe "create action" do
    let(:correct_params) do
      {
        room: Room.first,
        number: 10
      }
    end
    let(:incorrect_params) do
      {
        room: -10,
      }
    end
    describe "create place with correct params" do
      before(:each) do
        post :create, params: { room_id:, place: correct_params }
      end
      it "returns http success" do
        expect(response).to have_http_status(:success)
      end
      it "render created place" do
        expect(JSON.parse(response.body)).to eq(Place.where(correct_params).first.as_json)
      end
    end
    describe "create place with incorrect params" do
      it "returns http success" do
        post :create, params: { room_id:, place: incorrect_params }
        expect(response).to have_http_status(:bad_request)
      end
    end
  end
  describe "update action" do
    let(:correct_params) do
      {
        number: 7
      }
    end
    let(:incorrect_params) do
      {
        room_id: -10
      }
    end
    describe "update place with correct params" do
      it "returns http success via patch request" do
        patch :update, params: { room_id:, id: place.id, place: correct_params }
        expect(response).to have_http_status(:success)
      end
      it "returns http success via post request" do
        post :update, params: { room_id:, id: place.id, place: correct_params }
        expect(response).to have_http_status(:success)
      end
      it "returns http success via put request" do
        put :update, params: { room_id:, id: place.id, place: correct_params }
        expect(response).to have_http_status(:success)
      end
      it "render updated place" do
        place_before_update = Place.find(place.id).as_json
        patch :update, params: { room_id:, id: place.id, place: correct_params }
        place_after_update = Place.find(place.id).as_json

        expect(JSON.parse(response.body)).not_to eq(place_before_update)
        expect(JSON.parse(response.body)).to eq(place_after_update)
      end
    end
    describe "update place with incorrect params" do
      it "returns http bad request via patch request" do
        patch :update, params: { room_id:, id: place.id, place: incorrect_params }
        expect(response).to have_http_status(:bad_request)
      end
      it "returns http bad request via post request" do
        post :update, params: { room_id:, id: place.id, place: incorrect_params }
        expect(response).to have_http_status(:bad_request)
      end
      it "returns http bad request via put request" do
        put :update, params: { room_id:, id: place.id, place: incorrect_params }
        expect(response).to have_http_status(:bad_request)
      end
    end
  end
  describe "destroy action" do
    before(:each) do
      delete :destroy, params: { room_id:, id: place.id }
    end
    it "returns http success" do
      expect(response).to have_http_status(:success)
    end
    it "return deleted place" do
      expect(JSON.parse(response.body)).to eq(place.as_json)
    end
  end
end

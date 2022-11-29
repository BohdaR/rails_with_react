# frozen_string_literal: true

require "rails_helper"

RSpec.describe RoomsController, type: :controller do
  let(:allowed_action) { create(:allowed_action) }
  let(:subject) { create(:subject) }
  let(:scope) { create(:scope) }
  let(:permission) { create(:permission, allowed_action:, subject:, scope:) }
  let(:role) { create(:role) }
  let(:user) { create(:user) }
  let(:employee) { create(:employee, user:) }

  before(:each) do
    role.permissions << permission
    employee.roles << role
    sign_in(user)
  end

  before(:all) do
    Office.where(
      company: create(:company),
      street: "вул. Костя Левицького",
      house_number: "75a",
      town: "Львів",
      province: "Львівська обл.",
      country: "Україна"
    ).first_or_create
    Room.where(company: Company.first, floor: 1, office: Office.first, name: "Some awesome room").first_or_create
    Room.where(company: Company.first, floor: 1, office: Office.first, name: "Some test room").first_or_create
  end
  let(:rooms) {
    Room.all
  }
  let(:room) {
    Room.first
  }
  describe "index action" do
    before(:each) do
      get :index
    end
    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "render all not empty rooms" do
      expect(JSON.parse(response.body)).to eq(rooms.not_empty_rooms({ look_from: Time.now, look_to: Time.now + 1.day }).as_json)
    end
  end
  describe "show action" do
    before(:each) do
      get :show, params: { id: room.id }
    end
    it "returns http success" do
      expect(response).to have_http_status(:success)
    end
    it "render correct room" do
      expect(JSON.parse(response.body)).to eq(room.as_json)
    end
  end
  describe "create action" do
    let(:correct_params) do
      {
        company_id: Company.first.id,
        office_id: Office.first.id,
        floor: 1,
        name: "Some room"
      }
    end
    let(:incorrect_params) do
      {
        company_id: 0,
        office_id: -34958345,
        floor: 1,
        name: "Some room"
      }
    end
    describe "create room with correct params" do
      before(:each) do
        post :create, params: { room: correct_params }
      end
      it "returns http success" do
        expect(response).to have_http_status(:success)
      end
      it "render created room" do
        expect(JSON.parse(response.body)).to eq(Room.where(correct_params).first.as_json)
      end
    end
    describe "create room with incorrect params" do
      it "returns http success" do
        post :create, params: { room: incorrect_params }
        expect(response).to have_http_status(:bad_request)
      end
    end
  end
  describe "update action" do
    let(:correct_params) do
      {
        company_id: Company.first.id,
        office_id: Office.first.id,
        floor: 2,
        name: "Some room 2"
      }
    end
    let(:incorrect_params) do
      {
        company_id: 0,
        office_id: -34958345,
        floor: -10,
        name: 234234
      }
    end
    describe "update room with correct params" do
      it "returns http success via patch request" do
        patch :update, params: { id: room.id, room: correct_params }
        expect(response).to have_http_status(:success)
      end
      it "returns http success via post request" do
        post :update, params: { id: room.id, room: correct_params }
        expect(response).to have_http_status(:success)
      end
      it "returns http success via put request" do
        put :update, params: { id: room.id, room: correct_params }
        expect(response).to have_http_status(:success)
      end
      it "render updated room" do
        room_before_update = Room.find(room.id).as_json
        patch :update, params: { id: room.id, room: correct_params }
        room_after_update = Room.find(room.id).as_json

        expect(JSON.parse(response.body)).not_to eq(room_before_update)
        expect(JSON.parse(response.body)).to eq(room_after_update)
      end
    end
    describe "update room with incorrect params" do
      it "returns http bad request via patch request" do
        patch :update, params: { id: room.id, room: incorrect_params }
        expect(response).to have_http_status(:bad_request)
      end
      it "returns http bad request via post request" do
        post :update, params: { id: room.id, room: incorrect_params }
        expect(response).to have_http_status(:bad_request)
      end
      it "returns http bad request via put request" do
        put :update, params: { id: room.id, room: incorrect_params }
        expect(response).to have_http_status(:bad_request)
      end
    end
  end
  describe "destroy action" do
    before(:each) do
      delete :destroy, params: { id: room.id }
    end
    it "returns http success" do
      expect(response).to have_http_status(:success)
    end
    it "return deleted room" do
      expect(JSON.parse(response.body)).to eq(room.as_json)
    end
  end
end

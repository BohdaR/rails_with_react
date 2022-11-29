# frozen_string_literal: true

require "rails_helper"

RSpec.describe OfficesController, type: :controller do
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
    create(:company)
    Office.where(
      company: Company.first,
      street: "вул. Костя Левицького",
      house_number: "10",
      town: "Івано-Франківськ",
      province: "Івано-Франківська обл.",
      country: "Україна"
    ).first_or_create
    Office.where(
      company: Company.first,
      street: "вул. Костя Левицького",
      house_number: "75a",
      town: "Львів",
      province: "Львівська обл.",
      country: "Україна"
    ).first_or_create
  end
  let(:offices) { Office.all }
  let(:office) { Office.first }
  describe "index action" do
    before(:each) do
      get :index
    end
    it "returns http success" do
      expect(response).to have_http_status(:success)
    end

    it "render all offices" do
      expect(JSON.parse(response.body)).to eq(offices.as_json)
    end
  end
  describe "show action" do
    it "returns http success" do
      get :show, params: { id: office.id }
      expect(response).to have_http_status(:success)
    end
  end
  describe "create action" do
    let(:correct_params) do
      {
        company_id: Company.first,
        street: "вул. Тараса Шевченка",
        house_number: "175a",
        town: "Львів",
        province: "Львівська обл.",
        country: "Україна"
      }
    end
    let(:incorrect_params) do
      {
        street: "вул. Костя Левицького",
        house_number: "75a",
        town: "Львів",
        province: "Львівська обл.",
        country: "Україна"
      }
    end
    describe "create office with correct params" do
      before(:each) do
        post :create, params: { office: correct_params }
      end
      it "returns http success" do
        expect(response).to have_http_status(:success)
      end
      it "render created office" do
        expect(JSON.parse(response.body)).to eq(Office.where(correct_params).first.as_json)
      end
    end
    describe "create office with incorrect params" do
      it "returns http success" do
        post :create, params: { office: incorrect_params }
        expect(response).to have_http_status(:bad_request)
      end
    end
  end
  describe "update action" do
    let(:correct_params) do
      {
        company_id: Company.first.id,
        street: "вул. Костя Левицького",
        house_number: "75a",
        town: "Львів",
        province: "Львівська обл.",
        country: "Україна"
      }
    end
    let(:incorrect_params) do
      {
        company_id: -10,
        street: 22,
        house_number: "75a",
        town: "Львів",
        province: 3434,
        country: "Україна"
      }
    end
    describe "update office with correct params" do
      it "returns http success via patch request" do
        patch :update, params: { id: office.id, office: correct_params }
        expect(response).to have_http_status(:success)
      end
      it "returns http success via post request" do
        post :update, params: { id: office.id, office: correct_params }
        expect(response).to have_http_status(:success)
      end
      it "returns http success via put request" do
        put :update, params: { id: office.id, office: correct_params }
        expect(response).to have_http_status(:success)
      end
      it "render updated office" do
        office_before_update = Office.find(office.id).as_json
        patch :update, params: { id: office.id, office: correct_params }
        office_after_update = Office.find(office.id).as_json

        expect(JSON.parse(response.body)).not_to eq(office_before_update)
        expect(JSON.parse(response.body)).to eq(office_after_update)
      end
    end
    describe "update office with incorrect params" do
      it "returns http success via patch request" do
        patch :update, params: { id: office.id, office: incorrect_params }
        expect(response).to have_http_status(:bad_request)
      end
      it "returns http success via post request" do
        post :update, params: { id: office.id, office: incorrect_params }
        expect(response).to have_http_status(:bad_request)
      end
      it "returns http success via put request" do
        patch :update, params: { id: office.id, office: incorrect_params }
        expect(response).to have_http_status(:bad_request)
      end
    end
  end
  describe "destroy action" do
    before(:each) do
      delete :destroy, params: { id: office.id }
    end
    it "returns http success" do
      expect(response).to have_http_status(:success)
    end
    it "return deleted office" do
      expect(JSON.parse(response.body)).to eq(office.as_json)
    end
  end
end

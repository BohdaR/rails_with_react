# frozen_string_literal: true

require "rails_helper"

RSpec.describe OfficesController, type: :controller do
  let(:offices) { Office.all }
  let(:office) { Office.where(
    company: Company.where(name: "CyberCraft", domain_name: "cybercraftinc.com").first_or_create,
    street: "вул. Костя Левицького",
    house_number: "75a",
    town: "Львів",
    province: "Львівська обл.",
    country: "Україна"
  ).first_or_create }
  before(:each) do
    user = User.create(email: "foo@bar.com", password: "SomeUserPass")
    sign_in(user)
  end
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
        company_id: Company.where(name: "CyberCraft", domain_name: "cybercraftinc.com").first_or_create.id,
        street: "вул. Костя Левицького",
        house_number: "75a",
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
        expect(JSON.parse(response.body)).to eq(Office.where(correct_params).first_or_create.as_json)
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
        company_id: Company.where(name: "FooBar", domain_name: "foo.bar").first_or_create.id,
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

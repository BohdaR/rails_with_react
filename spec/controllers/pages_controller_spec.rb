# frozen_string_literal: true

require "rails_helper"

RSpec.describe PagesController, type: :controller do
  let(:user) { create(:user) }
  let(:employee) { create(:employee, user:) }
  let(:office) { create(:office) }

  before(:each) do
    sign_in(user)
  end

  describe "pages#booking" do
    it "renders current office if user is employee" do
      current_office = Office.find(employee.office_id)
      get "booking"
      expect(response).to have_http_status(:success)
    end

    it "renders error if user isn't employee" do
      get "booking"
      expect(response).to have_http_status(403)
    end
  end
end

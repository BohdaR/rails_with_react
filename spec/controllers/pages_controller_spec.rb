# frozen_string_literal: true

require "rails_helper"

RSpec.describe PagesController, type: :controller do
  let(:allowed_action) { create(:allowed_action) }
  let(:subject) { create(:subject) }
  let(:scope) { create(:scope) }
  let(:permission) { create(:permission, allowed_action:, subject:, scope:) }
  let(:role) { create(:role) }
  let(:user) { create(:user) }
  let(:employee) { create(:employee, user:) }
  let(:office) { create(:office) }

  describe "pages#booking" do
    it "renders current office if user is employee" do
      role.permissions << permission
      employee.roles << role
      sign_in(user)

      get "booking"
      expect(response).to have_http_status(:success)
    end

    it "renders error if user isn't employee" do
      sign_in(user)

      get "booking"
      expect(response).to have_http_status(403)
    end
  end

  describe "pages#index" do
    it "renders forbidden if user isn't an employee" do
      sign_in(user)

      get :index
      expect(response).to have_http_status(403)
    end
  end
end

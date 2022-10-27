# frozen_string_literal: true

# require "rails_helper"

RSpec.describe PagesController, type: :controller do
  before(:each) do
    user = User.create(email: "example@gmail.com", password: "password123")
    sign_in(user)
  end

  describe "pages#booking" do
    before(:each) { get "booking" }

    it "returns forbidden when user isn't employee" do
      expect(response).to have_http_status(:forbidden)
    end
  end
end

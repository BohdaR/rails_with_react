# frozen_string_literal: true

require "rails_helper"

RSpec.describe PagesController, type: :controller do
  before(:each) do
    current_user = create(:user)
    sign_in(current_user)
  end

  it "returns forbidden when user isn't employee" do
    get "booking"
    expect(response).to have_http_status(:forbidden)
  end
end

require "test_helper"

class BookingControllerTest < ActionDispatch::IntegrationTest
  test "should get greeting" do
    get booking_greeting_url
    assert_response :success
  end
end

# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Authentication", type: :system do
  describe "signing in" do
    it "allows sign in" do
      visit new_session_path
      fill_in "user[email]", with: "user@example.com"
      fill_in "user[password]", with: "user1234"
      click_button "Log In"

      expect(page).to have_text("Welcome!")
    end
  end
end
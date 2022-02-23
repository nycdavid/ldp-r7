# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Weights CRUD", type: :system do
  let!(:user) { FactoryBot.create(:user) }

  it "creates weights" do
    visit new_weight_path

    fill_in "Measurement", with: 200
    select user.name, from: "weight[user_id]"
    fill_in "Notes", with: "I feel this way"
    click_button "Create Weight"

    user.reload

    expect(page).to have_text("Weight was successfully created")
    expect(user.weights.count).to eq(1)
    created_weight = user.weights.last
    expect(created_weight.notes).to eq("I feel this way")
  end
end

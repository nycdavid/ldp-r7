# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Weights CRUD", type: :system do
  let!(:user) { FactoryBot.create(:user) }

  it "creates weights" do
    visit new_weight_path

    fill_in "Measurement", with: 200
    select user.name, from: "weight[user_id]"
    click_button "Create Weight"

    expect(page).to have_text("Weight was successfully created")
    expect(user.reload.weights.count).to eq(1)
  end
end
require "rails_helper"

RSpec.describe "DataPoints CRUD", type: :system do
  describe "DataPoints new/create" do
    it "creates datapoints" do
      visit new_data_point_path
      fill_in "Units", with: 200
    end
  end
end

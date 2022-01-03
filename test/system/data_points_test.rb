require "application_system_test_case"

class DataPointsTest < ApplicationSystemTestCase
  setup do
    @data_point = data_points(:one)
  end

  test "visiting the index" do
    visit data_points_url
    assert_selector "h1", text: "Data points"
  end

  test "should create data point" do
    visit data_points_url
    click_on "New data point"

    click_on "Create Data point"

    assert_text "Data point was successfully created"
    click_on "Back"
  end

  test "should update Data point" do
    visit data_point_url(@data_point)
    click_on "Edit this data point", match: :first

    click_on "Update Data point"

    assert_text "Data point was successfully updated"
    click_on "Back"
  end

  test "should destroy Data point" do
    visit data_point_url(@data_point)
    click_on "Destroy this data point", match: :first

    assert_text "Data point was successfully destroyed"
  end
end

require 'rails_helper'

RSpec.describe "weights/new", type: :view do
  before(:each) do
    assign(:weight, Weight.new(
      measurement: 1.5
    ))
  end

  it "renders new weight form" do
    render

    assert_select "form[action=?][method=?]", weights_path, "post" do

      assert_select "input[name=?]", "weight[measurement]"
    end
  end
end

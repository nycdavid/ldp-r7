require 'rails_helper'

RSpec.describe "weights/edit", type: :view do
  let_it_be(:user) { FactoryBot.create(:user) }

  before(:each) do
    @weight = assign(:weight, Weight.create!(
      measurement: 1.5,
      user: user,
    ))
  end

  it "renders the edit weight form" do
    render

    assert_select "form[action=?][method=?]", weight_path(@weight), "post" do

      assert_select "input[name=?]", "weight[measurement]"
    end
  end
end

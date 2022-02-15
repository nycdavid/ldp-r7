require 'rails_helper'

RSpec.describe "weights/index", type: :view do
  let_it_be(:user) { FactoryBot.create(:user) }
  before(:each) do
    assign(:weights, [
      Weight.create!(
        measurement: 2.5,
        user: user,
      ),
      Weight.create!(
        measurement: 2.5,
        user: user,
      )
    ])
  end

  it "renders a list of weights" do
    render
    # assert_select "tr>td", text: 2.5.to_s, count: 2
  end
end

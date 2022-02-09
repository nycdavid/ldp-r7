require 'rails_helper'

RSpec.describe "weights/show", type: :view do
  before(:each) do
    @weight = assign(:weight, Weight.create!(
      measurement: 2.5
    ))
  end

  it "renders attributes in <p>" do
    render
    expect(rendered).to match(/2.5/)
  end
end

require 'rails_helper'

RSpec.describe "weights/index", type: :view do
  let_it_be(:user) { FactoryBot.create(:user) }
  let_it_be(:weight1) { FactoryBot.create(:weight, user: user, created_at: 10.days.ago) }
  let_it_be(:weight2) { FactoryBot.create(:weight, user: user) }

  before do
    assign(:weights, Weight.where(id: [weight1.id, weight2.id]))
  end

  it "renders a list of weights" do
    render

    expect(rendered).to have_selector("table.table", count: 1)

    # Table header
    expect(rendered).to have_selector("table.table thead tr > th", count: 3)
    expect(rendered).to have_selector("table.table thead tr > th:nth-child(1)", text: "Date")
    expect(rendered).to have_selector("table.table thead tr > th:nth-child(2)", text: "Measurement")
    expect(rendered).to have_selector("table.table thead tr > th:nth-child(3)", text: "Person")

    # Table body
    expect(rendered).to have_selector("table.table tbody > tr", count: 2)
    expect(rendered).to have_selector(
      "table.table tbody > tr:nth-child(1) > td:nth-child(1)",
      text: weight1.created_at.strftime("%m/%d/%Y"),
    )
    expect(rendered).to have_selector(
      "table.table tbody > tr:nth-child(1) > td:nth-child(2)",
      text: weight1.measurement.truncate(1),
    )
    expect(rendered).to have_selector(
      "table.table tbody > tr:nth-child(1) > td:nth-child(3)",
      text: weight1.user.name,
    )
  end

  it "shows the net change between 2 adjacent measurements" do
    render

    net_change = (weight1.measurement - weight2.measurement).truncate(1)
    class_name = net_change > 0 ? "gain" : "loss"
    prefix = class_name == "gain" ? "+" : "-"

    expect(rendered).not_to have_selector(
      "table.table tbody > tr:nth-child(1) > td span.#{class_name}"
    )
    expect(rendered).to have_selector(
      "table.table tbody > tr:nth-child(2) > td span.#{class_name}",
      text: "(#{prefix}#{net_change.abs})",
    )
  end
end

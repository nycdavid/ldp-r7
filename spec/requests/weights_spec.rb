 require 'rails_helper'

# This spec was generated by rspec-rails when you ran the scaffold generator.
# It demonstrates how one might use RSpec to test the controller code that
# was generated by Rails when you ran the scaffold generator.
#
# It assumes that the implementation code is generated by the rails scaffold
# generator. If you are using any extension libraries to generate different
# controller code, this generated spec may or may not pass.
#
# It only uses APIs available in rails and/or rspec-rails. There are a number
# of tools you can use to make these specs even more expressive, but we're
# sticking to rails and rspec-rails APIs to keep things simple and stable.

RSpec.describe "/weights", type: :request do
  let_it_be(:david) { FactoryBot.create(:user, name: "David") }
  let_it_be(:jane) { FactoryBot.create(:user, name: "Jane") }

  before do
    FactoryBot.create_list(:weight, 3, user: david)
    FactoryBot.create(
      :weight,
      user: david,
      created_at: 10.days.ago,
      updated_at: 10.days.ago,
    )

    FactoryBot.create_list(:weight, 3, user: jane)
    FactoryBot.create(
      :weight,
      user: jane,
      created_at: 10.days.ago,
      updated_at: 10.days.ago,
    )
  end

  describe "GET /index" do
    it "returns a users weights" do
      get(weights_path, params: { user_name: "David" })

      unique_user_ids = controller.instance_variable_get(:@weights).
        map { |weight| weight.user_id }.uniq

      expect(unique_user_ids).to eq([david.id])
    end
  end

  describe "GET /index.json" do
    let(:headers) do
      { ACCEPT: "application/json", "Content-Type": "application/json" }
    end

    it "returns a users weights" do
      get(weights_path, params: { user_name: "David" }, headers: headers)

      resp = JSON.parse(response.body)
      weights_within_range = david.weights.where("created_at >= ?", 7.days.ago)

      expect(response).to have_http_status(:ok)
      expect(resp["weights"].count).to eq(weights_within_range.count)
      expect(resp["weights"][0].keys).to match_array(%w[date measurement user])
    end

    it "supports a range parameter" do
      get(weights_path, params: { user_name: "David", range: 14 }, headers: headers)

      resp = JSON.parse(response.body)
      weights_within_range = david.weights.where("created_at >= ?", 14.days.ago)

      expect(resp["weights"].count).to eq(weights_within_range.count)
    end

    it "returns the weights in order" do
      get(weights_path, params: { user_name: "David", range: 14 }, headers: headers)

      resp = JSON.parse(response.body)

      returned_dates = resp["weights"].map do |weight|
        Date.strptime(weight["date"], "%m/%d/%Y")
      end

      1.upto(returned_dates.length - 1) do |n|
        expect(returned_dates[n]).to be >= returned_dates[n - 1]
      end
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Weight" do
        post(weights_path, params: { weight: { measurement: 200, user_id: david.id } })

        expect(david.weights.last.measurement).to eq(200)
      end
    end
  end
end

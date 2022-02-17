require 'rails_helper'

RSpec.describe User, type: :model do
  let_it_be(:user) { FactoryBot.create(:user) }
  let_it_be(:weights) do
    3.times do |n|
      FactoryBot.create(
        :weight,
        user: user,
        created_at: n.days.ago,
        updated_at: n.days.ago,
      )
    end

    user.weights
  end

  describe "#weights_in_order" do
    it "returns the weights of a user in the order that they were created" do
      ordered_weights = user.weights_in_order

      ordered_created_ats = ordered_weights.pluck(:created_at)

      expect(ordered_weights.count).to eq(3)
      expect(ordered_created_ats[0]).to be < ordered_created_ats[1]
      expect(ordered_created_ats[1]).to be < ordered_created_ats[2]
    end
  end
end

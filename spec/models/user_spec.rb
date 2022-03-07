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
end

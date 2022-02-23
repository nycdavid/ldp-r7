FactoryBot.define do
  factory :weight do
    measurement { rand(0.0..200.0) }
    notes { "Feelings go here" }
  end
end

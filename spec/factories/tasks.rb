FactoryBot.define do
  factory :task do
    name { Faker::Marketing.buzzwords.capitalize }
    description { "Figure out how we're going to #{Faker::Company.bs}" }
    start_time { 0.hours.from_now }
    end_time { 2.hours.from_now }
    completed_at { Time.zone.now }

    user
  end
end

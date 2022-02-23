# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { %w[David Jane Hajin].sample }
  end
end

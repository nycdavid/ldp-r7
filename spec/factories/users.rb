# frozen_string_literal: true

NAMES = %w[David Jane Hajin]

FactoryBot.define do
  factory :user do
    name { NAMES.sample }
  end
end

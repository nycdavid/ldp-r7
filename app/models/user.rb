class User < ApplicationRecord
  has_many :weights
  has_many :tasks

  def last_n_weights(n)
    weights.order(created_at: :desc).limit(n)
  end
end

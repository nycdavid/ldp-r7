class User < ApplicationRecord
  has_many :weights

  def weights_in_order
    weights.order(created_at: :asc)
  end
end

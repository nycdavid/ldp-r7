class Task < ApplicationRecord
  scope :incomplete, -> { where(completed_at: nil) }
end

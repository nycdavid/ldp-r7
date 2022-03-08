class Task < ApplicationRecord
  scope :incomplete, -> { where(completed_at: nil) }
  scope :due_today, -> { where("start_time >= ?", Date.today.beginning_of_day) }
  scope :overdue, -> { where("end_time < ?", DateTime.now) }
end

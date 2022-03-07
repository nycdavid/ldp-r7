class ChangeTaskCompletedToDateTime < ActiveRecord::Migration[7.0]
  def change
    add_column(:tasks, :completed_at, :datetime)

    Task.all.find_each do |task|
      task.update!(completed_at: task.updated_at)
    end

    remove_column(:tasks, :completed, :boolean)
  end
end

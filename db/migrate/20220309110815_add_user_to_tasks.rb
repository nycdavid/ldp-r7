class AddUserToTasks < ActiveRecord::Migration[7.0]
  def change
    add_reference :tasks, :user, foreign_key: true
    david = User.find_by(name: "David")
    Task.all.update_all(user_id: david.id)
  end
end

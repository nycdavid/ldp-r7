class AddTimezoneToUser < ActiveRecord::Migration[7.0]
  def change
    add_column(:users, :timezone, :string)
    User.all.update_all(timezone: "Eastern Time (US & Canada)")
  end
end

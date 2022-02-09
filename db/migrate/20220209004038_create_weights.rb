class CreateWeights < ActiveRecord::Migration[7.0]
  def change
    create_table :weights do |t|
      t.float :measurement
      t.belongs_to :user

      t.timestamps
    end
  end
end

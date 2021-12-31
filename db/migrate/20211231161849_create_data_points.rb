class CreateDataPoints < ActiveRecord::Migration[7.0]
  def change
    create_table :data_points do |t|
      t.string :event_type
      t.json :data

      t.timestamps
    end
  end
end

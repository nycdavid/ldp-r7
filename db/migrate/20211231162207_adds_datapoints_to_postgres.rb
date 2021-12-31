class AddsDatapointsToPostgres < ActiveRecord::Migration[7.0]
  disable_ddl_transaction!

  def change
    file = File.read(Rails.root.join("db/data.v2.json"))
    json = JSON.parse(file)

    json.each do |type, data_points|
      rows = data_points.map do |data_point|
        {
          event_type: type,
          created_at: Time.at(data_point["timestamp"]),
          updated_at: Time.at(data_point["timestamp"]),
          data: data_point,
        }
      end

      DataPoint.insert_all!(rows)
    end
  end
end

class CoerceNumberStringsIntoIntegers < ActiveRecord::Migration[7.0]
  disable_ddl_transaction!

  def change
    music_data_points = DataPoint.where(event_type: "music")
    music_data_points.find_each do |data_point|
      json = data_point.data
      json["value"] = json["value"].to_i

      data_point.update!(data: json)
    end
  end
end

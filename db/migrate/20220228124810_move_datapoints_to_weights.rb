class MoveDatapointsToWeights < ActiveRecord::Migration[7.0]
  def change
    david = User.find_by(name: "David")

    weight_datapoints = DataPoint.where(event_type: "weight")

    weight_datapoints.find_each do |datapoint|
      data = datapoint.data
      datetime = Time.at(data["timestamp"]).to_datetime

      Weight.create!(
        measurement: data["value"].to_f,
        user: david,
        notes: data["notes"],
        created_at: datetime,
        updated_at: datetime,
      )
    end
  end
end

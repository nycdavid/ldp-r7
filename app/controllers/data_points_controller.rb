class DataPointsController < ApplicationController
  def index
    data_points = DataPoint.all.order(created_at: :asc).group_by(&:event_type)
    @tables = data_points.map do |event_type, data_points|
      ViewTable.new(event_type, data_points)
    end
  end
end

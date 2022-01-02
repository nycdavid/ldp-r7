class DataPointsController < ApplicationController
  def index
    @data_points = DataPoint.all.order(created_at: :asc).group_by(&:event_type)
  end
end

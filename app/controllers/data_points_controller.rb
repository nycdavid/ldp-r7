class DataPointsController < ApplicationController
  def index
    data_points = DataPoint.all.order(created_at: :asc).group_by(&:event_type)
    @tables = data_points.map do |event_type, data_points|
      ViewTable.new(event_type, data_points)
    end
  end

  def new
    @data_point = DataPoint.new
  end

  def create
    data_point = DataPoint.generate(
      data_point_params[:event_type],
      data_point_params[:unit_value],
      data_point_params[:notes],
    )

    @data_point = DataPoint.new(data_point)
    if @data_point.save
      flash[:notice] = "DataPoint was successfully created"
      redirect_to new_data_point_path
    else
      flash[:notice] = "Error saving datapoint"
      render :new
    end
  end

  private

  def data_point_params
    params.require(:data_point).permit(:event_type, :unit_value, :notes)
  end
end

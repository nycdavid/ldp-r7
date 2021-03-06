class WeightsController < ApplicationController
  before_action :set_weight, only: %i[ show edit update destroy ]

  # GET /weights or /weights.json
  def index
    @user = User.find_by(name: params[:user_name].capitalize)
    @weights = @user.weights.where("created_at >= ?", range_param.days.ago).
      order(created_at: :asc)

    @data = {
      weights: @weights.map { |weight| Serializer.weight(weight) },
      user: {
        id: @user.id,
        name: @user.name,
      },
      routes: {
        new: new_weight_url,
        index: weights_url,
      },
    }.to_json

    respond_to do |format|
      format.html do
        @weight_chart_data = @data
      end

      format.json do
        render(json: @data)
      end
    end
  end

  # GET /weights/1 or /weights/1.json
  def show
  end

  # GET /weights/new
  def new
    @weight = Weight.new
  end

  # GET /weights/1/edit
  def edit
  end

  # POST /weights or /weights.json
  def create
    @weight = Weight.new(weight_params)
    user = User.find(weight_params[:user_id])

    respond_to do |format|
      if @weight.save
        format.html { redirect_to weights_url(user_name: user.name), notice: "Weight was successfully created." }
        format.json { render :show, status: :created, location: @weight }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @weight.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /weights/1 or /weights/1.json
  def update
    respond_to do |format|
      if @weight.update(weight_params)
        format.html { redirect_to weight_url(@weight), notice: "Weight was successfully updated." }
        format.json { render :show, status: :ok, location: @weight }
      else
        format.html { render :edit, status: :unprocessable_entity }
        format.json { render json: @weight.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /weights/1 or /weights/1.json
  def destroy
    @weight.destroy

    respond_to do |format|
      format.html { redirect_to weights_url, notice: "Weight was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_weight
    @weight = Weight.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def weight_params
    params.require(:weight).permit(:measurement, :user_id, :notes)
  end

  def range_param
    params.permit(:range).with_defaults(range: 7).require(:range).to_i
  end
end

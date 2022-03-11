class TasksController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_task, only: %i[ show edit update destroy ]

  # GET /tasks or /tasks.json
  def index
    @data = {
      tasks: Task.incomplete.due_today.map { |task| Serializer.task(task) },
      overdue_tasks: Task.incomplete.overdue.map { |task| Serializer.task(task) },
      todays_date: Date.today.strftime("%a %b%e"),
    }
  end

  # GET /tasks/1 or /tasks/1.json
  def show
  end

  # GET /tasks/new
  def new
    @task = Task.new
  end

  # GET /tasks/1/edit
  def edit
  end

  # POST /tasks or /tasks.json
  def create
    create_params = params.require(:task).
      permit(:name, :description, :start_time, :end_time, :user_id)
    @task = Task.new(create_params)

    respond_to do |format|
      if @task.save
        flash[:success] = "Task was successfully created."
        format.html { redirect_to task_url(@task) }
        format.json { render :show, status: :created, location: @task }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @task.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /tasks/1 or /tasks/1.json
  def update
    if @task.update(task_params)
      render json: Serializer.task(@task), status: :ok
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1 or /tasks/1.json
  def destroy
    @task.destroy

    respond_to do |format|
      format.html { redirect_to tasks_url, notice: "Task was successfully destroyed." }
      format.json { head :no_content }
    end
  end

  private

  def set_task
    @task = Task.find(params[:id])
  end

  def task_params
    params_hash = params[:data].require(:task).
      permit(:name, :description, :completed, :start_time, :end_time).
      to_h

    if params_hash.has_key?(:completed)
      value = params_hash.delete(:completed)
      params_hash[:completed_at] = value ? Time.zone.now : nil
    end

    params_hash
  end
end

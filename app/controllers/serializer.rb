module Serializer
  def self.task(task)
    time_fmt = "%b %e %l:%S%P"
    {
      id: task.id,
      name: task.name,
      description: task.description,
      start_time: task.start_time.in_time_zone(task.user.timezone),
      end_time: task.end_time.in_time_zone(task.user.timezone),
      completed_at: task.completed_at,
      routes: {
        show: urls.task_path(task),
        update: urls.task_path(task),
        delete: urls.task_path(task),
        edit: urls.edit_task_path(task),
      },
    }
  end

  def self.urls
    Rails.application.routes.url_helpers
  end
end

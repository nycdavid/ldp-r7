 # frozen_string_literal: true

 require 'rails_helper'

RSpec.describe "/tasks", type: :request do
  let_it_be(:task) { FactoryBot.create(:task) }
  let_it_be(:headers) do
    { ACCEPT: "application/json", CONTENT_TYPE: "application/json" }
  end

  describe "editing tasks" do
    it "updates the task" do
      params = { task: { complete: true } }

      put(task_path(task), params: params.to_json, headers: headers)

      expect(response).to have_http_status(:ok)
      expect(task.reload.completed_at).not_to eq(nil)
      expect(JSON.parse(response.body)).to eq(JSON.parse(Serializer.task(task).to_json))
    end
  end
end

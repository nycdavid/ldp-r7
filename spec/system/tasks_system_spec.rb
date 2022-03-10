# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Tasks", type: :system do
  describe "completing tasks" do
    it "completes tasks" do
      FactoryBot.create(:task)
      task = FactoryBot.create(:task)
      visit tasks_path
      task_li = page.find("#task-#{task.id}")

      task_li.find("input[type='checkbox']").check

      expect(task_li).to have_css(".completed")
      expect(task.reload.completed_at).not_to eq(nil)
    end
  end
end
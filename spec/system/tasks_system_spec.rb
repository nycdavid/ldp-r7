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

  describe "creating tasks" do
    it "creates tasks" do
      FactoryBot.create(:user)
      visit new_task_path
      fill_in "Name", with: "Write an Example"
      fill_in "Description", with: "Figure out how to write an example"
      fill_in "Start time", with: 0.hours.from_now
      fill_in "End time", with: 1.hour.from_now
      click_button "Create Task"

      expect(page).to have_text("Task was successfully created")
    end
  end
end
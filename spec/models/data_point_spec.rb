# frozen_string_literal: true

require "rails_helper"

RSpec.describe DataPoint do
  describe ".generate" do
    it "creates the corrects hash" do
      current_time = Time.now
      a_day_ago = 1.day.ago
      allow(current_time).to receive(:to_i).and_return(100)
      allow(Time).to receive(:now).and_return(current_time)
      allow(Time).to receive(:at).with(100).and_return(a_day_ago)

      data = described_class.generate("weight", 175, "Cheat meal + 1")

      expect(data).to eq({
        event_type: "weight",
        data: {
          notes: "Cheat meal + 1",
          timestamp: 100,
          timestamp_unit: "seconds",
          value: 175,
          value_unit: "lbs",
        },
        created_at: a_day_ago,
        updated_at: a_day_ago,
      })
    end
  end
end

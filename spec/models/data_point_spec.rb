# frozen_string_literal: true

require "rails_helper"

RSpec.describe DataPoint do
  describe ".generate" do
    let(:a_day_ago) { 1.day.ago }

    before(:each) do
      current_time = Time.now
      allow(current_time).to receive(:to_i).and_return(100)
      allow(Time).to receive(:now).and_return(current_time)
      allow(Time).to receive(:at).with(100).and_return(a_day_ago)
    end

    it "creates the corrects hash" do
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

    it "downcases event type" do
      data = described_class.generate("Weight", 175, "Cheat meal + 1")

      expect(data).to include(event_type: "weight")
    end
  end
end

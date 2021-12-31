class DataPoint < ApplicationRecord
  UNIT_MAPPING = {
    weight: "lbs",
    music: "minutes",
    jumprope: "jumps",
    leetcode: "leetcode_id",
  }.with_indifferent_access

  def self.generate(event_type, value, notes)
    timestamp = Time.now.to_i

    {
      event_type: event_type,
      data: {
        timestamp: timestamp,
        timestamp_unit: "seconds",
        value: value,
        value_unit: UNIT_MAPPING[event_type],
      },
      created_at: Time.at(timestamp),
      updated_at: Time.at(timestamp),
    }
  end
end

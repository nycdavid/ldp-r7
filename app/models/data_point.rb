class DataPoint < ApplicationRecord
  UNIT_MAPPING = {
    weight: "lbs",
    music: "minutes",
    jumprope: "jumps",
    leetcode: "leetcode_id",
  }.with_indifferent_access

  EVENT_TYPES = UNIT_MAPPING.keys

  def self.generate(event_type, unit_value, notes)
    downcased_event_type = event_type.downcase
    timestamp = Time.now.to_i

    {
      event_type: downcased_event_type,
      data: {
        notes: notes,
        timestamp: timestamp,
        timestamp_unit: "seconds",
        value: unit_value,
        value_unit: UNIT_MAPPING[downcased_event_type],
      },
      created_at: Time.at(timestamp),
      updated_at: Time.at(timestamp),
    }
  end
end

#! /usr/bin/env ruby

require "json"
require "pry"
require "fileutils"

def write_and_replace(data, datapoint)
  data[datapoint[:type]] << datapoint

  File.open("new_data.json", "w") do |f|
    f.write(data.to_json)
  end

  File.delete("data.v2.json")
  FileUtils.mv("new_data.json", "data.v2.json")
end

data = JSON.parse(File.read("data.v2.json"))

type = ARGV[0]

datapoint = {}

if type.downcase == "music"
  minutes = ARGV[1].to_i

  raise "minutes arg required" if minutes == 0

  notes = ARGV[2]

  datapoint = {
    timestamp: Time.now.to_i,
    timestamp_unit: "seconds",
    type: "music",
    value: minutes,
    value_unit: "minutes",
    notes: notes,
  }
elsif type.downcase == "leetcode"
  leetcode_id = ARGV[1].to_i
  notes = ARGV[2]

  datapoint = {
    timestamp: Time.now.to_i,
    timestamp_unit: "seconds",
    type: "leetcode",
    value: leetcode_id,
    value_unit: "leetcode_id",
    notes: notes,
  }
elsif type.downcase == "jumprope"
  jumps = ARGV[1].to_i

  datapoint = {
    timestamp: Time.now.to_i,
    timestamp_unit: "seconds",
    type: "jumprope",
    value: jumps,
    value_unit: "jumps",
  }
elsif type.downcase == "weight"
  weight = ARGV[1].to_i
  notes = ARGV[2]

  datapoint = {
    timestamp: Time.now.to_i,
    timestamp_unit: "seconds",
    type: "weight",
    value: weight,
    value_unit: "lbs",
    notes: notes,
  }
end

write_and_replace(data, datapoint) unless datapoint.empty?

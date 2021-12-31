event_type = ARGV[0]
value = ARGV[1]
notes = ARGV[2]

data = DataPoint.generate(event_type, value, notes)
DataPoint.create!(data)

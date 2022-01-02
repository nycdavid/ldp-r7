class ViewTable
  TABLE_HEADERS = %w[Date Metric Notes]

  def initialize(type, data)
    @type = type
    @data = data
  end

  def rows
    @rows ||= data.map { |row| Row.new(row) }
  end

  def section_header
    <<-HTML
      #{type.capitalize} #{"✅" if completed_today?}
    HTML
  end

  private

  attr_reader :type, :data

  Row = Struct.new(:data_point) do
    def datetime
      data_point.created_at.strftime("%-m/%d/%Y - %a")
    end

    def value
      <<-HTML
        #{data_point.data["value"]}&nbsp;#{data_point.data["value_unit"]}
      HTML
    end

    def notes
      data_point.data["notes"]
    end
  end

  def completed_today?
    date_last_completed = rows.last.data_point.created_at.strftime("%-m/%d/%Y")

    date_last_completed == Time.now.strftime("%-m/%d/%Y")
  end
end

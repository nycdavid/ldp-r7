class PagesController < ApplicationController
  def about_us; end

  def retirement_calculator; end

  def sample
    @people = ["Hyunjoo", "David", "Hajin", "Hodori", "Jetty", "Hedgehog"]
  end
end

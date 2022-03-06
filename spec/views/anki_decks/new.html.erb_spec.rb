require 'rails_helper'

RSpec.describe "anki_decks/new", type: :view do
  before(:each) do
    assign(:anki_deck, AnkiDeck.new())
  end

  it "renders new anki_deck form" do
    render

    assert_select "form[action=?][method=?]", anki_decks_path, "post" do
    end
  end
end

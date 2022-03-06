require 'rails_helper'

RSpec.describe "anki_decks/show", type: :view do
  before(:each) do
    @anki_deck = assign(:anki_deck, AnkiDeck.create!())
  end

  it "renders attributes in <p>" do
    render
  end
end

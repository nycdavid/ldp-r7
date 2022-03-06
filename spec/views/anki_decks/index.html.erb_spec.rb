require 'rails_helper'

RSpec.describe "anki_decks/index", type: :view do
  before(:each) do
    assign(:anki_decks, [
      AnkiDeck.create!(),
      AnkiDeck.create!()
    ])
  end

  it "renders a list of anki_decks" do
    render
  end
end

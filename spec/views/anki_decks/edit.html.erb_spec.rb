require 'rails_helper'

RSpec.describe "anki_decks/edit", type: :view do
  before(:each) do
    @anki_deck = assign(:anki_deck, AnkiDeck.create!())
  end

  it "renders the edit anki_deck form" do
    render

    assert_select "form[action=?][method=?]", anki_deck_path(@anki_deck), "post" do
    end
  end
end

# frozen_string_literal: true

require "rails_helper"

RSpec.describe "AnkiDecks CRUD", type: :system do
  describe "#new" do
    it "creates decks" do
      visit new_anki_deck_path
      fill_in "anki_deck[name]", with: "Ruby"
      click_button "Create Anki deck"

      expect(page).to have_text("Anki deck was successfully created.")
      expect(AnkiDeck.last.name).to eq("Ruby")
    end
  end
end

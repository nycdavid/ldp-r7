class CreateAnkiDecks < ActiveRecord::Migration[7.0]
  def change
    create_table :anki_decks do |t|
      t.string :name

      t.timestamps
    end
  end
end

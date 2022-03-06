class CreateAnkiCards < ActiveRecord::Migration[7.0]
  def change
    create_table(:anki_cards) do |t|
      t.text :front
      t.text :back
      t.datetime :due_date

      t.references :anki_deck

      t.timestamps
    end
  end
end

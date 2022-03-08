# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_03_08_202132) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "anki_cards", force: :cascade do |t|
    t.text "front"
    t.text "back"
    t.datetime "due_date"
    t.bigint "anki_deck_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["anki_deck_id"], name: "index_anki_cards_on_anki_deck_id"
  end

  create_table "anki_decks", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "data_points", force: :cascade do |t|
    t.string "event_type"
    t.json "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "tasks", force: :cascade do |t|
    t.string "name"
    t.text "description"
    t.datetime "start_time"
    t.datetime "end_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "completed_at"
  end

  create_table "users", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "timezone"
  end

  create_table "weights", force: :cascade do |t|
    t.float "measurement"
    t.bigint "user_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.text "notes"
    t.index ["user_id"], name: "index_weights_on_user_id"
  end

end

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

ActiveRecord::Schema[7.0].define(version: 2022_09_20_151216) do
  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "domain_name"
    t.index ["domain_name"], name: "index_companies_on_domain_name"
  end

  create_table "employees", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "company_id", null: false
    t.integer "office_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_employees_on_company_id"
    t.index ["office_id"], name: "index_employees_on_office_id"
    t.index ["user_id"], name: "index_employees_on_user_id"
  end

  create_table "offices", force: :cascade do |t|
    t.integer "company_id", null: false
    t.string "street"
    t.string "house_number"
    t.string "town"
    t.string "province"
    t.string "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_offices_on_company_id"
  end

  create_table "places", force: :cascade do |t|
    t.integer "room_id", null: false
    t.integer "number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["room_id"], name: "index_places_on_room_id"
  end

  create_table "reservations", force: :cascade do |t|
    t.integer "employee_id", null: false
    t.integer "place_id", null: false
    t.datetime "start_at"
    t.datetime "end_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_reservations_on_employee_id"
    t.index ["place_id"], name: "index_reservations_on_place_id"
  end

  create_table "rooms", force: :cascade do |t|
    t.integer "office_id", null: false
    t.integer "floor"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["office_id"], name: "index_rooms_on_office_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "full_name"
    t.string "provider"
    t.string "uid"
    t.string "avatar_url"
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "employees", "companies"
  add_foreign_key "employees", "offices"
  add_foreign_key "employees", "users"
  add_foreign_key "offices", "companies"
  add_foreign_key "places", "rooms"
  add_foreign_key "reservations", "employees"
  add_foreign_key "reservations", "places"
  add_foreign_key "rooms", "offices"
end

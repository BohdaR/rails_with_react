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

ActiveRecord::Schema[7.0].define(version: 2023_01_03_084518) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "allowed_actions", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "allowed_actions_permissions", id: false, force: :cascade do |t|
    t.bigint "allowed_action_id", null: false
    t.bigint "permission_id", null: false
    t.index ["allowed_action_id"], name: "index_allowed_actions_permissions_on_allowed_action_id"
    t.index ["permission_id"], name: "index_allowed_actions_permissions_on_permission_id"
  end

  create_table "auth_groups", force: :cascade do |t|
    t.string "name"
    t.integer "priority"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "domain_name"
    t.string "description"
    t.string "slack_access_token"
    t.index ["domain_name"], name: "index_companies_on_domain_name"
  end

  create_table "employee_settings", force: :cascade do |t|
    t.boolean "slack_notifications"
    t.boolean "email_notifications", default: true
    t.bigint "employee_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_employee_settings_on_employee_id"
  end

  create_table "employees", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "company_id", null: false
    t.bigint "office_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email"
    t.string "slack_id"
    t.index ["company_id"], name: "index_employees_on_company_id"
    t.index ["office_id"], name: "index_employees_on_office_id"
    t.index ["user_id"], name: "index_employees_on_user_id"
  end

  create_table "employees_roles", id: false, force: :cascade do |t|
    t.bigint "employee_id", null: false
    t.bigint "role_id", null: false
    t.index ["employee_id"], name: "index_employees_roles_on_employee_id"
    t.index ["role_id"], name: "index_employees_roles_on_role_id"
  end

  create_table "favorites", force: :cascade do |t|
    t.bigint "employee_id", null: false
    t.bigint "place_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_favorites_on_employee_id"
    t.index ["place_id"], name: "index_favorites_on_place_id"
  end

  create_table "issues", force: :cascade do |t|
    t.string "name"
    t.bigint "company_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_issues_on_company_id"
  end

  create_table "issues_places", id: false, force: :cascade do |t|
    t.bigint "issue_id", null: false
    t.bigint "place_id", null: false
    t.index ["issue_id"], name: "index_issues_places_on_issue_id"
    t.index ["place_id"], name: "index_issues_places_on_place_id"
  end

  create_table "issues_rooms", id: false, force: :cascade do |t|
    t.bigint "issue_id", null: false
    t.bigint "room_id", null: false
    t.index ["issue_id"], name: "index_issues_rooms_on_issue_id"
    t.index ["room_id"], name: "index_issues_rooms_on_room_id"
  end

  create_table "offices", force: :cascade do |t|
    t.bigint "company_id", null: false
    t.string "street"
    t.string "house_number"
    t.string "town"
    t.string "province"
    t.string "country"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["company_id"], name: "index_offices_on_company_id"
  end

  create_table "permissions", force: :cascade do |t|
    t.string "name"
    t.bigint "auth_group_id", null: false
    t.bigint "scope_id", null: false
    t.bigint "subject_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["auth_group_id"], name: "index_permissions_on_auth_group_id"
    t.index ["scope_id"], name: "index_permissions_on_scope_id"
    t.index ["subject_id"], name: "index_permissions_on_subject_id"
  end

  create_table "permissions_roles", id: false, force: :cascade do |t|
    t.bigint "role_id", null: false
    t.bigint "permission_id", null: false
    t.index ["permission_id"], name: "index_permissions_roles_on_permission_id"
    t.index ["role_id"], name: "index_permissions_roles_on_role_id"
  end

  create_table "places", force: :cascade do |t|
    t.bigint "room_id", null: false
    t.integer "number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["room_id"], name: "index_places_on_room_id"
  end

  create_table "reservations", force: :cascade do |t|
    t.bigint "employee_id", null: false
    t.bigint "place_id", null: false
    t.datetime "start_at"
    t.datetime "end_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "calendar_id"
    t.string "calendar_link"
    t.index ["employee_id"], name: "index_reservations_on_employee_id"
    t.index ["place_id"], name: "index_reservations_on_place_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.bigint "auth_group_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["auth_group_id"], name: "index_roles_on_auth_group_id"
  end

  create_table "rooms", force: :cascade do |t|
    t.bigint "office_id", null: false
    t.integer "floor"
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "company_id", null: false
    t.index ["company_id"], name: "index_rooms_on_company_id"
    t.index ["office_id"], name: "index_rooms_on_office_id"
  end

  create_table "scopes", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.integer "priority", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "subjects", force: :cascade do |t|
    t.string "name"
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
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
    t.string "access_token"
    t.datetime "expires_at"
    t.string "refresh_token"
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "employee_settings", "employees"
  add_foreign_key "employees", "companies"
  add_foreign_key "employees", "offices"
  add_foreign_key "employees", "users"
  add_foreign_key "favorites", "employees"
  add_foreign_key "favorites", "places"
  add_foreign_key "issues", "companies"
  add_foreign_key "offices", "companies"
  add_foreign_key "permissions", "auth_groups"
  add_foreign_key "permissions", "scopes"
  add_foreign_key "permissions", "subjects"
  add_foreign_key "places", "rooms"
  add_foreign_key "reservations", "employees"
  add_foreign_key "reservations", "places"
  add_foreign_key "roles", "auth_groups"
  add_foreign_key "rooms", "companies"
  add_foreign_key "rooms", "offices"
end

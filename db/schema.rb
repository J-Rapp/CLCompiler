# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170102043906) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "areas", force: :cascade do |t|
    t.string   "name",        null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "subdomain"
    t.integer  "district_id"
    t.index ["district_id"], name: "index_areas_on_district_id", using: :btree
  end

  create_table "areas_searches", force: :cascade do |t|
    t.integer  "search_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "area_id"
    t.index ["area_id"], name: "index_areas_searches_on_area_id", using: :btree
    t.index ["search_id"], name: "index_areas_searches_on_search_id", using: :btree
  end

  create_table "districts", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "region_id"
    t.index ["region_id"], name: "index_districts_on_region_id", using: :btree
  end

  create_table "listings", force: :cascade do |t|
    t.string   "title",      null: false
    t.string   "url",        null: false
    t.string   "price"
    t.boolean  "favorite"
    t.integer  "search_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["search_id"], name: "index_listings_on_search_id", using: :btree
  end

  create_table "regions", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "results", force: :cascade do |t|
    t.boolean  "delivered",   default: false
    t.boolean  "favorited",   default: false
    t.boolean  "blacklisted", default: false
    t.integer  "search_id"
    t.integer  "listing_id"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.index ["listing_id"], name: "index_results_on_listing_id", using: :btree
    t.index ["search_id"], name: "index_results_on_search_id", using: :btree
  end

  create_table "searches", force: :cascade do |t|
    t.string   "name",             null: false
    t.string   "includes",         null: false
    t.string   "excludes"
    t.string   "min_price"
    t.string   "max_price"
    t.integer  "refresh_interval", null: false
    t.integer  "user_id"
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
    t.index ["user_id"], name: "index_searches_on_user_id", using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string   "username",               default: "", null: false
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
  end

end

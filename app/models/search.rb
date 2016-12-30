class Search < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :areas
  has_many :results

  validates :name, uniqueness: true

  enum refresh_interval: { hourly: 0, daily: 1 }
end

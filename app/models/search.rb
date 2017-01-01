class Search < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :areas
  has_many :results

  validates :name, uniqueness: true, presence: true, allow_blank: false

  enum refresh_interval: { hourly: 0, daily: 1 }
end

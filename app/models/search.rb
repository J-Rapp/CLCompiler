class Search < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :cities
  has_many :listings

  validates :name, uniqueness: true
end

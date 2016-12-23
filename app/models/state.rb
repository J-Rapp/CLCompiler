class State < ApplicationRecord
  belongs_to :country
  has_many :cities

  validates :name, uniqueness: true
end

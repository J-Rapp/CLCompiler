class City < ApplicationRecord
  belongs_to :district
  has_and_belongs_to_many :searches

  validates :name, uniqueness: true
end

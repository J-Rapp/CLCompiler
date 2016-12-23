class City < ApplicationRecord
  belongs_to :state
  has_and_belongs_to_many :searches

  validates :name, uniqueness: true
end

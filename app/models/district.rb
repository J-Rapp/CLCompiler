class District < ApplicationRecord
  belongs_to :region
  has_many :areas

  validates :name, uniqueness: true
end

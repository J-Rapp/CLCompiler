class Region < ApplicationRecord
  has_many :districts

  validates :name, uniqueness: true
end

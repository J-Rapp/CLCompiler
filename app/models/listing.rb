class Listing < ApplicationRecord
  belongs_to :search

  validates :link, uniqueness: true
end

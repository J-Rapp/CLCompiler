class Listing < ApplicationRecord
  has_many :results

  validates :url, uniqueness: true
end

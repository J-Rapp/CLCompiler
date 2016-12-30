class Listing < ApplicationRecord
  has_many :results, dependent: :destroy

  validates :url, uniqueness: true
end

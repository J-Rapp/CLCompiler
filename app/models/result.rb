class Result < ApplicationRecord
  belongs_to :search
  belongs_to :listing

  validates_uniqueness_of :search_id, scope: :listing_id
end

class Result < ApplicationRecord
  belongs_to :search
  belongs_to :listing

  validates_uniqueness_of :search_id, scope: :listing_id

  # TODO: on_create - queue for mailing
  # TODO: if unique url token in email is clicked, mark as 'visited'

  scope :fresh, -> { where visited: false, blacklisted: false }
  scope :visited, -> { where visited: true, blacklisted: false }
  scope :favorited, -> { where favorited: true, blacklisted: false }
end

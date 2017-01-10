class Result < ApplicationRecord
  belongs_to :search
  belongs_to :listing

  validates_uniqueness_of :search_id, scope: :listing_id

  # TODO: on_create - queue for mailing

  scope :unfavorited, -> { where favorited: false, blacklisted: false }
  scope :favorited, -> { where favorited: true, blacklisted: false }
  scope :deliverable, -> { where delivered: false }

  def group_by_date
    created_at.strftime('%m/%d')
  end
end

class Search < ApplicationRecord
  belongs_to :user
  has_many :listings

  validates :name, uniqueness: true
end

class Search < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :areas
  has_many :results, dependent: :destroy

  validates :name, uniqueness: true, presence: true

  enum refresh_interval: { hourly: 0, daily: 1 }

  after_create :execute_search

  private

  def execute_search
    SearchesService.new.call
  end
end

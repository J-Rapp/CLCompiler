class Search < ApplicationRecord
  belongs_to :user
  has_and_belongs_to_many :areas
  has_many :listings

  validates :name, uniqueness: true

  def refresh_interval_key=(param)
    encode_refresh_interval(param)
  end

  def daily?
    check_if_daily
  end

  private

  REFRESH_INTERVAL_KEYS = {
    hourly: 0,
    daily: 1
  }.freeze

  def encode_refresh_interval(param)
    REFRESH_INTERVAL_KEYS[param.to_sym]
  end

  def check_if_daily
    refresh_interval == INTERVALS[daily]
  end
end

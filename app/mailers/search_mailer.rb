class SearchMailer < ApplicationMailer
  default from: 'notifications@craigslistcompiler.com'

  def new_results(search)
    user = User.find(search.user_id)
    mail(to: user.email, subject: "New Results for \"#{search.name}\"")
  end
end

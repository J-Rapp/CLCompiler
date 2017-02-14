# Megslist

Megslist has two distinct use cases:

  1. On the [public landing page](http://megslist.herokuapp.com), a user can execute a limited search on up to 5 craigslist subdomains at once. This is executed with React and in-memory  POROs - no data is persisted. The rendering of the entire landing page lives in `app/assets/javascripts/components/welcome_page.js.jsx`, and the backend process for generating the POROs during the AJAX call lives in `lib/craigslist/search.rb`.
  2. On the [backend](http://megslist.herokuapp.com/entry), this app can store an admin's parameters for a custom craigslist search. It then executes that search on multiple craigslist subdomains at once and persists the results. Lastly, the app runs the search at set intervals and notifies the user via email when any new listings are posted to craigslist. This is accomplished by a scheduled chron rake task that fires `/app/services/searches_service.rb`.

---

### Local ENV

After migrating your database, be sure to run `bundle exec rake craigslist:locations`. This will parse and persist all of the associated craigslist areas/subdomains to your database.

There are no secret global keys, nor a `.env` file. Add the gem and file if your configuration requires it.

---

### Personal Learning Outcomes

- I've been comfortable with VanillaJS for some time, but this is my first project implementing React. As such, I am challenging myself to implement the entire front end with it and give the landing page a fluid "single page" feel.
- I spent a fair amount of time researching Rails architecture opinions about what belongs in the `services` vs `lib` directories. This had two significant results:
  1. At one point I decided to do a sizable overhaul of the views and controllers (after completing nearly 80% of the original MVP) in order to offer users much more of the app's backend power without having to register. I was terrified of the task at first, but researching good OOP/architecture and scrutinously refactoring my code paid dividends - recycling the existing architecture components in order to integrate new ones was a breeze.
  2. As a fun project, the `lib/craigslist` directory could be a starting chunk for a larger craigslist gem.

---

### Future Feature Ideas

- Ability to search more than the 'for sale' section
- Smart notifications: teaching the app to filter out postings that are likely duplicates
- Automated database cleaning: deleting old listings that no longer are active

---

### Why "Meg"?

Because dismantling the patriarchy, that's why.

And it rhymes with Craig.

---

### Legal

This app has no affiliation with craigslist, and admittedly directly violates craigslist terms of use by scraping from their public pages. In an attempt to not be a total jerk about it, the app is very conscious of bandwidth consumption by limiting search functionality/frequency in order to imitate the traffic of an average human user on any craigslist server. Further, very few posting details are persisted - save for price and a link directly to the original craigslist posting - and no craislist user data is scraped, nor persisted.


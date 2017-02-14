# Megslist

Megslist has two distinct use cases:

  1. On the public landing page, a user can execute a limited search on up to 5 craigslist subdomains at once. This is executed with React and in-memory  POROs - no craigslist posting data is persisted.
  2. On the private the backend, this app can stores a user's parameters for a custom craigslist search. It then executes that search on multiple chosen craigslist locations at once and persists the listings. Lastly, it runs the search at automatic intervals and emails the user when any new listings are posted to craigslist.

To try the app out live, go to [megslist.herokuapp.com](http://megslist.herokuapp.com).

---

### Setting it up locally

Make sure to run `rake craigslist:locations` - that parses and persits all of the craigslist subdomains.

---

### Personal Learning Outcomes

- I've been comfortable with VanillaJS for some time, but this is my first project implementing React. As such I am challenging myself to do the entire front end with it, and give it the landing page a fluid, "single page" feel.
- I spent a fair amount of time researching Rails architecture opinions about what belongs in the `services` vs `lib` directories. This had two significant results:
  1. At one point I decided to do a major overhaul of the entire stack after completing nearly 80% of MVP, and was pretty terrified at first. Researching good OOP & architecture and scrutinously refactoring the code paid dividends - reorganizing the existing MVP components to introduce entirely new ones was a breeze. 
  2. As a fun future project (if craigslist ever changes their terms of use to allow scraping), the `lib/craigslist` directory could easily fork off as a nice start for a craigslist gem.

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

This app has no affiliation with craigslist, and admittedly directly violates craigslist terms of use by scraping from their public pages. In an attempt to not be a total jerk about it, the app reduces bandwidth consumption by limiting search functionality/frequency in order to better replicate the traffic of an average human user. Further, results link directly to the original craigslist posting and no craislist user data is scraped or persisted.


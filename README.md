# MegsList

This app stores a user's parameters for a custom Craigslist search. It then executes that search on multiple chosen Craigslist locations at once and compiles the results. Lastly, it runs the search at automatic intervals and emails the user when any new listings are posted.

To try the app out live, go to [megslist.herokuapp.com](http://megslist.herokuapp.com), but fair warning the front-end is an ugly-as-sin WIP.

---

### Personal Learning Outcomes

- I've been comfortable with Vanilla JS for some time, but this will be my first endeavor working with React. As such I am challenging myself to do the entire front end with it, and give it that fluid "single page" feel.
- I spent a fair amount of time researching Rails architecture opinions about what belongs in `services` vs `lib` directories. This had two significant results:
  1. As a fun future project (if CL TOU ever change to allow scraping), the `lib/craigslist` directory could easily fork off as a nice start for an open source gem.
  2. At one point I decided to do a major overhaul of the entire stack after completing nearly 80% of MVP, and was pretty terrified at first. Researching good OOP & architecture and scrutinously refactoring the code paid dividends - reorganizing the existing MVP components to introduce entirely new ones was a breeze.

---

### Future Feature Ideas

- Ability to search more than the 'for sale' section
- Smart notifications - teaching the app to filter out postings that are likely duplicates
- Automated database cleaning - deleting old listings that no longer are active

---

### Why "Meg"?

Because dismantling the patriarchy, that's why.

And it rhymes with Craig.

---

### Legal

This app has no affiliation with Craigslist, and directly violates Craigslist TOU by scraping from their public pages. In an attempt to not be a total jerk about it, the app reduces consumption by limiting search functionality/frequency in order to better imitate the traffic of a human user. Further, results link directly to the original Craigslist content and no Craislist user data is scraped.


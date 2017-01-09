# MegsList

This app stores a user's parameters for a custom Craigslist search. It then executes that search on multiple chosen Craigslist locations at once and compiles the results. Lastly, it runs the search at automatic intervals and emails the user when any new listings are posted.

---

### Aren't there already a handful of Craiglist compilers out there?

Sure, but I had fun making this and I'm learning a lot in the process.

---

### Why "Meg"?

Because dismantling the patriarchy, that's why.

And it rhymes with Craig.

---

### Development

I'm doing a back-to-front build on this. I completed the Rails foundation in 8 days over the holidays. Then I got sick. Now I'm back at it, building the front as I further my React knowledge.

I've been comfortable with JS for some time, but this will be my first endeavor implementing React in a live app. As such I am challenging myself to do the entire front end with it.

To try the app out live, go to [megslist.herokuapp.com](http://megslist.herokuapp.com), but fair warning the front-end is an ugly-as-sin WIP.

---

### Personal Learning Outcomes

I spent a fair amount of time researching Rails architecture opinions about what belongs in `app/services` vs `lib`, and as a result I think I have a decent start to a potential Craiglist gem living in my `lib` directory.


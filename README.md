This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

TODO:

* Add filter function to show games that are still open
* Add booking functionality
* Make event booking section only show when booking is open (how is this set on the server?)
* Get load Events Since working
* Get Jerry to fix ASCII crud
* How to show GM if not logged in?
* Get Jerry to set CORS for delete favorite
* Ask about term GM and what to use instead
* Improve CSS for Blog
* Look at how Blog grabs data
* Make individual events fetch new data on open and incorpoarate into Redux store. Also should fetch new on booking/unbooking.

* Change fetch so that it uses Epochtime for Public and then when user is logged in it only grabs individual data for events when they are opened (or maybe epoch?) — though I need to make sure it either closes events or grabs ones that are currently open
* Add Fetch Event Epoch for logged in so that I can use the Open filter
* Add sort by game system
* Add All Ages, Playtest, Volunteer, Panel, Boardgames, Performance, Social, Etc.
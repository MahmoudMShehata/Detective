# Detective

This README documents the necessary steps to get the Detective application up and running.

## Ruby version

- Ruby 3.2.0
- Rails 7.0.8.7

## System dependencies

Make sure the following dependencies are installed:

- Node v18.19.1
- PostgreSQL

## Description

Nothing is tricky, just hit the main page and you're good to go!
You'll find a search bar and beneath it the top searches done by the users and there's a drop-down menu having the user's own search history. The top searches section gets automatically updated using action cable if there's something trending 📈
The main algorithm for displaying trendy searches is designed to only show meaningful searches, here's a simple breakdown :

1st search => how is (searched for 15 times and is one of the top searches)
2nd search => how is the weather today (searched for only 1 time)

1st search is taken down from being a top search as "how is the weather today" is a meaningful search so it replaces it and "how is" is not trending anymore BUT! if the user -for example- searches for "weather", so that will be considered totally as a different thing and not as a substring of a bigger meaningful search.


You can send an email to mahmoudcit@gmail.com if you have any questions or misconceptions.
 

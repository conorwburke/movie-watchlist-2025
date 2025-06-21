# Movie Watchlist

A web app for compiling a movie watchlist.

## Introduction

This app was created as a solo project as part of Scrimba's FrontEnd Web Developer path (though I created it on my own using a provided Figma design, not through any video casts). 
The app allows users to search for movies and relevant details such as title, IMDB rating, length, genre, and description and then add movies they're interested in to a watchlist.

## Using the app

This app has been deployed on Netlify and can be utilized at the following address: https://dashing-malasada-1573c4.netlify.app/

## Features

-Search form input and button
-Add/remove buttons
-Utilizes LocalStorage to preserve movies added to watchlist

## Technologies used

-HTML
-CSS
-JavaScript

## Reflection on project

I ran into two main challenges with the project, both related to the API call. The first was that the data returned from the base search text query did not contain complete data--
the description in particular. As such, I had to call the API again using the IMDB id for the movie, which did provide complete data. The second issue was more fundamental:
because I'd been taught how to make API calls using fetch and .then and was simultaneously trying to teach myself how to instead use asynchronous function calls, I had a bit of trouble
understand how to force all promises to resolve before subsequent code ran.

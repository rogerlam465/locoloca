This is my final web app project, the capstone of my MERN bootcamp.

## Executive Summary

The concept is a highly localized e-commerce shopping experience, wherein every user acts as one of three personas: shopper, seller, and courier. As such, every user can purchase items from within 20km of their current location, can also act as a delivery person, and can put their own items for sale.

## Technologies Used

While the geo-fencing feature is based on an external API, everything else is pure MERN stack, though the React component should also include Redux.

## Challenges and Learnings

This project was quite heavy on the backend; I wasn't expecting to need quite so many backend routes, but there you have it. I ended up digging into Mongo rather further than I expected in order to make sensible and non-redundant queries; I suspect that an SQL structured DB would have been better, as a lot of the various collections I had ended up making references to other documents. (For example, an cart item would refer back to the seller, the item itself, as well as the buyer, each of which were also Mongo documents.)

In many cases, it was quite challenging to parse the data in just the way I needed it to, and I learned some sharp lessons about how to properly format data to avoid headaches for myself in the future.

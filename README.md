PostFlow
PostFlow is a social media quote-sharing application that allows users to explore, create, and save inspirational quotes. This version features a Microservices Architecture, integrating a dedicated weather service to provide real-time environmental context to the global feed. Users can browse quotes, post their own, and save favorites to their personal profile — similar to the way TikTok users can like and save videos.

Features
Explore Quotes: Browse quotes from all users in the feed, newest first.
Weather Integration: Real-time weather data displayed on the feed via a protected Microservice.
Weather Search: Users can search for specific weather conditions by Zip Code and Date.
Create Quotes: Users can post their own quotes directly from the feed.
Save Favorites: Users can save quotes from the feed to their profile for later.
User Profiles: Each user has a personal profile page displaying their saved quotes with a glassmorphism design.
Pagination: Display quotes in pages of 10 with a "Next" button for smooth browsing.
Microservice Caching: The weather service includes an in-memory cache to optimize performance and reduce API calls.

Tech Stack
Frontend: React, React Router, CSS (Glassmorphism & Nature Aesthetics)
Main Backend: Node.js, Express (Handles Supabase & Service Proxy)
Weather Microservice: Node.js, Express (Handles Visual Crossing API & Caching)
Database: Supabase (PostgreSQL)
APIs: REST endpoints for quotes, favorites, and weather data.

System Architecture
PostFlow uses a Proxy Pattern for its microservices. The Frontend communicates only with the Main Backend, which then performs a "handshake" with the Weather Microservice using a shared SERVICE_KEY.

Table Structure
post_flow
Column
Type
Description
id
int
Auto-increment primary key
author
text
Name of the user posting
quote
text
The quote content
created_at
timestamp
Auto-generated creation date

user_profile
Column
Type
Description
id
int
Auto-increment primary key
name
text
User's name
quote
text
User-created quote
created_at
timestamp
Auto-generated creation date


Setup Instructions
1. Weather Microservice (Port 3001)
Navigate to the microservice directory and install dependencies:
Bash
npm install

Configure .env:
Code snippet
myAPIKey=your_visual_crossing_api_key
SERVICE_KEY=your_shared_secret_key

Start the service:
Bash
node weatherService.js

2. Main Backend (Port 3000)
Install dependencies:
Bash
npm install

Configure environment variables in .env:
Code snippet
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_key
SERVICE_KEY=your_shared_secret_key (must match microservice)
PORT=3000

Run the server:
Bash
npm run dev

3. Frontend
Install dependencies:
Bash
npm install

Start the React app:
Bash
npm start


API Endpoints
Weather (via Proxy)
Method
Endpoint
Description
GET
/get-weather
Fetches weather via Microservice (Zip/Date req)

Posts
Method
Endpoint
Description
GET
/posts
Get all quotes from feed
POST
/posts
Add a new quote to feed

Favorites
Method
Endpoint
Description
POST
/favorites
Save a post to user's favorites
GET
/favorites/:user_name
Get all favorites for a user


Usage
Feed Page:
Browse global quotes.
View automatic weather updates for your default location.
Save quotes to favorites by clicking ❤️ Save.
Weather Search:
Enter a Zip Code and Date in the Weather Widget to see historical or current data.
Create Quote:
Click Create → enter name and quote → Post.
Quote appears immediately in the feed.
Profile Page:
Click Profile to view saved quotes against a beautiful glassmorphism backdrop.

Future Enhancements
Add delete functionality for user quotes and favorites.
Persistent weather caching using Redis.
Add reactions: heart, thumbs-up, share.
Support user authentication with Supabase Auth.
Created by Sally & Isaac Watson

Project url: https://postflow-ad9c.onrender.com


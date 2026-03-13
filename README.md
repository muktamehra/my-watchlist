🎬 CineTrack — My Watchlist
A movie and TV show tracker built with React as part of my journey learning modern frontend development. Browse popular picks, add favourites, track what you've watched, rate shows and filter your list.
Live Demo: https://my-watchlist-xi.vercel.app/
________________________________________
📸 Preview
 
________________________________________
✨ Features
•	🎥 Browse Popular Picks — real movie posters fetched from the TMDB API
•	➕ Add Shows — add any movie or TV show to your watchlist
•	👁️ Track Progress — mark shows as watched or unwatched
•	⭐ Star Ratings — rate watched shows out of 5 stars
•	🏷️ Genre Tags — assign and change genres with a single click
•	🔍 Filter — view All, Watched or Unwatched shows
•	📊 Counter — see your total, watched and unwatched counts at a glance
•	🗑️ Delete Confirmation — prevents accidental deletions
•	🚫 Duplicate Protection — prevents adding the same show twice
•	📱 Responsive — works on desktop, tablet and mobile
________________________________________
🛠️ Built With
•	React — UI library
•	Vite — development server and build tool
•	TMDB API — movie posters and data
•	Font Awesome — social media icons
•	CSS — custom styling with responsive layout
________________________________________
🚀 Getting Started
Prerequisites
•	Node.js installed
•	A free TMDB API key
Installation
Clone the repository:
git clone https://github.com/muktamehra/my-watchlist.git
cd my-watchlist
Install dependencies:
npm install
Create a .env file in the root folder:
VITE_TMDB_API_KEY=your_api_key_here
Start the development server:
npm run dev
Open your browser at:
http://localhost:5173
________________________________________
📁 Project Structure
src/
├── App.jsx — Main component (state and logic)
├── App.css — Styles and responsive layout
├── Header.jsx — Navigation bar
├── Hero.jsx — Banner image section
├── PopularShows.jsx — Movie grid with TMDB API integration
├── Footer.jsx — Footer with social media icons
└── main.jsx — React entry point
________________________________________
💡 React Concepts Used
Concept	Where Used
useState	Managing shows, filters, genre and input state
useEffect	Fetching movie data from the TMDB API
Props	Passing functions and data between components
Derived State	filteredShows, totalShows, watchedShows
Conditional Rendering	Showing rating stars only when a show is marked watched
Array Methods	map, filter, find, reduce
Spread Operator	Immutable state updates
Controlled Inputs	Input field and genre selector
Media Queries	Mobile responsive layout
________________________________________
🔑 Key Functions
addShow
Adds a new show to the watchlist either from the input field or from the Popular Picks section.
toggleWatched
Updates the watched status of a show using the ! operator and map.
deleteShow
Removes a show from the watchlist using filter.
rateShow
Updates the rating of a show using map to update only the selected item.
changeGenre
Cycles through genre options using the modulo operator %.
________________________________________
🌐 Deployment
Deployed on Vercel with automatic deployments on every push to the main branch.
________________________________________
👨‍💻 Author
Mukta Mehra
https://github.com/muktamehra
________________________________________
📝 License
This project is open source and available under the MIT License.


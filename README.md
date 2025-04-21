# Movipedia
A mobile movie app built with Expo, React Native, Expo Router, TypeScript, and React Query. View lists of movies, details, descriptions, and play trailers—all within a native-stack navigation.

---

## 🚀 Getting Started
1. **Clone the repo**
   ```bash
   git clone https://github.com/your-username/Movipedia.git
   cd Movipedia
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Add your TMDB API key**
   - Create a file `.env`:
   - 
     ```js
     EXPO_PUBLIC_TMDB_API_KEY = 'YOUR_TMDB_API_KEY';
     ```
   - Ensure `movieApi.ts` imports from your env.
4. **Start the Expo server**
   ```bash
   npm run start
   ```
   Open on iOS Simulator, Android Emulator, or Expo Go.

---

## 🧱 Core Concepts
- **Expo Router (v4.x)**: File-based routing built on React Router v6, using a native stack (`<Stack>`).
- **React Query**: Caching, background refetch, and stale-while-revalidate patterns for network data.
- **TypeScript**: Typed hooks, services, and components.
- **Path Aliases**: `@services`, `@hooks`, `@components`, etc., configured in `babel.config.js` and `tsconfig.json`.
- **TMDB API**: Fetch popular movies, details, and trailers via `/movie/popular`, `/movie/{id}`, and `/movie/{id}/videos`.
- **WebView**: In-app YouTube embed for trailer playback.

---

## 📱 Screens Overview
1. **Movies List** (`/`)  
   - Uses `useMovies` hook.  
   - Renders `MovieList` (FlatList of `MovieItem`).

2. **Movie Details** (`/movies/[id]`)  
   - Uses `useMovie(id)`.  
   - Shows poster, title, release date, overview snippet.  
   - Link to Trailers.

3. **Movie Trailers** (`/movies/[id]/trailers`)  
   - Fetches videos via `useMovieVideos(id)`.  
   - Filters for YouTube trailers.  
   - Inline player with `react-native-webview`.

---

## 🧪 Testing
- **Jest** with `jest-expo` preset.  
- **@testing-library/react-native** for component tests.  
- Run:
  ```bash
  npm run test
  ```

---

## 📦 Scripts
- `start` — Expo dev server
- `test` — Jest test runner

---

## ⚙️ Decisions and Challenges
- For this coding challenge, I chose to try a new thing I think is good when it comes to the folder structure of testing, this is by putting the `tests` folder at the root which I think is nice for small-scale projects such as this to have a clear separation between source vs tests
- As mentioned in the 🧱 Core Concepts, I chose to use React Query, dividing the implementation it into 3 parts, the `services`, `API` and `hooks`. 
  - `services` (src/services/movieApi.ts): These are the low level functions that calls the API 
  - `API` layer (src/api/movieQueries.ts): This is where the query cache keys are set to ensure that there's a single source of truth for query keys for cases that it needs to be re-set or changed in the future.
  - `hooks` Utilize React Query’s useQuery to query data and display it.
- This is to decouple fetching, querying and component usage to ensure separation of concerns and reusability.
- I've also wrapped the application with something I created called `ContextCombiner`, which takes an array of Providers that needs to wrap the application and make use of `.reduce` instead of coding every provider in `index.tsx`. This can be found in `src/shared/ContextCombiner`

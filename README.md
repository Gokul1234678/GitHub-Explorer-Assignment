# GitHub Explorer

A React.js application to search GitHub users and explore their repositories.

## Features
- Search GitHub users
- View user repositories
- Sort repositories by stars and forks
- Filter repositories by language
- Debounced search for optimization
- Loading, error, and empty states

## Tech Stack
- React.js
- JavaScript
- GitHub REST API

## How to Run
1. Clone the repo
2. Run `npm install`
3. Run `npm run dev`

## API Used
- https://api.github.com/search/users?q={query}
- https://api.github.com/users/{username}/repos

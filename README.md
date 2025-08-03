# 📚 Book Buddy

A modern React application for discovering and managing your personal reading list using the Open Library API.

## Setup

1. **Prerequisites**

   - Node.js (version 18 or higher)
   - npm (comes with Node.js)

2. **Installation**

   ```bash
   git clone <your-repo-url>
   cd book-buddy
   npm install
   ```

## Running the App

1. Start the development server:

   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:5173`

## Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## Refactor

> I added a `refactor` branch with some updated codeto show how I would have done it if I had more time. I spent about 45 min on Sunday to do it.

- I would have used a context to store the search state and a custom hook to update the state.
- I would have used a custom Layout component to handle the navigation.
- I would have better organized the components.

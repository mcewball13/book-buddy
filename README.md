# 📚 Book Buddy

A modern React application for discovering and managing your personal reading list. Search for books using the Open Library API and keep track of books you want to read.

## ✨ Features

- **🔍 Book Search** - Search for books by title or author using the Open Library API
- **📖 Reading List** - Add and remove books from your personal reading list
- **📱 Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **⚡ Fast Navigation** - Quick switching between search and reading list views
- **📄 Pagination** - Browse through search results with clean pagination controls
- **💾 Local Storage** - Your reading list persists between browser sessions
- **🎨 Modern UI** - Built with Tailwind CSS for a clean, professional look

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development with full TypeScript support
- **Tailwind CSS** - Utility-first CSS framework for responsive design
- **React Hook Form** - Performant form handling with validation
- **React Query** - Powerful data fetching and caching
- **React Router** - Client-side routing for single-page application
- **Zod** - Schema validation for form data
- **Jest & React Testing Library** - Comprehensive testing setup
- **Vite** - Fast build tool and development server

## 🚀 Getting Started

### Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd book-buddy
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 📋 Available Scripts

### Development

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Testing

```bash
npm test             # Run tests once
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage report
```

### Code Quality

```bash
npm run lint         # Run ESLint to check code quality
```

## 🧪 Running Tests

The project includes comprehensive unit tests for components and hooks:

```bash
# Run all tests
npm test

# Run tests in watch mode (reruns on file changes)
npm run test:watch

# Generate coverage report
npm run test:coverage
```

**Test Coverage Includes:**

- ✅ Form components (TextField)
- ✅ Custom hooks (useBooks)
- ✅ API integration
- ✅ User interactions

## 📁 Project Structure

```
src/
├── app/                    # Page-level components
│   ├── SearchPage.tsx     # Search page with form and results
│   └── ReadingListPage.tsx # Reading list management page
├── components/            # Reusable UI components
│   ├── form/             # Form-related components
│   │   ├── Button.tsx
│   │   └── TextField.tsx
│   ├── Navigation.tsx    # App navigation bar
│   ├── Pagination.tsx    # Pagination controls
│   └── BookCardSkeleton.tsx # Loading skeleton
├── sections/             # Feature-specific components
│   ├── search/
│   │   └── BookSearch.tsx # Book search with results grid
│   └── reading-list/
│       └── ReadingList.tsx # Reading list display
├── hooks/                # Custom React hooks
│   ├── useBooks.ts       # Book search API integration
│   └── useReadingList.ts # Reading list state management
├── types/                # TypeScript type definitions
│   ├── book.ts          # Book and API response types
│   └── search-form.ts   # Form validation schemas
└── config.ts            # App configuration constants
```

## 🎯 How to Use

### Searching for Books

1. Navigate to the **Search Books** tab
2. Enter a book title or author name in the search field
3. Press **Search** or hit Enter
4. Browse through paginated results
5. Click **Add to Reading List** on any book you're interested in

### Managing Your Reading List

1. Navigate to the **Reading List** tab
2. View all books you've added to your list
3. Click **Remove from List** to remove books you no longer want

### Features in Detail

- **Responsive Grid**: Books display in 1-3 columns based on screen size
- **Pagination**: Navigate through large search results with page controls
- **Persistent Storage**: Your reading list saves automatically in browser storage
- **Loading States**: Skeleton loaders provide smooth user experience
- **Error Handling**: Graceful error messages for API failures

## 🏗️ Architecture

This project follows modern React best practices with:

- **Clean, Modular Code** - Well-organized components with single responsibilities
- **Type Safety** - Full TypeScript coverage for robust development
- **Custom Hooks** - Reusable logic for state management and API calls
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Performance Optimized** - React Query for efficient data fetching and caching
- **Accessible UI** - Semantic HTML and proper ARIA attributes
- **Comprehensive Testing** - Unit tests for critical functionality

## 🌐 API Integration

The app integrates with the [Open Library API](https://openlibrary.org/developers/api) to fetch book data:

- **Search Endpoint**: `/search.json` for finding books by title/author
- **Pagination Support**: Built-in pagination with configurable page sizes
- **Cover Images**: Direct integration with Open Library cover images
- **Rich Metadata**: Displays title, author, publication year, and subjects

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🔧 Development Notes

- **Code Style**: Project uses ESLint for consistent code formatting
- **Type Checking**: All components and hooks are fully typed
- **Testing**: Jest and React Testing Library for reliable test coverage
- **Build Tool**: Vite for fast development and optimized production builds
- **Browser Support**: Modern browsers with ES2020+ support

---

Built with ❤️ using React, TypeScript, and modern web technologies.

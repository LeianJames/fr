// Database of books for the e-library //palitan yung savebooks and loadbooks function
let books = [
  {
    id: 1,
    title: "Carbon Jargon: Making Sense of the life Science of Climate Change",
    author: "N/A",
    description: "Book - 159 pages;",
    location: "Nova Schola Main Library",
    available: true
  },
  {
    id: 2,
    title: "General Ecology",
    author: "David T. Krohne, author.",
    description: "Book - 505 pages;",
    location: "Nova Schola Main Library",
    available: true
  },
  {
    id: 3,
    title: "Biology of the invertabrate",
    author: "Jan A. Pechenik.",
    description: "Book - 605 pages;",
    location: "Nova Schola Main Library",
    available: true
  },
  {
    id: 4,
    title: "Environmental Science ",
    author: "American Geological Institute.",
    description: "Book - 324 pages;",
    location: "Nova Schola Main Library",
    available: true
  },
  {
    id: 5,
    title: "Sociological and Anthropology with family",
    author: "Dr. Manalo M Ariola.",
    description: "Book - 210 pages;",
    location: "Nova Schola Main Library",
    available: true
  },
  {
    id: 6,
    title: "Basic Calculus for Senior High School",
    author: "Perla Dela Cruz.",
    description: "Book - 309 pages;",
    location: "Nova Schola Main Library",
    available: true
  },
  {
    id: 7,
    title: "English for Academic and Professional Purpose",
    author: "Marikit Vychoco and Grace Sacteton,",
    description: "Book - 179 pages;",
    location: "Nova Schola Main Library",
    available: true
  },
  {
    id: 8,
    title: "Oral Communication in context",
    author: "Ramona S. Flores,",
    description: "Book - 183 pages;",
    location: "Nova Schola Main Library",
    available: true
  },
  {
    id: 9,
    title: "T.L.E. in the 21st Century",
    author: "Grisham John,",
    description: "Book - 456 pages;",
    location: "Nova Schola Main Library",
    available: true
  },
  {
    id: 10,
    title: "Plane and Spherical trigonometry with applications",
    author: "Hart,",
    description: "Book - 124 pages;",
    location: "Nova Schola Main Library",
    available: true
  },
  {
    id: 11,
    title: "Algebra for the Bitterly confused",
    author: "Stephens Henrry,",
    description: "Book - 201 pages;",
    location: "Nova Schola Main Library",
    available: true
  },
  {
    id: 12,
    title: "Geometry",
    author: "Prinami/ Caruso 2012,",
    description: "Book - 201 pages;",
    location: "Nova Schola Main Library",
    available: true
  },
  {
    id: 13,
    title: "California Pre-Algebra",
    author: "Charles Etal,",
    description: "Book - 760 pages;",
    location: "Nova Schola Main Library",
    available: true
  },
];

// Function to save books data to localStorage
function saveBooks() {
  localStorage.setItem('libraryBooks', JSON.stringify(books));
}

// Function to load books data from localStorage
function loadBooks() {
  const savedBooks = localStorage.getItem('libraryBooks');
  if (savedBooks) {
    books = JSON.parse(savedBooks);
  }
}

// Function to add a new book
function addBook(bookData) {
  // Generate a new ID (highest existing ID + 1)
  const newId = books.length > 0 ? Math.max(...books.map(book => book.id)) + 1 : 1;
  
  // Create new book object
  const newBook = {
    id: newId,
    title: bookData.title,
    author: bookData.author,
    description: bookData.description,
    location: bookData.location,
    available: true
  };
  
  // Add to books array
  books.push(newBook);
  
  // Save to localStorage
  saveBooks();
  
  return newBook;
}

// Function to delete a book
function deleteBookById(id) {
  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    saveBooks();
    return true;
  }
  return false;
}

// Function to toggle book availability
function toggleBookAvailability(id) {
  const book = books.find(book => book.id === parseInt(id));
  if (book) {
    book.available = !book.available;
    saveBooks();
    return book;
  }
  return null;
}

// Function to search books
function searchBooks(searchTerm) {
  searchTerm = searchTerm.toLowerCase();
  return books.filter(book => 
    book.title.toLowerCase().includes(searchTerm) || 
    book.author.toLowerCase().includes(searchTerm)
  );
}

// Function to sort books
function sortBooks(booksList, sortBy) {
  let sortedBooks = [...booksList];
  
  switch(sortBy) {
    case 'title':
      sortedBooks.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case 'author':
      sortedBooks.sort((a, b) => a.author.localeCompare(b.author));
      break;
    case 'relevance':
    default:
      // Default sort is by ID
      sortedBooks.sort((a, b) => a.id - b.id);
      break;
  }
  
  return sortedBooks;
}

// Initialize by loading any saved data
loadBooks();
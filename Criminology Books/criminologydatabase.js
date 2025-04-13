// Database of books for the e-library, palitan yung savebooks and loadbooks function
let books = [
  {
    id: 1,
    title: "Introduction to Criminology",
    author: "John Smith",
    description: "Book - 300 pages;",
    location: "Nova Schola Main Library",
    available: true
  },
  {
    id: 2,
    title: "Criminal Justice System",
    author: "Jane Doe",
    description: "Book - 450 pages;",
    location: "Nova Schola Main Library",
    available: true
  },
  {
    id: 3,
    title: "Forensic Science",
    author: "Robert Johnson",
    description: "Book - 500 pages;",
    location: "Nova Schola Main Library",
    available: true
  },
  {
    id: 4,
    title: "Criminal Law",
    author: "Sarah Williams",
    description: "Book - 400 pages;",
    location: "Nova Schola Main Library",
    available: true
  },
  {
    id: 5,
    title: "Criminal Psychology",
    author: "Michael Brown",
    description: "Book - 350 pages;",
    location: "Nova Schola Main Library",
    available: true
  }
];

// Function to save books data to localStorage
function saveBooks() {
  localStorage.setItem('criminologybooks', JSON.stringify(books));
}

// Function to load books data from localStorage
function loadBooks() {
  const savedBooks = localStorage.getItem('criminologybooksBooks');
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
// This file contains all the book data for the e-library
const books = [
    {
      id: 1,
      title: "Regeneration",
      author: "Pat Barker,",
      description: "Book - 251 pages;",
      location: "Nova Schola Main Library"
    },
    {
      id: 2,
      title: "ADVERBS: A Novel",
      author: "Daniel, Handler,",
      description: "Book - 272 pages;",
      location: "Nova Schola Main Library"
    },
    {
      id: 3,
      title: "The Fountainhead",
      author: "AYN Rand.",
      description: "Book - 696 pages;",
      location: "Nova Schola Main Library"
    },
    {
      id: 4,
      title: "Eden Burning ",
      author: "Belva Plain, author.",
      description: "Book - 476 pages;",
      location: "Nova Schola Main Library"
    },
    {
      id: 5,
      title: "The road less travelled",
      author: "M. Scott Peck , author.",
      description: "Book - 342 pages;",
      location: "Nova Schola Main Library"
    },
  
    {
        id: 6,
        title: "James and the Giant Peach",
        author: "Roald Dahl, author.",
        description: "Book - 230 pages;",
        location: "Nova Schola Main Library"
      },
      
      {
        id: 7,
        title: "A Painted House",
        author: "Grisham John,",
        description: "Book - 456 pages;",
        location: "Nova Schola Main Library"
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
// This file contains all the book data for the e-library
const books = [
    {
      id: 1,
      title: "Daily Gospel",
      author: "No author.",
      description: "No pages;",
      location: "Nova Schola Main Library"
    },
    {
      id: 2,
      title: "Handbook of Prayers",
      author: "hCarles Belmonte, James Socias, author.",
      description: "Book - 376 pages;",
      location: "Nova Schola Main Library"
    },
    {
      id: 3,
      title: "Moments",
      author: "Fr. Jenry M. Orbos.",
      description: "Book - 101 pages;",
      location: "Nova Schola Main Library"
    },
    {
      id: 4,
      title: "In love with God ",
      author: "de Mesa Jose, Rebecca Cacho, author.",
      description: "Book - 180 pages;",
      location: "Nova Schola Main Library"
    },
    {
      id: 5,
      title: "Church of Sacraments",
      author: "Victoria D., Corral, Fides Maria , author.",
      description: "Book - 330 pages;",
      location: "Nova Schola Main Library"
    },

    {
        id: 6,
        title: "Mama Mary, and Her Children",
        author: "Reuter, James B. , author.",
        description: "Book - 150 pages;",
        location: "Nova Schola Main Library"
      },

      {
        id: 7,
        title: "Living Water",
        author: "N/A , author.",
        description: "Book - N/A pages;",
        location: "Nova Schola Main Library"
      },

      {
        id: 8,
        title: "Interpreting the new Testament",
        author: "Daniel J. Harrington , author.",
        description: "Book - 150 pages;",
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
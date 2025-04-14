// HIND
const books = [
    {
      id: 1,
      title: "Decide Where you want to be in 10 minutes,10 months, 10 years",
      author: "Jack Welch, author .",
      description: "Book - 251 pages;",
      location: "Nova Schola Main Library"
    },
    {
      id: 2,
      title: "The other 90%",
      author: "Robert K. Cooper, author.",
      description: "Book - 316 pages;",
      location: "Nova Schola Main Library"
    },
    {
      id: 3,
      title: "The Power of Focus",
      author: "Canfield, Jack et al. ",
      description: "Book - 310 pages;",
      location: "Nova Schola Main Library"
    },
    {
      id: 4,
      title: "100 ways to build self-esteem and teach values",
      author: "Diane Loomans, Julia Loomans, author.",
      description: "Book - 335 pages;",
      location: "Nova Schola Main Library"
    },

    {
      id: 5,
      title: "50 Self Help Classic/So insparational Books To transform your life ",
      author: "Tom Butter-Bowdon, author.",
      description: "Book - 307 pages;",
      location: "Nova Schola Main Library"
    },

    {
        id: 6,
        title: "Controlling your Anger before it controls YOU",
        author: "Gregory L. Jahitz , author.",
        description: "Book - 281 pages;",
        location: "Nova Schola Main Library"
      },

      {
        id: 7,
        title: "Kookology:The game of self Discovery",
        author: "Todahiko Naga , author.",
        description: "Book - 172 pages;",
        location: "Nova Schola Main Library"
      },

      {
        id: 8,
        title: "principles of Spiritual Growth",
        author: "Miles J. Stanford , author.",
        description: "Book - 108 pages;",
        location: "Nova Schola Main Library"
      },

      {
        id: 9,
        title: "First Things First",
        author: "Stephen R. Covey , author.",
        description: "Book - 373 pages;",
        location: "Nova Schola Main Library"
      },

      {
        id: 10,
        title: "Dove to Fail",
        author: "Lim Billi , author.",
        description: "Book - 297 pages;",
        location: "Nova Schola Main Library"
      },

      {
        id: 11,
        title: "How to be you; Stop trying to be someone else and start living your life",
        author: "Jeffrey Marsh , author.",
        description: "Book - 190 pages;",
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
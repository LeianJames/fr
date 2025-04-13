// Variables to track pagination state
let currentPage = 1;
let itemsPerPage = 10; // Default items per page
let filteredBooks = [...books]; // Start with all books

// DOM elements
const bookResultsContainer = document.getElementById('bookResults');
const paginationContainer = document.getElementById('paginationControls');
const itemsPerPageSelect = document.getElementById('itemsPerPage');
const totalResultsElement = document.getElementById('totalResults');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const sortBySelect = document.getElementById('sortBy');
const adminControls = document.getElementById('adminControls');
const addBookBtn = document.getElementById('addBookBtn');
const addBookModal = document.getElementById('addBookModal');
const closeAddBookModal = document.getElementById('closeAddBookModal');
const addBookForm = document.getElementById('addBookForm');
const deleteBookModal = document.getElementById('deleteBookModal');
const closeDeleteBookModal = document.getElementById('closeDeleteBookModal');
const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
const availabilityPopup = document.getElementById('availabilityPopup');
const closeAvailabilityPopup = document.getElementById('closeAvailabilityPopup');

// Initialize with default settings
document.addEventListener('DOMContentLoaded', function() {
  // Set the default selected option for items per page
  itemsPerPageSelect.value = itemsPerPage;
  
  // Check user role and show/hide admin controls
  const userRole = localStorage.getItem('userRole');
  if (userRole === 'admin') {
    adminControls.style.display = 'block';
  }
  
  // Update total results count
  updateTotalResults();
  
  // Initial render
  renderBooks();
  renderPagination();
  
  // Add event listeners
  setupEventListeners();
});

function setupEventListeners() {
  // Items per page change
  itemsPerPageSelect.addEventListener('change', function() {
    itemsPerPage = parseInt(this.value);
    currentPage = 1; // Reset to first page when changing items per page
    renderBooks();
    renderPagination();
  });
  
  // Search button
  searchBtn.addEventListener('click', function() {
    handleSearch();
  });
  
  // Search on Enter key
  searchInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
      handleSearch();
    }
  });
  
  // Sort by change
  sortBySelect.addEventListener('change', function() {
    filteredBooks = sortBooks(filteredBooks, this.value);
    currentPage = 1;
    renderBooks();
    renderPagination();
  });
  
  // Add book button
  addBookBtn.addEventListener('click', function() {
    addBookModal.style.display = 'block';
  });
  
  // Close add book modal
  closeAddBookModal.addEventListener('click', function() {
    addBookModal.style.display = 'none';
  });
  
  // Add book form submission
  addBookForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleAddBook();
  });
  
  // Close delete book modal
  closeDeleteBookModal.addEventListener('click', function() {
    deleteBookModal.style.display = 'none';
  });
  
  // Cancel delete button
  cancelDeleteBtn.addEventListener('click', function() {
    deleteBookModal.style.display = 'none';
  });
  
  // Close availability popup
  closeAvailabilityPopup.addEventListener('click', function() {
    availabilityPopup.style.display = 'none';
  });
  
  // Close modals when clicking outside
  window.addEventListener('click', function(event) {
    if (event.target === addBookModal) {
      addBookModal.style.display = 'none';
    } else if (event.target === deleteBookModal) {
      deleteBookModal.style.display = 'none';
    } else if (event.target === availabilityPopup) {
      availabilityPopup.style.display = 'none';
    }
  });
}

// Function to handle search
function handleSearch() {
  const searchTerm = searchInput.value.trim();
  if (searchTerm.length > 0) {
    filteredBooks = searchBooks(searchTerm);
  } else {
    filteredBooks = [...books];
  }
  
  // Apply current sort
  filteredBooks = sortBooks(filteredBooks, sortBySelect.value);
  
  currentPage = 1;
  updateTotalResults();
  renderBooks();
  renderPagination();
}

// Function to handle adding a book
function handleAddBook() {
  const bookTitle = document.getElementById('bookTitle').value.trim();
  const bookAuthor = document.getElementById('bookAuthor').value.trim();
  const bookDescription = document.getElementById('bookDescription').value.trim();
  const bookLocation = document.getElementById('bookLocation').value.trim();
  
  if (bookTitle && bookAuthor && bookDescription && bookLocation) {
    const newBook = addBook({
      title: bookTitle,
      author: bookAuthor,
      description: bookDescription,
      location: bookLocation
    });
    
    // Reset form and close modal
    addBookForm.reset();
    addBookModal.style.display = 'none';
    
    // Update filtered books and display
    filteredBooks = [...books];
    filteredBooks = sortBooks(filteredBooks, sortBySelect.value);
    updateTotalResults();
    renderBooks();
    renderPagination();
    
    alert('Book added successfully!');
  } else {
    alert('Please fill in all fields.');
  }
}

// Function to show delete confirmation
function showDeleteConfirmation(book) {
  const deleteBookTitle = document.getElementById('deleteBookTitle');
  deleteBookTitle.textContent = book.title;
  
  // Set up delete button
  confirmDeleteBtn.onclick = function() {
    if (deleteBookById(book.id)) {
      // Update filtered books and display
      filteredBooks = filteredBooks.filter(b => b.id !== book.id);
      updateTotalResults();
      renderBooks();
      renderPagination();
      deleteBookModal.style.display = 'none';
      alert('Book deleted successfully!');
    } else {
      alert('Error deleting book.');
    }
  };
  
  deleteBookModal.style.display = 'block';
}

// Function to toggle book availability
function handleToggleAvailability(bookId) {
  const updatedBook = toggleBookAvailability(bookId);
  if (updatedBook) {
    // Update in filtered books
    const bookIndex = filteredBooks.findIndex(book => book.id === parseInt(bookId));
    if (bookIndex !== -1) {
      filteredBooks[bookIndex].available = updatedBook.available;
      renderBooks();
    }
  }
}

// Function to show availability popup
function showAvailabilityPopup(book) {
  const availabilityTitle = document.getElementById('availabilityTitle');
  const availabilityStatus = document.getElementById('availabilityStatus');
  const availabilityLocation = document.getElementById('availabilityLocation');
  const availabilityMessage = document.getElementById('availabilityMessage');
  
  availabilityTitle.textContent = book.title;
  availabilityStatus.innerHTML = `<strong>Status:</strong> <span class="status-badge ${book.available ? 'status-available' : 'status-unavailable'}">${book.available ? 'Available' : 'Not Available'}</span>`;
  availabilityLocation.innerHTML = `<strong>Location:</strong> ${book.location}`;
  
  if (book.available) {
    availabilityMessage.textContent = 'You can check out this book at the library desk.';
  } else {
    availabilityMessage.textContent = 'This book is currently checked out. Please check back later.';
  }
  
  availabilityPopup.style.display = 'block';
}

// Function to update total results count
function updateTotalResults() {
  totalResultsElement.textContent = filteredBooks.length;
}

// Function to display books based on current page and items per page
function renderBooks() {
  bookResultsContainer.innerHTML = '';
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, filteredBooks.length);
  
  if (filteredBooks.length === 0) {
    bookResultsContainer.innerHTML = '<div class="no-results">No books found. Try a different search term.</div>';
    return;
  }
  
  for (let i = startIndex; i < endIndex; i++) {
    const book = filteredBooks[i];
    const bookElement = document.createElement('div');
    bookElement.className = 'result-item';
    
    const userRole = localStorage.getItem('userRole');
    let actionsHtml = '';
    
    if (userRole === 'admin') {
      actionsHtml = `
        <button class="btn ${book.available ? 'btn-danger' : 'btn-success'}" 
                onclick="handleToggleAvailability(${book.id})">
          ${book.available ? 'Mark Unavailable' : 'Mark Available'}
        </button>
        <button class="btn btn-danger delete-button" onclick="showDeleteConfirmation(${JSON.stringify(book).replace(/"/g, '&quot;')})">
          Delete
        </button>
      `;
    } else {
      actionsHtml = `
        <button class="btn btn-primary" onclick="showAvailabilityPopup(${JSON.stringify(book).replace(/"/g, '&quot;')})">
          Check Availability
        </button>
      `;
    }
    
    bookElement.innerHTML = `
      <div class="result-number">${i + 1}</div>
      <div class="result-details">
        <h3 class="result-title">${book.title}</h3>
        <p class="result-author"><strong>Author:</strong> ${book.author}</p>
        <p class="result-description">${book.description}</p>
        <p><strong>Status:</strong> <span class="status-badge ${book.available ? 'status-available' : 'status-unavailable'}">${book.available ? 'Available' : 'Not Available'}</span></p>
        <div class="result-actions">
          ${actionsHtml}
        </div>
      </div>
    `;
    
    bookResultsContainer.appendChild(bookElement);
  }
}

// Function to render pagination controls
function renderPagination() {
  // Clear current pagination
  paginationContainer.innerHTML = '';
  
  // Calculate total pages
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  
  if (totalPages <= 0) {
    return;
  }
  
  // Add previous button if not on first page
  if (currentPage > 1) {
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '← Previous';
    prevButton.addEventListener('click', function() {
      currentPage--;
      renderBooks();
      renderPagination();
    });
    paginationContainer.appendChild(prevButton);
  }
  
  // Add page number buttons
  // For simplicity, show max 5 page numbers
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);
  
  // Adjust start page if we're near the end
  if (endPage - startPage + 1 < maxPagesToShow) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }
  
  for (let i = startPage; i <= endPage; i++) {
    const pageButton = document.createElement('button');
    pageButton.innerHTML = i;
    
    if (i === currentPage) {
      pageButton.className = 'active';
    }
    
    pageButton.addEventListener('click', function() {
      currentPage = i;
      renderBooks();
      renderPagination();
    });
    
    paginationContainer.appendChild(pageButton);
  }
  
  // Add next button if not on last page
  if (currentPage < totalPages) {
    const nextButton = document.createElement('button');
    nextButton.innerHTML = 'Next →';
    nextButton.addEventListener('click', function() {
      currentPage++;
      renderBooks();
      renderPagination();
    });
    paginationContainer.appendChild(nextButton);
  }
  
  // Add a simple text showing current range of items
  const startItem = filteredBooks.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0;
  const endItem = Math.min(currentPage * itemsPerPage, filteredBooks.length);
  
  const rangeInfo = document.createElement('span');
  rangeInfo.className = 'page-info';
  rangeInfo.innerHTML = `Showing ${startItem}-${endItem} of ${filteredBooks.length}`;
  paginationContainer.appendChild(rangeInfo);
}
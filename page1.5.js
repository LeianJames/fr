document.addEventListener('DOMContentLoaded', function() {
    // Check if user is logged in
    const userRole = localStorage.getItem('userRole');
    if (!userRole) {
        window.location.href = 'page1.html';
        return;
    }

    // Show manage accounts button for admin users
    if (userRole === 'admin') {
        const navDiv = document.querySelector('.navbar .container div');
        const manageAccountsBtn = document.createElement('button');
        manageAccountsBtn.type = 'button';
        manageAccountsBtn.className = 'btn btn-outline-primary me-2';
        manageAccountsBtn.id = 'manageAccountsBtn';
        manageAccountsBtn.textContent = 'Manage Accounts';
        manageAccountsBtn.style.display = 'inline-block';
        navDiv.prepend(manageAccountsBtn);
    }

    // Add smooth scrolling for sidebar links if they exist
    document.querySelectorAll('.sidebar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Load and display books
    loadBooks();
});

function loadBooks() {
    // Sample books from the Filipiniana collection
    const filipinianaBooks = [
        {
            id: 1,
            title: "Perception of five selected companies in Tanauan City that uses accounting system",
            author: "Banilla et al.",
            category: "Filipiniana",
            is_available: true
        },
        {
            id: 2,
            title: "Ebalwasyon sa bidyo kagamitan sa pagpapataas ng pang unawa sa el filibusterismo",
            author: "Lalaine Unico Tercero",
            category: "Filipiniana",
            is_available: true
        },
        {
            id: 3,
            title: "Comparative analysis of the interpersonal and intrapersonal intelligence of grade 12 students",
            author: "Biescas et al.",
            category: "Filipiniana",
            is_available: false
        }
    ];

    // Sample books from the Self-Growth collection
    const selfGrowthBooks = [
        {
            id: 4,
            title: "Decide Where you want to be in 10 minutes, 10 months, 10 years",
            author: "Jack Welch",
            category: "Self Growth",
            is_available: true
        },
        {
            id: 5,
            title: "The Power of Focus",
            author: "Canfield, Jack et al.",
            category: "Self Growth",
            is_available: true
        },
        {
            id: 6,
            title: "First Things First",
            author: "Stephen R. Covey",
            category: "Self Growth",
            is_available: false
        }
    ];

    // Combine all books
    const allBooks = [...filipinianaBooks, ...selfGrowthBooks];
    
    // Display books
    displayBooks(allBooks);
}

function displayBooks(books) {
    const container = document.getElementById('books-container');
    container.innerHTML = '';
    
    // Group books by category
    const booksByCategory = {};
    books.forEach(book => {
        if (!booksByCategory[book.category]) {
            booksByCategory[book.category] = [];
        }
        booksByCategory[book.category].push(book);
    });

    // Create sections for each category
    Object.entries(booksByCategory).forEach(([category, categoryBooks]) => {
        const categorySection = document.createElement('div');
        categorySection.className = 'book-category';
        categorySection.id = category.toLowerCase().replace(/\s+/g, '-');
        
        categorySection.innerHTML = `
            <h2 class="category-title">${category}</h2>
            <div class="row" id="books-${category.replace(/\s+/g, '-')}"></div>
        `;
        container.appendChild(categorySection);

        const booksContainer = document.getElementById(`books-${category.replace(/\s+/g, '-')}`);
        categoryBooks.forEach(book => {
            const bookCard = document.createElement('div');
            bookCard.className = 'col-md-4 mb-4';
            bookCard.innerHTML = `
                <div class="card book-card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${book.title}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${book.author}</h6>
                        <p class="card-text">
                            <span class="badge ${book.is_available ? 'bg-success' : 'bg-danger'}">
                                ${book.is_available ? 'Available' : 'Not Available'}
                            </span>
                        </p>
                        <p class="card-text">
                            <small class="text-muted">Location: Nova Schola Main Library</small>
                        </p>
                        ${localStorage.getItem('userRole') === 'admin' ? `
                            <div class="admin-controls">
                                <button class="btn btn-warning btn-sm" onclick="toggleAvailability(${book.id}, ${!book.is_available})">
                                    ${book.is_available ? 'Mark as Unavailable' : 'Mark as Available'}
                                </button>
                                <button class="btn btn-danger btn-sm" onclick="deleteBook(${book.id})">Delete</button>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
            booksContainer.appendChild(bookCard);
        });

        // View all button at the end of each category
        const viewAllButton = document.createElement('div');
        viewAllButton.className = 'col-12 text-center mt-2 mb-4';
        viewAllButton.innerHTML = `
            <a href="${category.toLowerCase().replace(/\s+/g, '-')}.html" class="btn btn-outline-primary">
                View all ${category} books
            </a>
        `;
        booksContainer.appendChild(viewAllButton);

        // Add "Add Book" form for admins at the end of each category
        if (localStorage.getItem('userRole') === 'admin') {
            const addBookForm = document.createElement('div');
            addBookForm.className = 'add-book-form';
            addBookForm.innerHTML = `
                <button class="btn btn-primary" onclick="showAddBookForm('${category}')">Add New Book to ${category}</button>
                <div id="addBookForm-${category.replace(/\s+/g, '-')}" style="display: none;" class="mt-3">
                    <form onsubmit="addBook(event, '${category}')">
                        <div class="mb-3">
                            <input type="text" class="form-control" id="bookTitle-${category.replace(/\s+/g, '-')}" placeholder="Book Title" required>
                        </div>
                        <div class="mb-3">
                            <input type="text" class="form-control" id="bookAuthor-${category.replace(/\s+/g, '-')}" placeholder="Author" required>
                        </div>
                        <button type="submit" class="btn btn-success">Add Book</button>
                    </form>
                </div>
            `;
            categorySection.appendChild(addBookForm);
        }
    });
}

function showAddBookForm(category) {
    document.getElementById(`addBookForm-${category.replace(/\s+/g, '-')}`).style.display = 'block';
}

function addBook(event, category) {
    event.preventDefault();
    
    const title = document.getElementById(`bookTitle-${category.replace(/\s+/g, '-')}`).value;
    const author = document.getElementById(`bookAuthor-${category.replace(/\s+/g, '-')}`).value;

    alert(`Book "${title}" by ${author} added to ${category} category!`);

    // Clear form and hide it
    document.getElementById(`addBookForm-${category.replace(/\s+/g, '-')}`).style.display = 'none';
    document.getElementById(`bookTitle-${category.replace(/\s+/g, '-')}`).value = '';
    document.getElementById(`bookAuthor-${category.replace(/\s+/g, '-')}`).value = '';

    // In a real app, you would send this to the server
    // For now, just reload to show a simple refresh
    loadBooks();
}

function toggleAvailability(bookId, isAvailable) {
    alert(`Book availability updated!`);
    // In a real app, you would update the server
    // For now, just reload the books
    loadBooks();
}

function deleteBook(bookId) {
    if (!confirm('Are you sure you want to delete this book?')) {
        return;
    }

    alert('Book deleted successfully!');
    // In a real app, you would delete from the server
    // For now, just reload the books
    loadBooks();
}

// Add logout function
function logout() {
    // Clear user session data
    localStorage.removeItem('userRole');
    localStorage.removeItem('username');
    
    // Redirect to login page
    window.location.href = 'page1.html';
}
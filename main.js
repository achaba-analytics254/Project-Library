// Project Library
// create DOM elements
const modal = document.getElementById("modalContainer");
const addNewBtn = document.getElementById("newBook");
const cancelBtn = document.getElementById("cancelBtn");
const form = document.querySelector("form");
const tbody = document.getElementById("libraryBody");

// Library
const myLibrary = [];

// Book class
class Book {
  constructor(id, author, title, pages, status) {
    this.id = id;
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.status = status;
  }
}

// add new book to the library
addNewBtn.addEventListener("click", () => {
  form.reset();
  
  document.querySelectorAll('.form-group').forEach(formgroup => {
    formgroup.classList.remove('error', 'success');
  });
  document.querySelectorAll('.error-message').forEach(message => {
    message.textContent = '';
    message.style.display = 'none';
    message.classList.remove('error', 'success');
  });
  
  delete modal.dataset.editingId;
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
  
  const h4 = document.querySelector(".form-header h4");
  const p = document.querySelector(".form-header p");
  
  if (h4) h4.textContent = "Library Form";
  if (p) p.textContent = "Please fill this form to add a new book to the Library.";
});

// form validation
function validateForm() {
  let isValid = true;

  // Clear previous validation states
  document.querySelectorAll('.form-group').forEach(formgroup => {
    formgroup.classList.remove('error', 'success');
  });

  document.querySelectorAll('.error-message').forEach(message => {
    message.textContent = '';
    message.style.display = 'none';
    message.classList.remove('error', 'success');
  });

  // Validate Book Author
  const authorInput = document.getElementById("bookAuthor");
  if (!authorInput.value.trim()) {
    showError("bookAuthor", "Book Author cannot be blank");
    isValid = false;
  } else {
    showSuccess("bookAuthor", "Looks great!");
  }

  // Validate Book Title
  const titleInput = document.getElementById("bookTitle");
  if (!titleInput.value.trim()) {
    showError("bookTitle", "Book Title cannot be blank");
    isValid = false;
  } else {
    showSuccess("bookTitle", "Awesome title!");
  }

  // Validate Book Pages
  const bookPages = document.getElementById("bookPages");
  if (!bookPages.value.trim()) {
    showError("bookPages", "Book Pages cannot be blank");
    isValid = false;
  } else if (isNaN(bookPages.value) || parseInt(bookPages.value) <= 0) {
    showError("bookPages", "Please enter a valid number of pages");
    isValid = false;
  } else {
    showSuccess("bookPages", "Looks great!");
  }

  // Validate Book Status
  const bookStatus = document.getElementById("bookStatus");
  if (!bookStatus.value) {
    showError("bookStatus", "Please select a book status");
    isValid = false;
  } else {
    showSuccess("bookStatus", "Looks great!");
  }

  return isValid;
}

function showError(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  
  const formGroup = field.closest('.form-group');
  const errorElement = document.getElementById(`${fieldId}-error`);
  
  if (formGroup) {
    formGroup.classList.remove('success');
    formGroup.classList.add('error');
  }

  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    errorElement.classList.remove('success');
    errorElement.classList.add('error');
  }
}

function showSuccess(fieldId, message) {
  const field = document.getElementById(fieldId);
  if (!field) return;
  
  const formGroup = field.closest('.form-group');
  const errorElement = document.getElementById(`${fieldId}-error`);
  
  if (formGroup) {
    formGroup.classList.remove('error');
    formGroup.classList.add('success');
  }

  if (errorElement) {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    errorElement.classList.remove('error');
    errorElement.classList.add('success');
  }
}

// Set up real-time validation
function setupRealTimeValidation() {
  const authorInput = document.getElementById("bookAuthor");
  authorInput.addEventListener("input", () => {
    if (!authorInput.value.trim()) {
      showError("bookAuthor", "Book Author cannot be blank");
    } else {
      showSuccess("bookAuthor", "Looks good!");
    }
  });

  const titleInput = document.getElementById("bookTitle");
  titleInput.addEventListener("input", () => {
    if (!titleInput.value.trim()) {
      showError("bookTitle", "Book Title cannot be blank");
    } else {
      showSuccess("bookTitle", "Looks great!");
    }
  });

  const bookPages = document.getElementById("bookPages");
  bookPages.addEventListener("input", () => {
    if (!bookPages.value.trim()) {
      showError("bookPages", "Book Pages cannot be blank");
    } else if (isNaN(bookPages.value) || parseInt(bookPages.value) <= 0) {
      showError("bookPages", "Please enter a valid number of pages");
    } else {
      showSuccess("bookPages", "Looks great!");
    }
  });

  const bookStatus = document.getElementById("bookStatus");
  bookStatus.addEventListener("change", () => {
    if (!bookStatus.value) {
      showError("bookStatus", "Please select a book status");
    } else {
      showSuccess("bookStatus", "Looks great!");
    }
  });
}

// Run when page loads
document.addEventListener('DOMContentLoaded', setupRealTimeValidation);

// form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const author = document.getElementById("bookAuthor").value.trim();
  const title = document.getElementById("bookTitle").value.trim();
  const pages = document.getElementById("bookPages").value.trim();
  const status = document.getElementById("bookStatus").value;

  const editingId = modal.dataset.editingId;

  if (editingId) {
    // Editing existing book records
    const book = myLibrary.find((book) => book.id === editingId);
    
    if (book) {
      book.author = author;
      book.title = title;
      book.pages = pages;
      book.status = status;
    }

    delete modal.dataset.editingId;
    
    const h4 = document.querySelector(".form-header h4");
    const p = document.querySelector(".form-header p");
    if (h4) h4.textContent = "Library Form";
    if (p) p.textContent = "Please fill this form to add a new book to the Library.";
    
  } else {
    // Add a new book
    const id = crypto.randomUUID();
    const newBook = new Book(id, author, title, pages, status);
    myLibrary.push(newBook);
  }
  
  renderLibraryTable();
  form.reset();
  modal.classList.remove("show");
  document.body.style.overflow = "";
});

// Function to render the table
function renderLibraryTable() {
  tbody.innerHTML = '';
  
  myLibrary.forEach(book => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${book.id}</td>
      <td>${book.author}</td>
      <td>${book.title}</td>
      <td>${book.pages}</td>
      <td>
        <select class="status-select" data-id="${book.id}">
          <option value="Read" ${book.status === "Read" ? "selected" : ""}>Read</option>
          <option value="Unread" ${book.status === "Unread" ? "selected" : ""}>Unread</option>
          <option value="Wish List" ${book.status === "Wish List" ? "selected" : ""}>Wishlist</option>
        </select>
      </td>
      <td class="action-btn">
        <button class="edit-btn" data-id="${book.id}">Edit</button>
        <button class="delete-btn" data-id="${book.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
  
  // Add event listeners to status selects
  document.querySelectorAll('.status-select').forEach(select => {
    select.addEventListener('change', function() {
      const bookId = this.dataset.id;
      const book = myLibrary.find(b => b.id === bookId);
      if (book) {
        book.status = this.value;
      }
    });
  });
}

// Handle edit and delete
document.addEventListener("click", function (event) {
  // Delete button
  if (event.target.classList.contains("delete-btn")) {
    const bookId = event.target.dataset.id;
    const bookIndex = myLibrary.findIndex(book => book.id === bookId);
    
    if (bookIndex !== -1) {
      myLibrary.splice(bookIndex, 1);
      renderLibraryTable();
    }
  }
  
  // Edit button
  if (event.target.classList.contains("edit-btn")) {
    const bookId = event.target.dataset.id;
    const book = myLibrary.find((book) => book.id === bookId);
    
    if (!book) return;

    // Fill form
    document.getElementById("bookAuthor").value = book.author;
    document.getElementById("bookTitle").value = book.title;
    document.getElementById("bookPages").value = book.pages;
    document.getElementById("bookStatus").value = book.status;

    // Clear validation styling
    document.querySelectorAll('.form-group').forEach(formgroup => {
      formgroup.classList.remove('error', 'success');
    });
    document.querySelectorAll('.error-message').forEach(message => {
      message.textContent = '';
      message.style.display = 'none';
      message.classList.remove('error', 'success');
    });

    // Mark editing mode
    modal.dataset.editingId = bookId;
    
    const h4 = document.querySelector(".form-header h4");
    const p = document.querySelector(".form-header p");
    if (h4) h4.textContent = "Edit Book Details";
    if (p) p.textContent = "Please submit upon completion.";

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }
});

// cancel Button
cancelBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  document.body.style.overflow = "";
  delete modal.dataset.editingId;
  
  const h4 = document.querySelector(".form-header h4");
  const p = document.querySelector(".form-header p");
  if (h4) h4.textContent = "Library Form";
  if (p) p.textContent = "Please fill this form to add a new book to the Library.";
});

// ===================== The End =======================
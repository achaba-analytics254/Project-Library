// Project Library
//DOM elements
const modal = document.getElementById("modalContainer");
const editBtn = document.getElementById("edit");
const deleteBtn = document.getElementById("delete");
const addNewBtn = document.getElementById("newBook");
const submitBtn = document.getElementById("submitBtn");
const cancelBtn = document.getElementById("cancelBtn");
const form = document.querySelector("form");
const tbody = document.getElementById("libraryBody");

// Library
const myLibrary = [];

// add new book to the library
addNewBtn.addEventListener("click", () => {
  form.reset();
  delete modal.dataset.editingId; // make sure we are NOT editing
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
});

// form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const author = document.getElementById("book_author").value.trim();
  const title = document.getElementById("book_title").value.trim();
  const pages = document.getElementById("book_pages").value.trim();
  const status = document.getElementById("read_book").value;

  // return Error for empty fields
  if (!author || !title || !pages || !status) {
    alert("Please fill all fields");
    return;
  }

  const editingId = modal.dataset.editingId;

  if (editingId) {
    // Editing existing book records
    const book = myLibrary.find(b => b.id === editingId);
    const row = [...tbody.rows].find(
      r => r.children[0].textContent === editingId
    );

    if (book && row) {
      book.author = author;
      book.title = title;
      book.pages = pages;
      book.status = status;

      row.children[1].textContent = author;
      row.children[2].textContent = title;
      row.children[3].textContent = pages;
      row.children[4].textContent = status;
    }

    delete modal.dataset.editingId;

  } else {
    // add a new row
    const id = crypto.randomUUID();
    const newBook = new Book(id, author, title, pages, status);

    myLibrary.push(newBook);
    addBookToLibrary(newBook);
  }

  form.reset();
  modal.classList.remove("show");
  document.body.style.overflow = "";
});

// delete row
document.addEventListener("click", function (e) {
  if (e.target.classList.contains("delete-btn")) {
    const row = e.target.closest("tr");
    row.remove();
  }
});

// create a contructor
function Book(id, author, title, pages, status) {
  this.id = id;
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.status = status;
}

// function to fill the table
function addBookToLibrary(book) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${book.id}</td>
    <td>${book.author}</td>
    <td>${book.title}</td>
    <td>${book.pages}</td>
        <td>
      <select class="status-select">
        <option value="Read" ${book.status === "Read" ? "selected" : ""}>Read</option>
        <option value="Unread" ${book.status === "Unread" ? "selected" : ""}>Unread</option>
        <option value="Wish List" ${book.status === "Wish List" ? "selected" : ""}>Wishlist</option>
      </select>
    </td>
    <td class="action-btn">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </td>
    `;
    tbody.appendChild(row);
}

// Edit the Form
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit-btn")) {
    const row = e.target.closest("tr");
    const id = row.children[0].textContent;

    const book = myLibrary.find(b => b.id === id);
    if (!book) return;

    // Fill form
    document.getElementById("book_author").value = book.author;
    document.getElementById("book_title").value = book.title;
    document.getElementById("book_pages").value = book.pages;
    document.getElementById("read_book").value = book.status;

    // Mark editing mode
    modal.dataset.editingId = id;

    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }
});

// cancel Button
cancelBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  document.body.style.overflow = "";
  delete modal.dataset.editingId;
});

// ===================== The End =======================

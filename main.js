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
  modal.classList.add("show");
  document.body.style.overflow = "hidden";
  document.getElementById("book_author").focus();
});

// form submit button
submitBtn.addEventListener("click", (e) => {
  e.preventDefault();

  // get constructors
  const author = document.getElementById("book_author").value.trim();
  const title = document.getElementById("book_title").value.trim();
  const pages = document.getElementById("book_pages").value.trim();
  const status = document.getElementById("read_book").value.trim();

  if (!author || !title || !pages || !status) {
    alert("Please fill all the fields");
    return;
  }

  // Assign all book objects a unique id
  const id = crypto.randomUUID();

  const newBook = new Book(id, author, title, pages, status);
  myLibrary.push(newBook);

  addBookToLibrary(newBook);

  // reset form
  form.reset();
  modal.classList.remove("show");
  document.style.overflow = "";
});

// cancel form button
cancelBtn.addEventListener("click", () => {
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
    <td>${book.status}</td>
    <td class="action-btn">
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </td>
    `;
    tbody.appendChild(row);
}

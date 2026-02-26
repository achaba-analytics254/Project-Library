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
  const status = document.getElementById("read_book").value;

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
  document.body.style.overflow = "";
});

// cancel form button
cancelBtn.addEventListener("click", () => {
  modal.classList.remove("show");
  document.body.style.overflow = "";
});
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const author = document.getElementById("book_author").value.trim();
  const title = document.getElementById("book_title").value.trim();
  const pages = document.getElementById("book_pages").value.trim();
  const status = document.getElementById("read_book").value;

  if (!author || !title || !pages || !status) {
    alert("Please fill all fields");
    return;
  }

  const editingId = modal.dataset.editingId;

  if (editingId) {

    // Edit an existing book
    const row = [...tbody.rows].find(r => r.children[0].textContent === editingId);
    if (row) {
      row.children[1].textContent = author;
      row.children[2].textContent = title;
      row.children[3].textContent = pages;
      row.children[4].textContent = status;
    }

    // update myLibrary array
    const book = myLibrary.find(b => b.id === editingId);
    if (book) {
      book.author = author;
      book.title = title;
      book.pages = pages;
      book.status = status;
    }

    // Clear editing state
    delete modal.dataset.editingId;
  } else {
    // Adding new book
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
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')){
    const row = e.target.closest('tr');
    const h4 = document.querySelector('h4');
    h4.textContent = 'Edit Form';
    const p = document.querySelector('p');
    p.textContent = '';

    // get current row values
    const id = row.children[0].textContent;
    const author = row.children[1].textContent;
    const title = row.children[2].textContent;
    const pages = row.children[3].textContent;
    const status = row.children[4].textContent;

    // Fill the modal form
    document.getElementById("book_author").value = author;
    document.getElementById("book_title").value = title;
    document.getElementById("book_pages").value = pages;
    document.getElementById("read_book").value = status;

    // maintain row ID value
     modal.dataset.editingId = id;

     //show modal
    modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }
})

// ===================== The End =======================

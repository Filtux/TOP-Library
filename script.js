document.addEventListener('DOMContentLoaded', function () {
    let myLibrary = [];

    function Book(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead;
    }

    Book.prototype.toggleRead = function() {
        this.isRead = this.isRead === 'yes' ? 'no' : 'yes';
    }

    function addBookToLibrary(title, author, pages, isRead) {
        let newBook = new Book(title, author, pages, isRead);
        myLibrary.push(newBook);
        displayBooks();
    }

    function displayBooks() {
        let libraryContainer = document.querySelector('.library-container');
        libraryContainer.innerHTML = '';

        myLibrary.forEach((book, index) => {
            let bookCard = document.createElement('div');
            bookCard.classList.add('book-card');

            let titleElement = document.createElement('h3');
            titleElement.classList.add('book-title');
            titleElement.textContent = book.title;
            bookCard.appendChild(titleElement);

            let authorElement = document.createElement('p');
            authorElement.classList.add('book-author');
            authorElement.textContent = book.author;
            bookCard.appendChild(authorElement);

            let pagesElement = document.createElement('p');
            pagesElement.classList.add('book-pages');
            pagesElement.textContent = `${book.pages} pages`;
            bookCard.appendChild(pagesElement);

            let isReadElement = document.createElement('p');
            isReadElement.classList.add('book-isRead');
            isReadElement.textContent = book.isRead === 'yes' ? 'Read' : 'Not Read';
            bookCard.appendChild(isReadElement);

            let toggleReadButton = document.createElement('button');
            toggleReadButton.classList.add('button-toggle-read');
            toggleReadButton.textContent = 'Toggle Read Status';
            toggleReadButton.addEventListener("click", () => {
                book.toggleRead();
                displayBooks();
            });
            bookCard.appendChild(toggleReadButton)

            let removeBookButton = document.createElement('button');
            removeBookButton.classList.add('book-remove-button');
            removeBookButton.textContent = 'Remove';

            removeBookButton.addEventListener('click', () => {
                myLibrary.splice(index, 1);
                displayBooks();
            });

            bookCard.appendChild(removeBookButton);

            libraryContainer.appendChild(bookCard);
        });
    }

    // Add some initial books to the library
    addBookToLibrary("TestTitle", "TestAuthor", 371, "no");
    addBookToLibrary("TestTitle2", "TestAuthor2", 468, "yes");
    addBookToLibrary("TestTitle3", "TestAuthor3", 207, "no");
    addBookToLibrary("TestTitle4", "TestAuthor4", 344, "no");
    addBookToLibrary("TestTitle5", "TestAuthor5", 422, "yes");

    console.table(myLibrary);
    displayBooks();

    // Modal Management
    let modal = document.querySelector(".modal");
    let btn = document.querySelector(".button-add-book");
    let span = document.querySelector(".close");

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Form Submission
    let form = document.querySelector(".book-form");
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        let title = document.querySelector('input[name=title]').value;
        let author = document.querySelector('input[name=author]').value;
        let pages = document.querySelector('input[name=pages]').value;
        let isRead = document.querySelector('select[name=readStatus]').value;

        addBookToLibrary(title, author, pages, isRead);
        form.reset();
        modal.style.display = "none";
    });
});

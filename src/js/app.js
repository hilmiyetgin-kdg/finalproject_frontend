document.addEventListener("DOMContentLoaded", function () {
    const bookList = document.getElementById("bookList");
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const addBookButton = document.getElementById("addBook");

    const apiUrl = "http://localhost:8080/books";

    async function fetchBooks() {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            bookList.innerHTML = "";
            data.forEach(book => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>
                        <button class="btn btn-danger btn-sm" onclick="deleteBook(${book.id})">Delete</button>
                    </td>
                `;
                bookList.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    }

    async function addBook() {
        const title = titleInput.value;
        const author = authorInput.value;

        try {
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title, author }),
            });
            await response.json();
            titleInput.value = "";
            authorInput.value = "";
            await fetchBooks();
        } catch (error) {
            console.error('Error adding book:', error);
        }
    }

    window.deleteBook = async function (id) {
        try {
            await fetch(`${apiUrl}/${id}`, {
                method: "DELETE",
            });
            await fetchBooks();
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    addBookButton.addEventListener("click", addBook);

    fetchBooks();
});

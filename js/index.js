
document.addEventListener("DOMContentLoaded", () => {

    loadFile();
});


function loadFile() {
    fetch('http://localhost:3000/books')
  .then((response) => {
    return response.json();
  })
  .then((myJson) => {
    console.log(myJson);
    displayBooks(myJson)
  });

}

function displayBooks(books) {
    const book_list = document.getElementById("list");
    books.forEach(book => {
        const li = document.createElement("li");
        li.innerText = book.title;
        li.addEventListener("click", () => showBook(book));
        book_list.appendChild(li);
        
    });


}

function showBook(book) {
    console.log(book);
    const show_panel = document.getElementById("show-panel");
    show_panel.innerHTML = "";
    const thumbnail = document.createElement("img");
    thumbnail.src = book.img_url;

    const description = document.createElement("p");
    description.innerText = book.description;

    show_panel.appendChild(thumbnail);
    show_panel.appendChild(description);

    const user_list = book.users
    user_list.forEach(user => {
        const li = document.createElement("li");
        li.innerText = user.username;

        show_panel.appendChild(li);
    });

    const like_button = document.createElement("button");
    like_button.innerText = "Like";
    like_button.addEventListener("click", () => likeBook(book));
    show_panel.appendChild(like_button);

}


function likeBook(book) {
    console.log("LIKED book");
    let users = book.users;
    if(users.find(user => user.id === 1)) {
        console.log("User already liked it");
        users.pop();
    } else {
        users.push({"id":1, "username":"pouros"})
    }
    book.users = users;
    console.log(book.users);
    fetch(`http://localhost:3000/books/${book.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({ users: book.users })
      })
        .then(res => res.json())
        .then(updatedBook => showBook(updatedBook))
        .catch(err => console.log(err));
}



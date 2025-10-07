// so much empty
const postForm = document.getElementById('postForm');
const formTitle = document.getElementById('titleInput');
const formBody = document.getElementById('bodyInput');
const formError = document.getElementById('formError');
const formSuccess = document.getElementById('formSuccess');

const postList = document.getElementById('postList');
const error = document.getElementById('formError');
const fetchButton = document.getElementById('fetchButton');

postForm.addEventListener("submit", (event) =>{

    fetch("https://jsonplaceholder.typicode.com/posts",
    {
        method: "POST",
        body: JSON.stringify({
            title: formTitle.value,
            body: formBody.value,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((response) => response.json())
    .then((json) => { console.log(json)
        formSuccess.textContent = `Success ${json.id}: ${json.title} - ${json.body}`;
    })
    .catch(error => formError.textContent = "Error: " + error);

    event.preventDefault();
    postForm.reset();
    
});

fetchButton.addEventListener("click", () => { fetchPosts() });

document

async function fetchPosts() {
    postList.textContent = "Loading posts...";
        
    fetch("https://jsonplaceholder.typicode.com/posts")
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            console.log(json);
            let result = "<br>";
            for (const post of json) {
                result += `<h2>${post.title}</h2>
                <p>${post.body}<p>`;
            }
            postList.innerHTML = result;
        })
        .catch(function (error) {
            console.error("error fetching data:", error);
            error.textContent = "error fetching data:" + error;
        });
}
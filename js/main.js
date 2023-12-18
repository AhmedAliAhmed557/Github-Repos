let userForm = document.getElementById("form")
let userInput = document.getElementById("username")
let serchTerm = document.querySelector("#serch-term")
let languages = document.querySelector(".languages")
let reposEl = document.querySelector(".repos")


userForm.addEventListener("submit", formSubmitHandler)
languages.addEventListener("click", handleClick)


function handleClick(e) {
    let lang = e.target.getAttribute("data-lang")
    if (lang) {
    reposEl.innerHTML = ""
    getUserLangRepos(lang)
    }
}

function getUserLangRepos(lang) {
    let apiUrl = `https://api.github.com/search/repositories?q=${lang}`
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => displayRepos(data.items, lang))
        .catch(err => alert("Something went wrong!"))
}

function formSubmitHandler(e) {
    e.preventDefault()
    let user = userInput.value.trim()
    if (user) {
        reposEl.innerHTML = ""
        getUserRepository(user)
    } else {
        alert("Please Enter a username")
    }
    userInput.value = ""
}

function getUserRepository(user) {
    let apiUrl = `https://api.github.com/users/${user}/repos`
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => displayRepos(data, user))
    .catch(err => alert("Please Enter a valid username"))
}

function displayRepos(repos, serchRepo) {
    if (repos.length === 0) {
        serchTerm.innerHTML = ""
        reposEl.innerHTML = "<h3 class='no-repos'>No Repos to display !...</h3>"
        return;
    }

    serchTerm.innerHTML = serchRepo
    repos.forEach(repo => {
        let name = `./repo.html?repo=${repo.owner.login}/${repo.name}`
        reposEl.innerHTML += `
            <a href=${name} class="repo-item">
        <span id="repo-name">${repo.owner.login}/${repo.name}</span>
        <span>${repo.open_issues_count > 0 ? `<i class="fas fa-times"></i>` : `<i class="fas fa-check-square"></i>`}</span>
        </a>
        `
    })
}
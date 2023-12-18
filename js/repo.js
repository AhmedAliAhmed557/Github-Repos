let reposEl = document.querySelector(".repos")

function getRepoName() {
    let qurStr = document.location.search
    let repoName = qurStr.split("=")[1]
    if (repoName) {
        getIssues(repoName)
    }
}


function getIssues(repoName) {
    let apiUrl = `https://api.github.com/repos/${repoName}/issues`
    console.log(apiUrl)
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => displayIssues(data))
    .catch(err => alert("Something went wrong!"))
}



function displayIssues(issues) {
    if (issues.length === 0) {
        reposEl.innerHTML = "<h3 class='no-repos'>No Issues !...</h3>"
        return;
    }

    issues.forEach(issue => {
        reposEl.innerHTML += `
            <a href='${issue.html_url}' class="repo-item">
        <span id="repo-name">${issue.title}</span>
        </a>
        `
    })
}

getRepoName()
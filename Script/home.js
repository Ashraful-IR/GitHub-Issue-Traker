// const loadAllIssues = () => {
//     const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
//     fetch(url)
//         .then(res => res.json())
//         .then(data => displayAllIssues(data.data))
// }
// displayAllIssues = (issues) => {
//     const allIssuesContainer = document.getElementById("All-Issues");
//     issues.forEach(issue => {
//         const issueElement = document.createElement("div");
//         issueElement.classList.add("issue");
//         issueElement.innerHTML = `
//             <h3>${issue.title}</h3>
//             <p>${issue.description}</p>
//         `;
//         allIssuesContainer.appendChild(issueElement);
//     });
// }
// console.log("Hello World");
// loadAllIssues();
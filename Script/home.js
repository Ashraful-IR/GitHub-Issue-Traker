const allIssueCount = document.getElementById("issue-count");
const searchInput = document.getElementById("Search-Input");

const loadAllIssues = () => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayAllIssues(data.data));
};

displayAllIssues = (issues) => {
  const allIssuesContainer = document.getElementById("All-Issues");
  allIssuesContainer.innerHTML = "";
  issues.forEach((issue) => {
    const borderColor =
      issue.status === "open"
        ? "border-t-4 border-green-500"
        : "border-t-4 border-purple-500";
    const issueElement = document.createElement("div");
    issueElement.classList.add("issue");
    issueElement.innerHTML = `
            <div class="bg-white w-full rounded-lg p-5 gap-3 flex flex-col ${borderColor}">
            <div class="flex justify-between items-center">
            ${issue.status === "open" ? '<img src="../assets/Open-Status.png" alt="">' : ""}
            ${issue.status === "open" ? `<span class="text-[16px] text-[#fa0f36] font-medium bg-red-100 w-20 text-center rounded-full">${issue.priority}</span>` : ""}
            ${issue.status === "closed" ? '<img src="../assets/Status.png" alt="">' : ""}
            ${issue.status === "closed" ? `<span class="text-[16px] text-[#fa0f36] font-medium bg-red-100 w-20 text-center rounded-full">${issue.priority}</span>` : ""}
            </div>
            <div>
                <p class="text-[14px] font-semibold text-[#1f2937]">${issue.title}</p>
                <p class="text-[12px] text-[#64748b]">${issue.description}</p>
            </div>
            <div class="flex justify-start items-left gap-5">
                <div class="border border-[#fecaca] gap-2 w-40 bg-[#feecec] rounded-[100px] p-2" >
                    <p class="text-center text-[12px] font-bold text-[#ef4444]"><i class="fa-solid fa-bug"></i>${issue.labels[0]}</p>
                </div>
                <div class="border border-[#fde68a] gap-2 w-40 bg-[#fff8db] rounded-[100px] p-2" >
                    <p class="text-center text-[12px] font-bold text-[#d97706]">${issue.labels[1] === undefined ? " " : `<i class="fa-solid fa-hands-helping"></i> ${issue.labels[1]}`}</p>
                </div>
                
            </div>
            <!-- </div>
            <div class="w-full bg-black h-[1px]"></div> -->

            <div class=" border-t-1 border-gray-100 bg-slate-50 rounded-lg px-4 gap-5 w-full flex flex-col justify-start items-start py-5">
                <p class="text-[12px] text-[#64748b]">#${issue.id} by ${issue.author}</p>
                <p class="text-[12px] text-[#64748b]">${issue.createdAt}</p>
            </div>
        </div>
        `;
    allIssueCount.innerText =
      allIssuesContainer.children.length + 1 + " Issues";
    allIssuesContainer.appendChild(issueElement);
  });
};


searchInput.addEventListener("input", function (e) {
  const searchText = e.target.value.toLowerCase();

  const issues = document.querySelectorAll(".issue");

  issues.forEach((issue) => {
    const title = issue.querySelector("p").innerText.toLowerCase();

    if (title.includes(searchText)) {
      issue.style.display = "";
    } else {
      issue.style.display = "none";
    }
  });
});

const openIssues = document.getElementById("Open-Issues");
const openBtn = document.getElementById("open-btn");
const alIssues = document.getElementById("All-Issues");
const allBtn = document.getElementById("all-btn");
const closedBtn = document.getElementById("closed-btn");
const ClosedIssues = document.getElementById("Closed-Issues");

openBtn.addEventListener("click", () => {
  openIssues.classList.remove("hidden"); // Show open
  alIssues.classList.add("hidden");
  ClosedIssues.classList.add("hidden");

  console.log("Open button clicked");
});
closedBtn.addEventListener("click", () => {
  ClosedIssues.classList.remove("hidden");
  alIssues.classList.add("hidden");
  openIssues.classList.add("hidden");
  console.log("Closed button clicked");
});

allBtn.addEventListener("click", () => {
  alIssues.classList.remove("hidden");
  openIssues.classList.add("hidden"); // Show all
  ClosedIssues.classList.add("hidden");
  console.log("All button clicked");
});

loadAllIssues();

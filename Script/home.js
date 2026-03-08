const allIssueCount = document.getElementById("issue-count");
const searchInput = document.getElementById("Search-Input");
const openIssues = document.getElementById("Open-Issues");
const openBtn = document.getElementById("open-btn");
const alIssues = document.getElementById("All-Issues");
const allBtn = document.getElementById("all-btn");
const closedBtn = document.getElementById("closed-btn");
const ClosedIssues = document.getElementById("Closed-Issues");

const loadAllIssues = () => {
  displaySpinner(true);
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issues`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayAllIssues(data.data);
      displayOpenIssues(data.data);
      displayClosedIssues(data.data);
    });
};

const showIssuesDetails = (id) => {
  const url = `https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayModalDetails(data.data);
    });
};

const displaySpinner = (status) => {
  const spinner = document.getElementById("spinner");
  const alIssues = document.getElementById("All-Issues");
  const openIssues = document.getElementById("Open-Issues");
  const closedIssues = document.getElementById("Closed-Issues");
  if (status === true) {
    spinner.classList.remove("hidden");
    alIssues.classList.add("hidden");
    openIssues.classList.add("hidden");
    closedIssues.classList.add("hidden");
  } else {
    alIssues.classList.remove("hidden");
    spinner.classList.add("hidden");
    openIssues.classList.add("hidden");
    closedIssues.classList.add("hidden");
  }
};

displayModalDetails = (issues) => {
  document.getElementById("my_modal_5").showModal();
  const modalDetailsContainer = document.getElementById("details-container");
  modalDetailsContainer.innerHTML =` 

        <div>
          <p class="text-[24px] font-bold text-[#1f2937]">
            ${issues.title}
          </p>
        </div>

        <div class="flex justify-start items-left gap-5">
          <span class="text-[16px] text-[#fa0f36] font-medium bg-red-100 w-20 text-center rounded-full">${issues.status}</span>
          <p class="text-[12px] text-[#64748b]">Opened by ${issues.assignee}</p>
          <p class="text-[12px] text-[#64748b]">${new Date(issues.createdAt).toLocaleDateString()}</p>
        </div>

        <div class="flex justify-start items-left gap-5">
          <div class="border border-[#fecaca] gap-2 w-40 bg-[#feecec] rounded-[100px] p-2">
              <p class="text-center text-[12px] font-bold text-[#ef4444]"><i class="fa-solid fa-bug"></i>${issues.labels[0]}</p>
            </div>
            ${
              issues.labels[1]
                ? `<div class="border border-[#fde68a] gap-2 w-40 bg-[#fff8db] rounded-[100px] p-2">
                    <p class="text-center text-[12px] font-bold text-[#d97706]"><i class="fa-solid fa-hands-helping"></i> ${issues.labels[1]}</p>
                  </div>`
                : ""
            }
        </div>

        <div>
          <p class="text-[16px] text-[#64748b]">
            ${issues.description}
          </p>
        </div>

        <div class="flex justify-between items-center gap-5 bg-[#f8fafc] rounded-md w-full p-5">
              <div class="flex flex-col justify-between items-start gap-4">
                <p class="text-[16px] text-[#64748b]">Assignee</p>
                <p class="text-[16px] font-semibold text-[#030303]">${issues.assignee}</p>
              </div>

              <div class="flex flex-col justify-between items-start gap-4">
                <p class="text-[16px] text-[#64748b]">Priority</p>
                <span class="text-[16px] text-[#fa0f36] font-medium bg-red-100 w-20 text-center rounded-full">${issues.priority}</span>
              </div>
          
        </div>

  `;

  
  
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
            <div onclick="showIssuesDetails(${issue.id})" class="bg-white w-full rounded-lg p-5 gap-3 flex flex-col ${borderColor}">
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
            <div class="border border-[#fecaca] gap-2 w-40 bg-[#feecec] rounded-[100px] p-2">
              <p class="text-center text-[12px] font-bold text-[#ef4444]"><i class="fa-solid fa-bug"></i>${issue.labels[0]}</p>
            </div>
            ${
              issue.labels[1]
                ? `<div class="border border-[#fde68a] gap-2 w-40 bg-[#fff8db] rounded-[100px] p-2">
                    <p class="text-center text-[12px] font-bold text-[#d97706]"><i class="fa-solid fa-hands-helping"></i> ${issue.labels[1]}</p>
                  </div>`
                : ""
            }
          </div>
            <!-- </div>
            <div class="w-full bg-black h-[1px]"></div> -->

            <div class=" border-t-1 border-gray-100 bg-slate-50 rounded-lg px-4 gap-5 w-full flex flex-col justify-start items-start py-5">
                <p class="text-[12px] text-[#64748b]">#${issue.id} by ${issue.author}</p>
                <p class="text-[12px] text-[#64748b]">${new Date(issue.createdAt).toLocaleDateString()}</p>
            </div>
        </div>
        `;
    allIssueCount.innerText =
      allIssuesContainer.children.length + 1 + " Issues";
    allIssuesContainer.appendChild(issueElement);
  });
  displaySpinner(false);
};

displayOpenIssues = (issues) => {
  const openIssuesContainer = document.getElementById("Open-Issues");
  openIssuesContainer.innerHTML = ""; // clear previous cards

  issues.forEach((issue) => {
    // Trim spaces and convert to lowercase to avoid mismatches
    if (issue.status && issue.status.trim().toLowerCase() === "open") {
      const issueElement = document.createElement("div");
      issueElement.classList.add("issue");
      issueElement.innerHTML = `
        <div onclick="showIssuesDetails(${issue.id})" class="bg-white w-full rounded-lg p-5 gap-3 flex flex-col border-t-4 border-green-500">
          <div class="flex justify-between items-center">
            <img src="../assets/Open-Status.png" alt="">
            <span class="text-[16px] text-[#fa0f36] font-medium bg-red-100 w-20 text-center rounded-full">${issue.priority}</span>
          </div>
          <div>
            <p class="text-[14px] font-semibold text-[#1f2937]">${issue.title}</p>
            <p class="text-[12px] text-[#64748b]">${issue.description}</p>
          </div>
          <div class="flex justify-start items-left gap-5">
            <div class="border border-[#fecaca] gap-2 w-40 bg-[#feecec] rounded-[100px] p-2">
              <p class="text-center text-[12px] font-bold text-[#ef4444]"><i class="fa-solid fa-bug"></i>${issue.labels[0]}</p>
            </div>
            ${
              issue.labels[1]
                ? `<div class="border border-[#fde68a] gap-2 w-40 bg-[#fff8db] rounded-[100px] p-2">
                    <p class="text-center text-[12px] font-bold text-[#d97706]"><i class="fa-solid fa-hands-helping"></i> ${issue.labels[1]}</p>
                  </div>`
                : ""
            }
          </div>
          <div class="border-t-1 border-gray-100 bg-slate-50 rounded-lg px-4 gap-5 w-full flex flex-col justify-start items-start py-5">
            <p class="text-[12px] text-[#64748b]">#${issue.id} by ${issue.author}</p>
            <p class="text-[12px] text-[#64748b]">${new Date(issue.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      `;
      //   allIssueCount.innerText =
      //   openIssuesContainer.children.length + 1 + " Issues";
      openIssuesContainer.appendChild(issueElement);
    }
  });
  displaySpinner(false);

  //   openIssuesContainer.classList.remove("hidden");
};

displayClosedIssues = (issues) => {
  const closedIssuesContainer = document.getElementById("Closed-Issues");
  closedIssuesContainer.innerHTML = ""; // clear previous cards

  issues.forEach((issue) => {
    if (issue.status && issue.status.trim().toLowerCase() === "closed") {
      const issueElement = document.createElement("div");
      issueElement.classList.add("issue");
      issueElement.innerHTML = `
        <div onclick="showIssuesDetails(${issue.id})" class="bg-white w-full rounded-lg p-5 gap-3 flex flex-col border-t-4 border-purple-500">
          <div class="flex justify-between items-center">
            <img src="../assets/Status.png" alt="">
            <span class="text-[16px] text-[#fa0f36] font-medium bg-red-100 w-20 text-center rounded-full">${issue.priority}</span>
          </div>
          <div>
            <p class="text-[14px] font-semibold text-[#1f2937]">${issue.title}</p>
            <p class="text-[12px] text-[#64748b]">${issue.description}</p>
          </div>
          <div class="flex justify-start items-left gap-5">
            <div class="border border-[#fecaca] gap-2 w-40 bg-[#feecec] rounded-[100px] p-2">
              <p class="text-center text-[12px] font-bold text-[#ef4444]"><i class="fa-solid fa-bug"></i>${issue.labels[0]}</p>
            </div>
            ${
              issue.labels[1]
                ? `<div class="border border-[#fde68a] gap-2 w-40 bg-[#fff8db] rounded-[100px] p-2">
                    <p class="text-center text-[12px] font-bold text-[#d97706]"><i class="fa-solid fa-hands-helping"></i> ${issue.labels[1]}</p>
                  </div>`
                : ""
            }
          </div>
          <div class="border-t-1 border-gray-100 bg-slate-50 rounded-lg px-4 gap-5 w-full flex flex-col justify-start items-start py-5">
            <p class="text-[12px] text-[#64748b]">#${issue.id} by ${issue.author}</p>
            <p class="text-[12px] text-[#64748b]">${new Date(issue.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      `;
      closedIssuesContainer.appendChild(issueElement);
    }
  });
  displaySpinner(false);

  //   closedIssuesContainer.classList.remove("hidden");
};

const updateIssueCount = () => {
  const allIssuesContainer = document.getElementById("All-Issues");
  const openIssuesContainer = document.getElementById("Open-Issues");
  const closedIssuesContainer = document.getElementById("Closed-Issues");
  const allIssueCount = document.getElementById("issue-count");

  let visibleIssueCount = [];
  if (!allIssuesContainer.classList.contains("hidden")) {
    visibleIssueCount = [...allIssuesContainer.children].filter(
      (issue) => issue.offsetParent !== null,
    );
  } else if (!openIssuesContainer.classList.contains("hidden")) {
    visibleIssueCount = [...openIssuesContainer.children].filter(
      (issue) => issue.offsetParent !== null,
    );
  } else if (!closedIssuesContainer.classList.contains("hidden")) {
    visibleIssueCount = [...closedIssuesContainer.children].filter(
      (issue) => issue.offsetParent !== null,
    );
  }
  allIssueCount.innerText = visibleIssueCount.length + " Issues";
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
  updateIssueCount();
});

function setActiveButton(activeBtn, bgColor) {
  const allBtn = document.getElementById("all-btn");
  document.getElementById("all-btn").style.backgroundColor = "";
  document.getElementById("all-btn").style.color = "";
  document.getElementById("open-btn").style.backgroundColor = "";
  document.getElementById("open-btn").style.color = "";
  document.getElementById("closed-btn").style.backgroundColor = "";
  document.getElementById("closed-btn").style.color = "";
  activeBtn.style.backgroundColor = bgColor;
  activeBtn.style.color = "#fff";

  if (activeBtn !== allBtn) {
    allBtn.style.backgroundColor = "transparent";
    allBtn.style.color = "#000000";
    allBtn.style.border = "1px solid #d6d6d6";
  }
}
document.getElementById("all-btn").addEventListener("click", function () {
  setActiveButton(this, "#4F39F6");
});
document.getElementById("open-btn").addEventListener("click", function () {
  setActiveButton(this, "#00a96e");
});
document.getElementById("closed-btn").addEventListener("click", function () {
  setActiveButton(this, "#a855f7");
});
setActiveButton(document.getElementById("all-btn"), "#4F39F6");

openBtn.addEventListener("click", () => {
  openIssues.classList.remove("hidden");
  alIssues.classList.add("hidden");
  ClosedIssues.classList.add("hidden");
  console.log("Open button clicked");
  updateIssueCount();
});
closedBtn.addEventListener("click", () => {
  ClosedIssues.classList.remove("hidden");
  alIssues.classList.add("hidden");
  openIssues.classList.add("hidden");
  console.log("Closed button clicked");
  updateIssueCount();
});

allBtn.addEventListener("click", () => {
  alIssues.classList.remove("hidden");
  openIssues.classList.add("hidden");
  ClosedIssues.classList.add("hidden");
  console.log("All button clicked");
  updateIssueCount();
});

loadAllIssues();

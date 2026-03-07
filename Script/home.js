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
    const issueElement = document.createElement("div");
    issueElement.classList.add("issue");
    issueElement.innerHTML = `
            <div class="bg-white w-full rounded-lg p-5 gap-3 flex flex-col">
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
                <div class="border border-[#fecaca] gap-2 w-20 bg-[#feecec] rounded-[100px] p-2" >
                    <p class="text-center text-[12px] font-bold text-[#ef4444]"><i class="fa-solid fa-bug"></i>BUG</p>
                </div>
                <div class="border border-[#fde68a] gap-2 w-40 bg-[#fff8db] rounded-[100px] p-2" >
                    <p class="text-center text-[12px] font-bold text-[#d97706]"><i class="fa-solid fa-hands-helping"></i>HELP WANTED</p>
                </div>
                
            </div>
            <!-- </div>
            <div class="w-full bg-black h-[1px]"></div> -->

            <div class=" border-t-1 border-gray-100 gap-5 w-full flex flex-col justify-start items-start py-5">
                <p class="text-[12px] text-[#64748b]">#${issue.id} by ${issue.author}</p>
                <p class="text-[12px] text-[#64748b]">${issue.createdAt}</p>
            </div>
        </div>
        `;
    allIssueCount.innerText = allIssuesContainer.children.length +1 + " Issues";
    allIssuesContainer.appendChild(issueElement);
  });
};

const allIssueCount = document.getElementById("issue-count");

loadAllIssues();

// Selectors and Variables
const siteName = document.getElementById("bookmarkName");
const siteURL = document.getElementById("bookmarkURL");
const submitBtn = document.getElementById("submitBtn");
const tableContent = document.getElementById("tableContent");
const closeBtn = document.getElementById("closeBtn");
const boxModal = document.querySelector(".box-info");
let bookmarks = [];

// Load bookmarks from localStorage
if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  bookmarks.forEach((_, index) => displayBookmark(index));
}

// Display Bookmark and add event listeners
function displayBookmark(indexOfWebsite) {
  const { siteURL, siteName } = bookmarks[indexOfWebsite];
  const httpsRegex = /^https?:\/\//g;

  let validURL = siteURL;
  let fixedURL = httpsRegex.test(siteURL) 
    ? siteURL.replace(httpsRegex, "")
    : siteURL;

  if (!httpsRegex.test(siteURL)) {
    validURL = `https://${siteURL}`;
  }

  const newBookmark = `
    <tr>
      <td>${indexOfWebsite + 1}</td>
      <td>${siteName}</td>              
      <td>
        <button class="btn btn-visit" data-index="${indexOfWebsite}">
          <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
      </td>
      <td>
        <button class="btn btn-delete pe-2" data-index="${indexOfWebsite}">
          <i class="fa-solid fa-trash-can"></i>Delete
        </button>
      </td>
    </tr>
  `;

  tableContent.innerHTML += newBookmark;

  // Add Click Event to the Delete button
  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", deleteBookmark);
  });

  // Add Click Event to the Visit button
  document.querySelectorAll(".btn-visit").forEach((btn) => {
    btn.addEventListener("click", visitWebsite);
  });
}

// Clear Input Function
function clearInput() {
  siteName.value = "";
  siteURL.value = "";
  siteName.classList.remove("is-valid");
  siteURL.classList.remove("is-valid");
}

// Capitalize Function
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Submit Function
submitBtn.addEventListener("click", () => {
  if (siteName.classList.contains("is-valid") && siteURL.classList.contains("is-valid")) {
    const bookmark = {
      siteName: capitalize(siteName.value),
      siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks.length - 1);
    clearInput();
  } else {
    boxModal.classList.remove("d-none");
  }
});

// Delete Bookmark Function
function deleteBookmark(e) {
  const deletedIndex = e.target.dataset.index;
  bookmarks.splice(deletedIndex, 1);
  tableContent.innerHTML = "";
  bookmarks.forEach((_, index) => displayBookmark(index));
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

// Visit Website Function
function visitWebsite(e) {
  const websiteIndex = e.target.dataset.index;
  const { siteURL } = bookmarks[websiteIndex];
  const httpsRegex = /^https?:\/\//;
  const validURL = httpsRegex.test(siteURL) ? siteURL : `https://${siteURL}`;
  window.open(validURL, "_blank");
}

// Validate Input

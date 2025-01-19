var closeBtn = document.getElementById("closeLayer");
var submit = document.getElementById("submitting");
var siteName = document.getElementById("formGroupExampleInput");
var siteUrl = document.getElementById("formGroupExampleInput2");
var innerCartona = document.getElementById("innerCartona");
var allData = [];

//test localStorage
if (localStorage.getItem("bookmark") !== null) {
  allData = JSON.parse(localStorage.getItem("bookmark"));
  displayBookmark(allData);
}

//take data and done display
function takeData() {
  var data = {
    bookmarkName: siteName.value,
    bookmarkUrl: siteUrl.value,
  };
  allData.push(data);
  localStorage.setItem("bookmark", JSON.stringify(allData));
  displayBookmark(allData);
  clearData();
  siteName.classList.add("is-invalid");
  siteUrl.classList.add("is-invalid");
}

//display bookmark
function displayBookmark(arr) {
  var cartona = ` <tr class="bg-white">
          <th>Index</th>
          <th>Website Name</th>
          <th>Visit</th>
          <th>Delete</th>
        </tr>`;
  for (let i = 0; i < arr.length; i++) {
    cartona += ` <tr class="bg-white  ">
            <td>${i + 1}</td>
            <td> ${arr[i].bookmarkName}</td>
            <td>
              <button class=" btnOne px-4 py-2 "><a href=" ${arr[i].bookmarkUrl}
              "target="_blank"><span><i class="fa-solid fa-eye pe-2"></i>
                    Visit</span></a></button>
            </td>
            <td>
              <button onclick="deletBookmark(${i})" class=" btnTwo px-4 py-2"><a href="#"><span><i class=" fa-solid fa-trash-can pe-2"></i>
                    Delete</span></a></button>
            </td>
          </tr>`;
  }
  innerCartona.innerHTML = cartona;
}
// delet bookmark
function deletBookmark(indexDelete) {
  allData.splice(indexDelete, 1);
  displayBookmark(allData);
  localStorage.setItem("bookmark", JSON.stringify(allData));
}
//clear data
function clearData() {
  siteName.value = "";
  siteUrl.value = "";
}
//regex
function regex(element) {
  var logic = {
    formGroupExampleInput: /^[A-Za-z]{3,}$/,
    formGroupExampleInput2:
      /^https?:\/\/(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/,
  };
  if (logic[element.id].test(element.value) == true) {
    element.classList.replace("is-invalid", "is-valid");
    submit.classList.remove("disabled");
  } else {
    element.classList.replace("is-valid", "is-invalid");
    submit.classList.add("disabled");
  }
}
submit.addEventListener("click", takeData);

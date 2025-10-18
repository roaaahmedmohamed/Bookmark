var siteNameInput = document.getElementById("siteName");
var urlLinkInput = document.getElementById("urlLink");

var info = [];

if (localStorage.getItem("infoList") !== null) {
  info = JSON.parse(localStorage.getItem("infoList"));
  displayInfo();
}

function validateInputs() {
  var siteName = siteNameInput.value;
  var url = urlLinkInput.value;

  var urlRegex =
    /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\/\w\-.]*)*\/?$/;

  var isNameValid = siteName.length >= 3;
  var isUrlValid = urlRegex.test(url);

  if (isNameValid) {
    siteNameInput.classList.add("is-valid");
    siteNameInput.classList.remove("is-invalid");
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
  }

  if (isUrlValid) {
    urlLinkInput.classList.add("is-valid");
    urlLinkInput.classList.remove("is-invalid");
  } else {
    urlLinkInput.classList.add("is-invalid");
    urlLinkInput.classList.remove("is-valid");
  }

  return isNameValid && isUrlValid;
}

function addInfo() {

  if (!validateInputs()) {
  var myModal = document.getElementById('validationModal');
  var ShowModal = new bootstrap.Modal(myModal); 
  ShowModal.show();
  return;
}


  var values = {
    siteName: siteNameInput.value,
    urlLink: urlLinkInput.value,
  };

  info.push(values);
  localStorage.setItem("infoList", JSON.stringify(info));
  displayInfo();
  clearForm();
}

function displayInfo() {
  var cartona = "";
  for (var i = 0; i < info.length; i++) {
    cartona += `

     <tr>
      <th scope="row">${i + 1}</th>
      <td>${info[i].siteName}</td>
      <td><button class="visit_btn btn" onclick="visitSite(${i})"><i class="fa-solid fa-eye pe-2"></i>Visit</button></td>
      <td><button class="delete_btn btn" onclick="deleteInfo(${i})"><i class="fa-solid fa-trash"></i>Delete</button></td>
    </tr>
        `;
  }

  document.getElementById("tbody").innerHTML = cartona;
}

function deleteInfo(index) {
  info.splice(index, 1);
  displayInfo();
  localStorage.setItem("infoList", JSON.stringify(info));
}

function visitSite(index) {
  var link = info[index].urlLink;
  var fixedLink = link.startsWith("http") ? link : `https://${link}`;
  window.open(fixedLink, "_blank");
}

function clearForm() {
  siteName.value = "";
  urlLink.value = "";
  siteNameInput.classList.remove("is-invalid", "is-valid");
  urlLinkInput.classList.remove("is-valid", "is-invalid");
}


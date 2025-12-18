function getUserInfo() {
  // console.dir(document.getElementById("myForm"));
  let nameInput = document.getElementById("nama").value;
  let ageInput = document.getElementById("umur").value;
  localStorage.setItem("username", nameInput);
  localStorage.setItem("age", ageInput);
  let username = localStorage.getItem("username");
  let age = localStorage.getItem("age");
  checkUserInfo(username, age);
}

function checkUserInfo(name, age) {
  if (!name) {
    return window.alert(
      "Anda belum input nama, Silahkan input terlebih dahulu!"
    );
  }

  if (!age) {
    return window.alert("Umur yang anda ketik salah!");
  }

  if (age < 18) {
    return window.alert("Adik kecil belum boleh main");
  }

  const buttonSubmit = document.getElementById("submit");

  return buttonSubmit.setAttribute("href", "./games.html");
}

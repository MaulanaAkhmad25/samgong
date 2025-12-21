function getUserInfo() {
  const nama = document.getElementById("nama").value.trim();
  const umur = document.getElementById("umur").value;

  if (nama.length === 0) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Nama tidak boleh kosong!",
    });
  }

  if (umur.length === 0) {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Umur tidak boleh kosong!",
    });
  }

  if (umur < 18) {
    return Swal.fire({
      icon: "warning",
      title: `Maaf ${nama} <span class="bi bi-emoji-frown"></span>`,
      text: "Kamu belum cukup umur",
    });
  }

  localStorage.setItem("playerName", nama);
  localStorage.setItem("playerAge", umur);
  localStorage.setItem("music", "on");

  Swal.fire({
    title: `Hallo ${nama}, Welcome and Goodluck Have Fun!`,
    icon: "success",
    confirmButtonText: "Ok!",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "./games.html";
    }
  });
}

function welcomeAlert(name) {
  return Swal.fire({
    title: `Hallo ${name}, Welcome and Goodluck Have Fun!`,
    icon: "success",
  });
}

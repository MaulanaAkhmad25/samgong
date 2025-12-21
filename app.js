function getUserInfo() {
  const nama = document.getElementById("nama").value.trim();
  const umur = document.getElementById("umur").value;

  if (nama === "") {
    alert("Nama tidak boleh kosong!");
    return;
  }

  if (umur.length === 0) {
    return alert("Umur tidak boleh kosong!");
  }

  if (umur < 18) {
    alert("Kamu belum cukup umur");
    return;
  }

  localStorage.setItem("playerName", nama);
  localStorage.setItem("playerAge", umur);
  localStorage.setItem("music", "on");

  window.location.href = "./games.html";
}

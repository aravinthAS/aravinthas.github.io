function toISODate(str) {
  // Matcher dd.mm.yyyy
  const match = str.match(/^(\d{2})\.(\d{2})\.(\d{4})$/);
  if (match) {
    const [, day, month, year] = match;
    return `${year}-${month}-${day}`;
  }
  return str; // Returner som-is hvis allerede gyldig
}

function fillForm() {
  const input = document.getElementById("bulkInput").value;
  const lines = input.split("\n");
  const data = {};

  for (let line of lines) {
    const [key, ...rest] = line.split(":");
    if (key && rest.length) {
      data[key.trim().toLowerCase()] = rest.join(":").trim();
    }
  }

  const form = document.forms["contractForm"];
  if (form) {
    form.elements["name"].value = data["navn"] || "";
    form.elements["address"].value = data["adresse"] || "";
    form.elements["phone"].value = data["telefon"] || "";
    form.elements["email"].value = data["e-post"] || "";
    form.elements["amount"].value = data["beløp"] || "";

    const startInput = form.elements["start"];
    const endInput = form.elements["end"];

    startInput.value = toISODate(data["startdato"] || "");
    endInput.value = toISODate(data["sluttdato"] || "");

    // Simuler "change" for å trigge eventlisteners
    startInput.dispatchEvent(new Event("change"));
    endInput.dispatchEvent(new Event("change"));
  }
}

function copyTemplate() {
  const template = `Navn:
Adresse: 
Telefon: 
E-post: 
Startdato: 
Sluttdato: 
Beløp: `;
  
  navigator.clipboard.writeText(template)
    .then(() => alert('Mal kopiert til utklippstavle!'))
    .catch(err => alert('Klarte ikke kopiere mal: ' + err));
}

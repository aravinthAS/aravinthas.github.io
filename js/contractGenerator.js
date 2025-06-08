// js/contractGenerator.js

document
  .getElementById("contractForm")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    // Valider skjema før du går videre
    const form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const response = await fetch("html2pdf.html");
    const html = await response.text();
    const container = document.createElement("div");
    container.innerHTML = html;

    const name = form.name.value;
    const address = form.address.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const start = form.start.value;
    const end = form.end.value;

    const manualAmount = form.amount?.value;
    const amount =
      manualAmount && manualAmount.trim() !== ""
        ? manualAmount
        : calculatePrice(start, end);
    const today = new Date().toLocaleDateString("no-NO");

    const c = (id) => container.querySelector(`#${id}`);
    c("c_name").textContent = name;
    c("c_address").textContent = address;
    c("c_phone").textContent = phone;
    c("c_email").textContent = email;
    c("c_start").textContent = start;
    c("c_end").textContent = end;
    c("c_amount").textContent = amount;
    c("c_date").textContent = today;
    c("c_name2").textContent = name;

    const contractElement = container.querySelector("#contractTemplate");
    const prevDisplay = contractElement.style.display;
    contractElement.style.removeProperty("display");

    await new Promise((resolve) => setTimeout(resolve, 1000));


    // Generer PDF og vis den i iframe for forhåndsvisning
    const opt = {
      margin: 10,
      filename: `kontrakt_${name.replace(/\s+/g, "_")}.pdf`,
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };
    const pdfBlob = await html2pdf()
      .from(contractElement)
      .set(opt)
      .outputPdf("blob");

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const url = URL.createObjectURL(pdfBlob);
    const previewContainer = document.getElementById("contractResult");
    previewContainer.innerHTML = `
    <h3>Forhåndsvisning av kontrakt</h3>
    <iframe src="${url}" style="width:100%; height:600px; border:1px solid #ccc;"></iframe>
    <br><a href="${url}" download="${opt.filename}" class="btn btn-primary">Last ned PDF</a>
  `;

    contractElement.style.display = prevDisplay;
    //contractElement.style.display = "none";
  });

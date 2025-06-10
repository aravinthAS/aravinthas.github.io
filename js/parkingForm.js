document.getElementById("parkingForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const formData = Object.fromEntries(new FormData(form).entries());

  const manualAmount = form.price?.value;
  const calculatedPrice = calculatePrice(form.startdate.value, form.enddate.value);
  const finalPrice = manualAmount && manualAmount.trim() !== "" ? manualAmount : calculatedPrice;

  // Overstyr prisen i formData med korrekt verdi
  formData.price = finalPrice;

  const response = await fetch(
    "https://fagvfnnigrbvfrgicseo.supabase.co/functions/v1/submit_parking_request",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData),
    }
  );

  if (response.ok) {
    const result = await response.json();
    window.location.href = `/thankyouforrequest.html?id=${result.id}`;
  } else {
    const err = await response.json();
    alert("Feil ved innsending: " + err.error);
  }
});

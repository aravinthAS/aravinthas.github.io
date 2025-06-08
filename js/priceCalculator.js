function calculatePrice(startDateStr, endDateStr) {
  const oneDay = 24 * 60 * 60 * 1000;
  const startDate = new Date(startDateStr);
  const endDate = new Date(endDateStr);
  const days = Math.round((endDate - startDate) / oneDay) + 1;

  if (days <= 1) return 100;
  if (days <= 3) return Math.round(100 + (110 / 2) * (days - 1));
  if (days <= 7) return Math.round(205 + (290 / 4) * (days - 3));
  if (days <= 30) return Math.round(490 + (810 / 23) * (days - 7));

  const extraDays = days - 30;
  return 1300 + extraDays * 45;
}

function updatePrice() {
  const start = document.querySelector("input[name='start']").value;
  const end = document.querySelector("input[name='end']").value;
  if (start && end) {
    const price = calculatePrice(start, end);
    document.getElementById("calculatedPrice").textContent = `${price} kr`;
  }
}

document
  .querySelector("input[name='start']")
  .addEventListener("change", updatePrice);
document
  .querySelector("input[name='end']")
  .addEventListener("change", updatePrice);

// qr.js
import QRCode from "https://cdn.jsdelivr.net/npm/qrcode@1.5.3/+esm";

const generateButton = document.getElementById("generate");
const payerAddressInput = document.getElementById("payerAddress"); // optional
const payerNameInput = document.getElementById("payerName"); //optional
const amountInput = document.getElementById("amount"); // required, minimum = 1.00
const txnNoteInput = document.getElementById("txnNote");
const qrCanvas = document.getElementById("qr");
const amountError = document.getElementById("amount-error");
const amountHelp = document.getElementById("amount-help");
const generateError = document.getElementById("generate-error");

const paInput = "shauryadotp@fam";
// const paInputDead = "shauryaking911@okicici"; // DO NOT TRY TO PAY TO THIS VPA
// const pn = ""; // is automatically fetched by UPI apps

function validateAmount() {
  const amount = parseFloat(amountInput.value);
  let message = "";

  if (!Number.isFinite(amount)) {
    message = "Enter an amount between ₹1 and ₹5,000.";
  } else if (amount < 1) {
    message = "Minimum amount is ₹1.";
  } else if (amount > 5000) {
    message = "Maximum amount is ₹5,000.";
  }

  amountInput.setAttribute("aria-invalid", String(Boolean(message)));
  amountError.textContent = message;
  amountError.hidden = !message;
  amountHelp.hidden = Boolean(message);
  return !message;
}

amountInput.addEventListener("input", () => {
  qrCanvas.hidden = true;
  generateError.hidden = true;
  if (amountInput.getAttribute("aria-invalid") === "true") validateAmount();
});

// rahhhhh
generateButton.addEventListener('click', async () => {
  generateError.hidden = true;
  if (!validateAmount()) {
    qrCanvas.hidden = true;
    amountInput.focus();
    return;
  }

  const amount = parseFloat(amountInput.value);
  const params = new URLSearchParams({
    pa: paInput,
    am: amount.toFixed(2),
    cu: "INR",
  });

  // params.toString()
  //
  const txnNote = txnNoteInput.value.trim();
  if (txnNote) params.set('tn', txnNote);

  // make upi url
  const upiURL = "upi://pay?" + params.toString().replace(/\+/g, "%20"); //replaces + [html for space] with %20

  generateButton.disabled = true;
  try {
    await QRCode.toCanvas(qrCanvas, upiURL, { width: 256, margin: 2 });
    qrCanvas.hidden = false;
  } catch (err) {
    qrCanvas.hidden = true;
    generateError.textContent = "Could not generate the QR code. Please try again.";
    generateError.hidden = false;
    console.error(err);
  } finally {
    generateButton.disabled = false;
  };


});





// // generate qr on click
// generateButton.addEventListener('click', () => {
//   const upiUrl = upiUrlEncoded;
//
//   QRc
// })

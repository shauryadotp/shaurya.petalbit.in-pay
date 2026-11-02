// qr.js
import QRCode from "https://cdn.jsdelivr.net/npm/qrcode@1.5.3/+esm";

const generateButton = document.getElementById("generate");
const payerAddressInput = document.getElementById("payerAddress"); // optional
const payerNameInput = document.getElementById("payerName"); //optional
const amountInput = document.getElementById("amount"); // required, minimum = 1.00
const txnNoteInput = document.getElementById("txnNote");
const qrCanvas = document.getElementById("qr");

const paInput = "shauryadotp@fam";
// const paInputDead = "shauryaking911@okicici"; // DO NOT TRY TO PAY TO THIS VPA
// const pn = ""; // is automatically fetched by UPI apps

// rahhhhh
generateButton.addEventListener('click', async () => {
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount < 1) {
    alert("Minimum amount is 1.00");
    return;
  }
  if (isNaN(amount) || amount > 5000) {
    alert("Maximum amount is 5000");
    return;
  }

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

  try {
    await QRCode.toCanvas(qrCanvas, upiURL, { width: 256, margin: 2 });
    qrCanvas.hidden = false;
  } catch (err) {
    console.error(err);
  };


});





// // generate qr on click
// generateButton.addEventListener('click', () => {
//   const upiUrl = upiUrlEncoded;
//
//   QRc
// })

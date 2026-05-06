const cost = document.getElementById("cost");
const delivery = document.getElementById("delivery");
const ads = document.getElementById("ads");
const price = document.getElementById("price");

const costInput = document.getElementById("costInput");
const deliveryInput = document.getElementById("deliveryInput");
const adsInput = document.getElementById("adsInput");
const priceInput = document.getElementById("priceInput");

function sync(slider, input) {
  slider.addEventListener("input", () => {
    input.value = slider.value;
    calculate();
  });

  input.addEventListener("input", () => {
    slider.value = input.value;
    calculate();
  });
}

sync(cost, costInput);
sync(delivery, deliveryInput);
sync(ads, adsInput);
sync(price, priceInput);

function calculate() {
  let c = parseFloat(cost.value);
  let d = parseFloat(delivery.value);
  let a = parseFloat(ads.value);
  let p = parseFloat(price.value);

  let total = c + d + a;
  let profit = p - total;
  let margin = (profit / p) * 100;

  document.getElementById("totalCost").innerText = total.toFixed(2);
  document.getElementById("profit").innerText = profit.toFixed(2);
  document.getElementById("margin").innerText = margin.toFixed(1);

  // Status logic
  let status = document.getElementById("statusText");

  if (margin > 20) {
    status.innerText = "YÜKSƏK MƏNFƏƏT";
    status.style.color = "green";
  } else if (margin > 10) {
    status.innerText = "ORTA MƏNFƏƏT";
    status.style.color = "orange";
  } else if (margin > 5) {
    status.innerText = "AŞAĞI MƏNFƏƏT";
    status.style.color = "red";
  } else {
    status.innerText = "Diqqət! Siz ziyana işləyirsiniz!";
    status.style.color = "red";
  }


  // Bar visualization
  let totalValue = p;

  document.getElementById("costBar").style.width = (c / totalValue * 100) + "%";
  document.getElementById("deliveryBar").style.width = (d / totalValue * 100) + "%";
  document.getElementById("adsBar").style.width = (a / totalValue * 100) + "%";
  document.getElementById("profitBar").style.width = (profit / totalValue * 100) + "%";

}

calculate();

// PWA Service Worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js');
}
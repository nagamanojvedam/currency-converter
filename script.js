"use strict";

const dropdowns = document.querySelectorAll("select");
const convertBtn = document.querySelector("#convert-btn");
const fromCountry = document.querySelector(".from select");
const toCountry = document.querySelector(".to select");

for (let dropdown of dropdowns) {
  for (let country in countryList) {
    let newOption = document.createElement("option");

    newOption.value = country;
    newOption.innerHTML = country;
    dropdown.append(newOption);

    if (dropdown.name === "from" && country === "USD")
      newOption.selected = "selected";
    if (dropdown.name === "to" && country === "INR")
      newOption.selected = "selected";
  }

  dropdown.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let currCountry = countryList[currCode];
  let flagSrcURL = `https://flagsapi.com/${currCountry}/flat/64.png`;
  let flagImg = element.parentElement.querySelector("img");

  flagImg.src = flagSrcURL;
};

convertBtn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector("input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 0) {
    amtVal = 1;
    amount.value = "1";
  }

  let searchURL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCountry.value.toLowerCase()}.json`;

  let result = await fetch(searchURL);
  let dataReq = await result.json();

  console.log(dataReq);
  console.log(
    dataReq[fromCountry.value.toLowerCase()][toCountry.value.toLowerCase()]
  );
});

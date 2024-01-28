const title = document.getElementsByTagName('h1');
const buttons = document.getElementsByClassName('handler_btn');
const buttonPlus = document.querySelector(".screen-btn");
const otherItemsPercent = document.querySelectorAll(".other-items.percent");
const otherItemsNumber = document.querySelectorAll(".other-items.number");
const typeRollback = document.querySelector('.rollback input[type = "range"]');
const typeSpan = document.querySelector('.rollback span[class= "range-value"]');
const totalInput = document.getElementsByClassName("total-input");
let screenBlocks = document.querySelectorAll(".screen");

console.log(title[0].textContent);
console.log(buttons);
console.log(buttonPlus);
console.log(otherItemsPercent);
console.log(otherItemsNumber);
console.log(typeRollback);
console.log(typeSpan);

for (let i = 0; i < totalInput.length; i++) {
    console.log(totalInput[i]);

}
console.log(screenBlocks);


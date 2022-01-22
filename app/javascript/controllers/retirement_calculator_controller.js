let calculateBtn = document.querySelector(".calculate")

// calculateBtn.addEventListener("click", () => {
//     alert("You just clicked calculate!");
// });

calculateBtn.addEventListener("click", (e) => {
    e.preventDefault();
    calculateBtn.insertAdjacentHTML("afterend", "<h1>Hello!</h1>")
})
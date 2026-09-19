const message = document.querySelector("#message");
const cheerButton = document.querySelector("#cheer-button");

let isFirst = true;

cheerButton.addEventListener("click", function () {
  if (isFirst) {
    message.textContent = "너가 최고야";
    isFirst = false;
  } else {
    message.textContent = "너가 짱이야"
    isFirst = true;
  }
});


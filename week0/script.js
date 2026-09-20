        console.log("hello, world!");
        
        const message = document.querySelector("#message");
        const greetingButton = document.querySelector("#greeting-button");

        greetingButton.addEventListener("click", function() {
            message.textContent = "웹 개발을 시작합니다";
        });
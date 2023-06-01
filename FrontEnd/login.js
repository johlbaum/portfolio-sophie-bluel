document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector(".login-form");
  const loginMessage = document.querySelector(".log-in-message");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = event.target.querySelector("[name=email]");
    const passwordInput = event.target.querySelector("[name=password]");

    const email = emailInput.value;
    const password = passwordInput.value;

    if (!email || !password) {
      loginMessage.innerHTML = "Veuillez remplir tous les champs";
      return;
    }

    const loginInformation = {
      email: email,
      password: password,
    };

    const body = JSON.stringify(loginInformation);

    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    })
      .then(function (response) {
        if (response.ok) {
          return response.json();
        } else {
          loginMessage.innerHTML = "Identifiants incorrects";
          throw new Error("Identifiants incorrects");
        }
      })
      .then(function (data) {
        const loginInformation = JSON.stringify(data);
        window.localStorage.setItem("loginInformation", loginInformation);
        loginMessage.innerHTML = "Connexion réussie !";
        setTimeout(function () {
          window.location.href = "index.html";
        }, 1000);
      })
      .catch(function (error) {
        console.error(error);
      });
  });
});

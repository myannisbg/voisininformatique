let modal = document.getElementById("modal-register");
const roleInput = document.getElementById("role");

function openModal(role) {
    modal = document.getElementById("modal-register");
    roleInput.value = role;
    document.getElementById("modal-title").textContent =
        role === "utilisateur" ? "Inscription Utilisateur" : "Inscription Dépanneur";
    modal.style.display = "flex";
}

function openModalLogin(){
    modal = document.getElementById("modal-login");
    modal.style.display = "flex";
}

function closeModal() {
    modal.style.display = "none";
}

async function handleSubmit(event) {
    event.preventDefault();
    const form = document.getElementById("modal-form");
    const formData = new FormData(form);
    const errorMessage = document.getElementById("error-message");

    const data = {
        nom: formData.get("nom"),
        prenom: formData.get("prenom"),
        mail: formData.get("mail"),
        telephone: formData.get("telephone"),
        mot_de_passe: formData.get("mot_de_passe"),
        role: formData.get("role"),
    };

    try {
        const response = await fetch("https://voisininformatique.onrender.com/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.ok) {
            // alert("Inscription réussie !");
            closeModal();
            window.location.href = '/profile';
        } else {
            errorMessage.textContent = result.message || "Une erreur est survenue.";
            errorMessage.style.display = "block";
            // alert("Erreur : " + result.message);
        }
    } catch (error) {
        errorMessage.textContent = result.message || "Une erreur est survenue.";
        errorMessage.style.display = "block";
        // alert("Erreur de connexion au serveur.");
    }
}

async function handleSubmitLogin(event) {
    event.preventDefault();
    const form = document.getElementById("modal-form-login");
    const formData = new FormData(form);
    const errorMessage = document.getElementById("error-message-login");

    const data = {
        mail: formData.get("mail"),
        mot_de_passe: formData.get("mot_de_passe"),
    };

    try {
        const response = await fetch("https://voisininformatique.onrender.com/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (response.ok) {
            if (result.token) {
                localStorage.setItem("token", result.token);
                console.log("Token enregistré :", result.token);
            }
            // alert("Connexion réussie !");
            closeModal();
            window.location.href = '/profile';
        } else {
            errorMessage.textContent = result.message || "Une erreur est survenue.";
            errorMessage.style.display = "block";
            // alert("Erreur : " + result.message);
        }
    } catch (error) {
        errorMessage.textContent = "Erreur de connexion au serveur.";
        errorMessage.style.display = "block";
        // alert("Erreur de connexion au serveur.");
    }
}

async function checkTokenAndRedirect() {
    const token = localStorage.getItem("token");
    if (!token) {
        return; // Si aucun token n'est présent, ne rien faire
    }

    // Vérification de la validité du token via l'API
    try {
        const response = await fetch("https://voisininformatique.onrender.com/api/auth/verify", {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        if (response.ok) {
            // Le token est valide, on redirige vers la page du profil
            window.location.href = "/profile";
        } else {
            console.log("token remove")
            // Si le token est invalide, on peut le supprimer et rediriger vers la page de connexion
            localStorage.removeItem("token");
        }
    } catch (error) {
        console.error("Erreur lors de la vérification du token :", error);
        // En cas d'erreur de connexion, on supprime le token et redirige vers la page de connexion
        localStorage.removeItem("token");
    }
}

window.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
};

checkTokenAndRedirect();
// Variables globales
const modal = document.getElementById("edit-modal");

// Ouvrir la modale
function openModal() {
    modal.style.display = "flex";
    // Pré-remplir les champs avec les informations actuelles
    document.getElementById("edit-nom").value = document.getElementById("user-nom").textContent;
    document.getElementById("edit-prenom").value = document.getElementById("user-prenom").textContent;
    document.getElementById("edit-email").value = document.getElementById("user-email").textContent;
}

// Fermer la modale
function closeModal() {
    modal.style.display = "none";
}

// Soumission du formulaire d'édition
async function handleEditSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const data = {
        nom: formData.get("nom"),
        prenom: formData.get("prenom"),
        email: formData.get("email"),
        password: formData.get("password"),
    };

    try {
        const response = await fetch("/api/users/update", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        if (response.ok) {
            const updatedData = await response.json();
            // Mettre à jour l'interface utilisateur
            document.getElementById("user-nom").textContent = updatedData.nom;
            document.getElementById("user-prenom").textContent = updatedData.prenom;
            document.getElementById("user-email").textContent = updatedData.email;
            alert("Informations mises à jour avec succès !");
            closeModal();
        } else {
            alert("Erreur lors de la mise à jour des informations.");
        }
    } catch (error) {
        alert("Erreur de connexion au serveur.");
    }
}

// Supprimer le compte
async function deleteAccount() {
    if (confirm("Êtes-vous sûr de vouloir supprimer votre compte ?")) {
        try {
            const response = await fetch("/api/users/delete", {
                method: "DELETE",
            });
            if (response.ok) {
                alert("Compte supprimé avec succès !");
                window.location.href = "/"; // Rediriger après suppression
            } else {
                alert("Erreur lors de la suppression du compte.");
            }
        } catch (error) {
            alert("Erreur de connexion au serveur.");
        }
    }
}

// Charger les informations de l'utilisateur depuis l'API
async function loadUserInfo() {
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Token non trouvé. Vous devez vous connecter.");
        window.location.href = "/index"; // Rediriger si le token n'est pas présent
        return;
    }

    try {
        const response = await fetch("/api/users/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`, // Ajouter le token dans les en-têtes
            },
        });

        if (response.ok) {
            const userData = await response.json();
            // Mettre à jour l'interface avec les données utilisateur récupérées
            document.getElementById("user-nom").textContent = userData.nom;
            document.getElementById("user-prenom").textContent = userData.prenom;
            document.getElementById("user-email").textContent = userData.mail;
            const userButtons = document.getElementById("user-buttons");

            if (userData.role === "utilisateur") {
                userButtons.innerHTML = `
                    <button class="btn">Mes annonces</button>
                    <button class="btn">Créer une nouvelle annonce</button>
                `;
            } else if (userData.role === "dépanneur") {
                userButtons.innerHTML = `
                    <button class="btn">Mes réparations</button>
                    <button class="btn">Catalogue d'annonces</button>
                `;
            }
        } else {
            alert("Erreur lors de la récupération des informations.");
        }
    } catch (error) {
        alert("Erreur de connexion au serveur.");
    }
}


function disconect() {
    localStorage.removeItem("token"); // Supprime le token
    window.location.href = "/index"; // Redirige vers la page de connexion
}


// Charger les boutons spécifiques au rôle
window.onload = function () {
    loadUserInfo();
};

window.onclick = function (event) {
    if (event.target === modal) {
        closeModal();
    }
};
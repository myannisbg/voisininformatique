async function handleAnnonceSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Vous devez être connecté pour créer une annonce !");
        window.location.href = "/login";
        return;
    }

    try {
        const response = await fetch("/api/annonces/create", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData, // Pour gérer l'upload d'image
        });

        if (response.ok) {
            alert("Annonce créée avec succès !");
            window.location.href = "/mes-annonces"; // Redirection après création
        } else {
            const result = await response.json();
            alert(result.message || "Erreur lors de la création de l'annonce.");
        }
    } catch (error) {
        alert("Erreur de connexion au serveur.");
    }
}
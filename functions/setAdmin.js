const admin = require("firebase-admin");

// Ścieżka do pliku klucza serwisowego
const serviceAccount = require("./my-app-wms-firebase-adminsdk-5niry-3047760271.json");

// Inicjalizacja Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// Adres e-mail użytkownika, któremu chcesz nadać uprawnienia administratora
const adminEmail = "marcinzbionica@gmail.com";

// Ustawienie custom claim `admin: true`
async function setAdmin() {
    try {
        // Pobierz UID użytkownika na podstawie jego e-maila
        const user = await admin.auth().getUserByEmail(adminEmail);

        // Ustaw custom claim `admin`
        await admin.auth().setCustomUserClaims(user.uid, { admin: true });

        console.log(`Uprawnienia administratora zostały nadane dla użytkownika: ${adminEmail}`);
        process.exit(0); // Zakończ proces, jeśli sukces
    } catch (error) {
        console.error("Błąd podczas nadawania uprawnień administratora:", error);
        process.exit(1); // Zakończ proces, jeśli błąd
    }
}

// Wywołanie funkcji
setAdmin();

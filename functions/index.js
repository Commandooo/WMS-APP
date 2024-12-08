const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp();

exports.setAdmin = functions.https.onCall(async (data, context) => {
    if (!context.auth || !context.auth.token.admin) {
        throw new functions.https.HttpsError(
            "permission-denied",
            "Brak uprawnień do tej operacji"
        );
    }

    const { email } = data;
    try {
        const user = await admin.auth().getUserByEmail(email);
        await admin.auth().setCustomUserClaims(user.uid, { admin: true });
        return { message: `Użytkownik ${email} został ustawiony jako admin.` };
    } catch (error) {
        throw new functions.https.HttpsError(
            "internal",
            "Błąd podczas ustawiania uprawnień admina",
            error.message
        );
    }
});

const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();

const corsHandler = cors({ origin: true });

exports.createUser = functions.https.onCall(async (data, context) => {
  try {
    const user = await admin.auth().createUser({
      email: data.email,
      password: data.password,
    });
    return { message: `Utworzono użytkownika: ${user.uid}` };
  } catch (error) {
    throw new functions.https.HttpsError("internal", error.message);
  }
});

const { email, password, role } = req.body;

try {
  const user = await admin.auth().createUser({
    email,
    password,
  });

  await db.collection("users").doc(user.uid).set({
    email,
    role,
  });

  return res.status(200).send({ message: "User created successfully!" });
} catch (error) {
  console.error("Error creating user:", error);
  return res.status(500).send({ message: "Internal server error", error });
}
  });
});

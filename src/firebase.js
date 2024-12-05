import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBNmSrd5sBgGiZxoHhVY0C-exCjM_29unE",
    authDomain: "my-app-wms.firebaseapp.com",
    projectId: "my-app-wms",
    storageBucket: "my-app-wms.firebasestorage.app",
    messagingSenderId: "992472340023",
    appId: "1:992472340023:web:72e3c363361491785991b2",
    measurementId: "G-S9N45BCPHM"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

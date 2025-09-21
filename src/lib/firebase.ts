import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  projectId: "studio-4419974401-b38f6",
  appId: "1:794443961605:web:3f5cf55266106d99c0136c",
  apiKey: "AIzaSyDJBe7nzMocM0c2WDQ22-pn-weJxVrCsfs",
  authDomain: "studio-4419974401-b38f6.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "794443961605",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };

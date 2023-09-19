import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBQUPrMvRuUEjHt_TwOCXpzpdI8tgSNzpc",
  authDomain: "gallery-d3211.firebaseapp.com",
  projectId: "gallery-d3211",
  storageBucket: "gallery-d3211.appspot.com",
  messagingSenderId: "166077000552",
  appId: "1:166077000552:web:12a6975d7ca888870404dd"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app 

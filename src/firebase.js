// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase 配置对象
const firebaseConfig = {
  apiKey: "AIzaSyDxqkc_dQIY2Kd2RAWTF-CUyfIihXtZz-g",
  authDomain: "daidoco-2c19f.firebaseapp.com",
  projectId: "daidoco-2c19f",
  storageBucket: "daidoco-2c19f.firebasestorage.app",
  messagingSenderId: "803390970440",
  appId: "1:803390970440:web:8de9789fb9fd0daf68d67d",
  measurementId: "G-0F87LGYZ1X",
};

// 初始化 Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

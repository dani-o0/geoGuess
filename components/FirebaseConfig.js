// Importar Firebase y Firestore
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC5NemgoC91Tr7K_yI5wW6Qld4DunwHhOA",
  authDomain: "geoguess-bd692.firebaseapp.com",
  projectId: "geoguess-bd692",
  storageBucket: "geoguess-bd692.appspot.com",
  messagingSenderId: "539633184325",
  appId: "1:539633184325:web:7a01b3d0a600bfeec37d2c",
  measurementId: "G-T26PQ9PZZB"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);

// Obtener la referencia de Firestore
const firestore = getFirestore(app);

// Exportar la configuración
export { firestore };

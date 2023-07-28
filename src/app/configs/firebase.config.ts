import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { environment } from "src/environments/environment";

const firebaseConfig = {
  // ...
  databaseURL: environment.firebaseRealtimeDatabaseURL,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
export const database = getDatabase(app);

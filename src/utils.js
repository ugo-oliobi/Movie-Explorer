import { initializeApp } from "firebase/app";
import { redirect } from "react-router-dom";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAFR3wdJVBD5tlSx8Q3ppsB2rDFWhMvQ34",
  authDomain: "vanlife-3bb16.firebaseapp.com",
  projectId: "vanlife-3bb16",
  storageBucket: "vanlife-3bb16.firebasestorage.app",
  messagingSenderId: "451825510030",
  appId: "1:451825510030:web:9b521e57cf0d5b9e980bdf",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
export const collectionName = "myWatchlist";

export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error.message);
  }
}
export async function signUpWithEmailAndPassword(auth, email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
  } catch (error) {
    throw error;
  }
}
export async function loginWithEmailAndPassword(auth, email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
  } catch (error) {
    throw error;
  }
}
export async function authSignout() {
  try {
    await signOut(auth);
  } catch (error) {
    console.log(error.message);
  }
}

//Utility Functions
export function getYear(dateStr) {
  const date = new Date(dateStr);
  return date.getFullYear();
}

export async function reqireAuth(request) {
  const pathname = new URL(request.url).pathname;
  const user = auth.currentUser;
  if (!user) {
    throw redirect(`/login?message=Please login&pathname=${pathname}`);
  }

  return user;
}
export function shortenOverview(overview, maxLength = 30) {
  const str =
    overview.length <= maxLength
      ? overview
      : `${overview.slice(0, maxLength)}...`;
  return str;
}
export function getReleasedDate(dateStr) {
  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date(dateStr);
  const day = date.getDate().toString().padStart(2, "0");
  const month = monthArr[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month}, ${year}`;
}
export function getGenreNames(genresArr) {
  return genresArr.map((genre) => genre.name).join(", ");
}

export async function getMovies(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch movie",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();

  return data.results;
}
export async function getMovieDetails(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch movie",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();

  return data;
}

export function delayTimer(time) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Signed in successfully!");
    }, 1000 * time);
  });
}

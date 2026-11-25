import { FirebaseConfig } from "../Firebase.config"
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword, signOut } from "firebase/auth"

//* Configuracion de Firebase
const auth = getAuth(FirebaseConfig)


//* Metodos Autenticacion
const sessionIsActive = async (): Promise<boolean> => {

  await auth.authStateReady()
  return Boolean(auth.currentUser)

}

const LogIn = async (email: string, password: string) => {
    await setPersistence(auth, browserLocalPersistence)

    const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
    )

    return userCredential.user
}

const LogOut = async () => {
  try {

    await signOut(auth);

  } catch (error) {

    console.error("Error al cerrar sesión:", error);

  }
}

export {
  LogIn,
  LogOut,
  sessionIsActive,
}
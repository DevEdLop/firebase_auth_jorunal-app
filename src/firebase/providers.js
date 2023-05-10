import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile,
    signInWithEmailAndPassword
} from 'firebase/auth';
import { FirebaseAuth } from './config';


const googleProvider = new GoogleAuthProvider();


export const signInWithGoogle = async () => {

    try {

        const result = await signInWithPopup(FirebaseAuth, googleProvider)

        const { uid, email, displayName, photoURL } = result.user;

        return {
            ok: true,
            //User Info
            uid,
            email,
            displayName,
            photoURL

        }
    } catch (error) {
        console.log(error)

        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }

}

export const registerAccount = async ({ email, password, displayName }) => {
    try {

        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL } = resp.user;
        console.log(resp)


        await updateProfile(FirebaseAuth.currentUser, { displayName })
        //TODO: actualizar el displayName en fireBase
        return {
            ok: true,
            uid, photoURL, email, displayName
        }

    } catch (error) {
        // console.log(error)
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const loginWithEmailAndPassword = async ({ email, password }) => {

    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password)
        const { uid, photoURL, displayName } = resp.user;
        return {
            ok: true,
            uid, photoURL, email, displayName
        }
    } catch (error) {

        console.log(error)
        return {
            ok: false,
            errorMessage: error.message
        }
    }
}

export const logoutFirebase = async () => {

    return await FirebaseAuth.signOut();

}

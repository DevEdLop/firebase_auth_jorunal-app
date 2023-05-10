import { signInWithGoogle, registerAccount, loginWithEmailAndPassword, logoutFirebase } from "../../firebase/providers"
import { clearNoteLogout } from "../journal"
import { checkingCredentials, login, logout } from "./authSlice"


export const checkingAuthentication = (email, password) => {
    return async (dispatch) => {

        dispatch(checkingCredentials())

    }
}

export const startGoogleSingnIn = () => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const { ok, uid, photoURL, errorMessage, email, displayName } = await signInWithGoogle()

        if (!ok) return dispatch(logout({ errorMessage }))

        dispatch(login({ ok, uid, photoURL, email, displayName }))
    }
}

export const startCreateAccount = ({ email, password, displayName }) => {
    return async (dispatch) => {

        dispatch(checkingCredentials())

        const { ok, uid, photoURL, errorMessage } = await registerAccount({ email, password, displayName })

        if (!ok) return dispatch(logout({ errorMessage }))

        dispatch(login({ uid, photoURL, displayName, email }))

    }
}

export const startLoginWithEmailAndPassword = ({ email, password }) => {
    return async (dispatch) => {
        dispatch(checkingCredentials())

        const result = await loginWithEmailAndPassword({ email, password })

        if (!result.ok) return dispatch(logout(result))

        dispatch(login(result))
    }
}

export const startLogout = () => {
    return async (dispatch) => {
        await logoutFirebase()


        dispatch(clearNoteLogout())
        dispatch(logout())
    }
}
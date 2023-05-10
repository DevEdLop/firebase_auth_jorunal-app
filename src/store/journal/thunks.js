import { FirebaseDB } from "../../firebase/config"
import { collection, deleteDoc, doc, setDoc } from "firebase/firestore/lite"
import { addNewEmptyNote, deleteNoteById, savingNewNote, setActiveNote, setNotes, setPhotosToActiveNote, setSaving, updateNote } from "./journalSlice"
import { fileUpload, loadNotes } from "../../helpers"

export const startNewNote = () => {
    return async (dispatch, getState) => {

        dispatch(savingNewNote())
        //uuid
        const { uid } = getState().auth

        const newNote = {
            title: '',
            body: '',
            imageUrls: [],
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`))

        await setDoc(newDoc, newNote)

        newNote.id = newDoc.id;
        dispatch(addNewEmptyNote(newNote))
        dispatch(setActiveNote(newNote))
        // console.log(newDoc)
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error("El UID del usuarip no existe")

        // console.log({ uid })

        const notes = await loadNotes(uid)

        dispatch(setNotes(notes))
    }
}


export const startSaveNote = () => {
    return async (dispatch, getState) => {

        dispatch(setSaving())

        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const noteToFireStore = { ...note }

        delete noteToFireStore.id;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`)

        await setDoc(docRef, noteToFireStore, { merge: true })

        dispatch(updateNote(note))

    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch, getState) => {
        dispatch(setSaving())


        const filesUploadPromises = []

        for (const file of files) {

            filesUploadPromises.push(fileUpload(file))

        }

        const photosUrls = await Promise.all(filesUploadPromises)

        dispatch(setPhotosToActiveNote(photosUrls))

    }
}

export const startDeletingNote = () => {
    return async (dispatch, getState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;


        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        await deleteDoc(docRef);
        dispatch(deleteNoteById(note.id))
    }
}

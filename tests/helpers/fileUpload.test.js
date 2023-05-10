import { fileUpload } from "../../src/helpers/fileUpload"
import fetch from 'isomorphic-fetch';

describe('Prueba en fileUpload', () => {
    test('debe de subir el archivo correctamente a cloudinary', async () => {

        const imageUrl = "https://img.freepik.com/free-vector/night-ocean-landscape-full-moon-stars-shine_107791-7397.jpg"

        const resp = await fetch(imageUrl);
        const blob = await resp.blob();

        const file = new File([blob], 'kayn.jpg')


        const url = await fileUpload(file);

        expect(typeof url).toBe('string');


    })
})

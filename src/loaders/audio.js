/**
 * @typedef {Object} LoadData
 * @property {HTMLAudioElement} audio
 */

/**
 *
 * @param {String} file
 *
 * @return {Promise<LoadData>}
 */
export const load = async (file) => {
    const audio = new Audio(file);

    return {
        audio
    };

}
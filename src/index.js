import { create } from "./context.js";
import { load as fetchLoad } from "./loader.js";
import { Sound } from "./sound.js";

/**
 * Loads the audio file and initializes for later actions.
 *
 * @param {String} file
 *
 * @returns {Promise<Sound>}
 */
const load = (file) => {
    const context = create();

    return fetchLoad(context, file)
        .then(({source, gainNode}) => {
            return new Sound(context, source, gainNode);
        });
}

export { load, Sound }

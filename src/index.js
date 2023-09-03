import { load as audioLoad } from "./loaders/audio.js";
import { Sound } from "./sound.js";

/**
 * Loads the audio file and initializes for later actions.
 *
 * @param {String} file
 *
 * @returns {Promise<Sound>}
 */
const load = (file) => {
    return audioLoad(file)
        .then(({audio}) => {
            const sound = new Sound();
            sound.initWithAudio(audio);
            return sound;
        });
}

export { load, Sound }

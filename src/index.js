import { create } from "./context.js";

/** @type {AudioBuffer} buffer */
let buffer;
const context = create();

/**
 *
 * @param {String} file
 */
const init = (file) => {
    window.fetch(file)
        .then(response => response.arrayBuffer())
        .then(arrayBuffer => context.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            buffer = audioBuffer;
        });
}

const play = () => {
    const source = context.createBufferSource();

    source.buffer = buffer;
    source.connect(context.destination);
    source.start();
};
const pause = () => { };
const mute = () => { };

export {
    init,
    play,
    pause,
    mute
}

import { create } from "./context.js";

/** @type {AudioBuffer} buffer */
let buffer;
let originalVolume = 1;
let hasStarted = false;

const context = create();
const source = context.createBufferSource();
const gainNode = context.createGain();
gainNode.connect(context.destination);

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

            source.buffer = buffer;
            source.connect(gainNode);
            source.connect(context.destination);
        });
}

const play = () => {
    const state = context.state;

    if (hasStarted) {
        context.resume();
    }
    else {
        source.start();
        hasStarted = true;
    }
};
const pause = () => {
    context.suspend();
};
const mute = () => {
    originalVolume = volume();
    setVolume(0);
 };
const unmute = () => {
    setVolume(originalVolume);
 };
 const setVolume = (value) => {
    gainNode.gain.value = value;
 }
 const volume = () => {
    return gainNode.gain.value;
 }

export {
    init,
    play,
    pause,
    mute,
    unmute,
    setVolume,
    volume
}

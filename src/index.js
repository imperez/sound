import { create } from "./context.js";
import { load } from "./loader.js";

let originalVolume = 1;
let hasStarted = false;

const context = create();

/** @type {AudioBufferSourceNode} source */
let source;

/** @type {GainNode} gainNode */
let gainNode;

/**
 * Loads the audio file and initializes for later actions.
 *
 * @param {String} file
 */
const init = (file) => {
    load(context, file)
        .then(data => {
            source = data.source;
            gainNode = data.gainNode;
        });
}

const play = () => {
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

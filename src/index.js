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

/**
 * Play / Resume the current audio.
 */
const play = () => {
    if (hasStarted) {
        context.resume();
    }
    else {
        source.start();
        hasStarted = true;
    }
};

/**
 * Pause the current audio.
 */
const pause = () => {
    context.suspend();
};

/**
 * Mute the audio, setting it's volumne to 0.
 */
const mute = () => {
    originalVolume = volume();
    setVolume(0);
 };

 /**
 * Unmute the audio, setting it's volume to the previous value it was before muting.
 */
const unmute = () => {
    setVolume(originalVolume);
 };

 /**
 * Set the volume of the audio.
 *
 * @param {Number} value
 */
 const setVolume = (value) => {
    gainNode.gain.value = value;
 }

 /**
 * Gets the current audio's volume value.
 *
 * @returns {Number}
 */
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

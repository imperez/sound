import { create } from "./context";

let context = create();

/**
 *
 * @param {String} file
 */
const init = (file) => {
    const buffer = new AudioBuffer();
}

const play = () => {
    context.play();
};
const pause = () => {};
const mute = () => {};

export {
    play,
    pause,

}

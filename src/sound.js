import { PauseEvent } from "./events/pause.js";
import { PlayEvent } from "./events/play.js";
import { StopEvent } from "./events/stop.js";

class Sound extends EventTarget {
    /** @type {HTMLAudioElement} audio */
    audio;

    /** @type {AudioContext} context */
    context;

    /** @type {AudioBufferSourceNode} source */
    source;

    /** @type {GainNode} gainNode */
    gainNode;

    originalVolume = 1;
    hasStarted = false;

    /**
     *
     * @param {HTMLAudioElement} audio
     */
    initWithAudio(audio) {
        this.audio = audio;
    }

    /**
     *
     * @param {AudioBufferSourceNode} source
     * @param {GainNode} gainNode
     */
    initWithContext(context, source, gainNode) {
        this.context = context;
        this.source = source;
        this.gainNode = gainNode;
    }

    /**
     * Play / Resume the current audio.
     */
    play() {
        if (this.audio) {
            this.audio.play();
        }
        else {
            if (this.hasStarted) {
                this.context.resume();
            }
            else {
                this.source.start();
                this.hasStarted = true;
            }
        }

        this.dispatchEvent(new PlayEvent());
    };

    /**
     * Pause the current audio.
     */
    pause() {
        if (this.audio) {
            this.audio.pause();
        }
        else {
            this.context.suspend();
        }

        this.dispatchEvent(new PauseEvent());
    };

    /**
     * Stops the current audio from playing.
     */
    stop() {
        if (this.audio) {
            this.audio.pause();
        }
        else {
            this.source.stop();
        }

        this.hasStarted = false;
        this.dispatchEvent(new StopEvent());
    }

    /**
     * Mute the audio, setting it's volumne to 0.
     */
    mute() {
        this.originalVolume = volume();
        this.setVolume(0);
    };

    /**
    * Unmute the audio, setting it's volume to the previous value it was before muting.
    */
    unmute() {
        this.setVolume(this.originalVolume);
    };

    /**
    * Set the volume of the audio.
    *
    * @param {Number} value
    */
    setVolume(value) {
        if (this.audio) {
            this.audio.volume = value;
        }
        else {
            this.gainNode.gain.value = value;
        }
    }

    /**
    * Gets the current audio's volume value.
    *
    * @returns {Number}
    */
    volume() {
        if (this.audio) {
            return this.audio.volume;
        }
        else {
            return this.gainNode.gain.value;
        }
    }

    /**
     * Updates the playback rate for the audio file.
     *
     * @param {Number} value
     */
    setPlaybackRate(value) {
        if (this.audio) {
            this.audio.playbackRate = value;
        }
        else {
            this.source.playbackRate.value = value;
        }
    }

    /**
     * Gets the playback rate for the audio file.
     *
     * @param {Number} value
     */
    playbackRate() {
        if (this.audio) {
            return this.audio.playbackRate;
        }
        else {
            return this.source.playbackRate.value;
        }
    }

    /**
     * Clears out the audio file from being used.
     * Also disconnects any internal audio nodes.
     */
    clear() {
        this.stop();

        if (this.audio) {
            this.audio = null;
        }
        else {
            this.source.disconnect();
            this.gainNode.disconnect();
        }
    }
}


export { Sound };
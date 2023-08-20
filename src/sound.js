class Sound {
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
     * @param {AudioBufferSourceNode} source
     * @param {GainNode} gainNode
     */
    constructor(context, source, gainNode) {
        this.context = context;
        this.source = source;
        this.gainNode = gainNode;
    }

    /**
     * Play / Resume the current audio.
     */
    play() {
        if (this.hasStarted) {
            this.context.resume();
        }
        else {
            this.source.start();
            this.hasStarted = true;
        }
    };

    /**
     * Pause the current audio.
     */
    pause() {
        this.context.suspend();
    };

    /**
     * Stops the current audio from playing.
     */
    stop() {
        this.source.stop();
        this.hasStarted = false;
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
        this.gainNode.gain.value = value;
    }

    /**
    * Gets the current audio's volume value.
    *
    * @returns {Number}
    */
    volume() {
        return this.gainNode.gain.value;
    }

    /**
     * Updates the playback rate for the audio file.
     *
     * @param {Number} value
     */
    setPlaybackRate(value) {
        this.source.playbackRate.value = value;
    }

    /**
     * Gets the playback rate for the audio file.
     *
     * @param {Number} value
     */
    playbackRate() {
        return this.source.playbackRate.value;
    }

    /**
     * Clears out the audio file from being used.
     * Also disconnects any internal audio nodes.
     */
    clear() {
        this.stop();

        this.source.disconnect();
        this.gainNode.disconnect();
    }
}


export { Sound };
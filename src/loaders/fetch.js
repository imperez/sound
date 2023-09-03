/**
 * @typedef {Object} LoadData
 * @property {AudioBufferSourceNode} source
 * @property {GainNode} gainNode
 */

/**
 *
 * @param {AudioContext} context
 * @param {String} file
 *
 * @return {Promise<LoadData>}
 */
export const load = async (context, file) => {
    const gainNode = context.createGain();
    gainNode.connect(context.destination);

    const response = await window.fetch(file);
    const audioData = await response.arrayBuffer();
    const buffer = await context.decodeAudioData(audioData);
    const source = context.createBufferSource();

    source.buffer = buffer;
    source.connect(gainNode);

    return {
        source,
        gainNode
    };
}

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
 * @return {LoadData}
 */
export const load = async (context, file) => {
    const response = await window.fetch(file);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = await context.decodeAudioData(arrayBuffer);

    const source = context.createBufferSource();
    const gainNode = context.createGain();
    gainNode.connect(context.destination);

    source.buffer = buffer;
    source.connect(gainNode);
    source.connect(context.destination);

    return {
        source,
        gainNode
    };
}

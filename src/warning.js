/**
 * function: warning
 * author  : wq
 * update  : 2019/5/23 15:43
 */
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message)
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message)
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

export default warning

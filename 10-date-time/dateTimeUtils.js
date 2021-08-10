/**
 * Convert JS date object to format `2020-04-28T22:55:03Z`
 */
function toUTCString(date) {
    const yyyy = date.getUTCFullYear();
    const mm1 = String(date.getUTCMonth()).padStart(2, 0);
    const dd = String(date.getUTCDate()).padStart(2, 0);
    const hh = String(date.getUTCHours()).padStart(2, 0);
    const mm2 = String(date.getUTCMinutes()).padStart(2, 0);
    const ss = String(date.getUTCSeconds()).padStart(2, 0);

    return `${yyyy}-${mm1}-${dd}T${hh}:${mm2}:${ss}Z`;
}

module.exports = {
    toUTCString
}

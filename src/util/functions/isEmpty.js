
                /**
                 * verifica se o objeto está vazio.
                 * retorna true se o objeto estiver vazio.
                 * @param {object} obj 
                 * @returns boolean
                 */
module.exports = function isEmpty(obj) {
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}
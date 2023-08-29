/* eslint-disable dot-notation */

// https://www.mongodb.com/docs/drivers/node/current/quick-reference

/**
 * @desc Convert Paging query to mongodb query.
 * @param {object} query - Paging query.
 * @returns {object} - mongodb query.
 */
function parseQuery(query) {
  const o = {};

  if (query) {
    Object.entries(query).forEach(
      ([key, value]) => {
        if (value === '') {
          return;
        }

        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
          o[key] = value;
        } else if (typeof(value) === 'object' && value !== null && value.isValid) { // equality comparison with date object
          o[key] = value;
        } else if (typeof value === 'object' && value !== null && value.hasOwnProperty('like') && typeof value.like === 'string') { // case insensitive comparison
          o[key] = { $regex: value.like, $options: 'is' };
        } else if (typeof value === 'object' && value !== null) {
          o[key] = {};
          if (value.hasOwnProperty('gte') && value.gte.isValid) {
            o[key]['$gte'] = value.gte;
          }
          if (value.hasOwnProperty('gt') && value.gt.isValid) {
            o[key]['$gt'] = value.gt;
          }
          if (value.hasOwnProperty('lte') && value.lte.isValid) {
            o[key]['$lte'] = value.lte;
          }
          if (value.hasOwnProperty('lt') && value.lt.isValid) {
            o[key]['$lt'] = value.lt;
          }
        }
      },
    );
  }

  return o;
}

/**
 * @desc Convert comma delimited sort from query string to mongodb sort query.
 * @param {string} str - string to parse from Paging object.
 * @returns {object} - mongodb sort object.
 */
function parseSort(str) {
  const o = {};

  if (str) {
    const parts = str.split(',');

    parts.forEach((p) => {
      const part = p.trim();
      const sort = part.split(' ');

      if (sort.length === 2) {
        const col = sort[0];
        const order = sort[1].toLowerCase();

        if (order === 'asc') {
          o[col] = 1;
        } else if (order === 'desc') {
          o[col] = -1;
        }
      }
    });
  }

  return o;
}

module.exports = {
  parseQuery,
  parseSort,
};

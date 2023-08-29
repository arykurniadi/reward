const config = require('../config');
const { camelToSnakeCase } = require('./string');

function getPaging(query, searchables) {
  const {
    page: pageOri,
    perPage,
    sort: sortOri,
    ...q
  } = query;

  // set page
  const page = Number(pageOri) || 1;

  // set limit
  const limit = Number(perPage) || config.query.limitDefault;

  // set sort
  let sort = '';
  if (!sortOri) {
    sort = config.query.sortDefault;
  } else {
    const parts = sortOri.split(',');

    parts.forEach((p) => {
      const sorts = p.split(' ');

      if (sorts.length === 2) {
        const sortField = sorts[0].trim();
        const sortValue = sorts[1].trim().toLowerCase();

        if (searchables.includes(sortField) && (sortValue === 'asc' || sortValue === 'desc')) {
          const sortFieldSnakeCase = camelToSnakeCase(sortField);
          sort += `${sortFieldSnakeCase} ${sortValue},`;
        }
      }
    });

    // if there's nothing to sort, use default
    if (sort === '') {
      sort = config.query.sortDefault;
    }

    // remove the last comma
    if (sort.slice(-1) === ',') {
      sort = sort.slice(0, -1);
    }
  }

  // set search
  let search;
  if (Object.keys(q).length > 0) {
    Object.entries(q).forEach((property) => {
      const [k, v] = property;

      if (searchables.includes(k)) {
        if (!search) {
          search = {};
        }
        const fieldName = camelToSnakeCase(k);

        if (typeof(v) === 'string' && v) {
          search[fieldName] = v;
        } else if (typeof(v) === 'number' || typeof(v) === 'boolean') {
          search[fieldName] = v;
        } else if (typeof(v) === 'object' && v !== null && v.isValid) { // equality comparison with date object
          search[fieldName] = v;
        } else if (typeof(v) === 'object' && v !== null && v.hasOwnProperty('like') && typeof v.like === 'string') { // case insensitive comparison
          search[fieldName] = v;
        } else if (typeof(v) === 'object' && v !== null) {
          if (v.hasOwnProperty('gte') && typeof v.gte.isValid) {
            search[fieldName] = v;
          }
          if (v.hasOwnProperty('gt') && typeof v.gt.isValid) {
            search[fieldName] = v;
          }
          if (v.hasOwnProperty('lte') && typeof v.lte.isValid) {
            search[fieldName] = v;
          }
          if (v.hasOwnProperty('lt') && typeof v.lt.isValid) {
            search[fieldName] = v;
          }
        }
      }
    });
  }

  const paging = {
    page,
    offset: (page - 1) * limit,
    limit,
    sort,
    search,
  };

  return paging;
}

module.exports = {
  getPaging,
};

const Ajv = require('ajv');

class SchemaValidator {
  constructor(schema) {
    const ajv = new Ajv();
    this.validator = ajv.compile(schema);
  }

  validate(data) {
    const isValid = this.validator(data);
    return isValid;
  }
}

module.exports = SchemaValidator;

'use strict';


class ExtendableError extends Error {
  constructor(message, extra = {}) {
    super(message);

    this.name = this.constructor.name;
    this.status = extra.status;
    this.data = extra.data;
    this.raw = extra.raw;

    if (typeof Error.captureStackTrace === 'function')
      Error.captureStackTrace(this, this.constructor);
    else
      this.stack = (new Error(message)).stack;
  }
}

class IamporterError extends ExtendableError {}

module.exports = IamporterError;


/**
 ** **
 ** ** ** VALIDATOR [ IsAlpha ]
 ** **
 */
 module.exports.isAlpha = (val, options) => {
    if (!val) return;
  
    //Default and new options
    const defaultOptions = {
      ignoreSpaces: true,
      ignoreCase: true,
      ignoreHyphens: false,
      ignoreDashes: false,
      ignorePunctuations: false,
      ...options,
    };
  
    //Regex Pattern
    const pattern = `^[a-z${defaultOptions.ignoreSpaces ? '\\s' : ''}${
      defaultOptions.ignoreHyphens ? '\\-' : ''
    }${defaultOptions.ignoreDashes ? '\\_' : ''}${
      defaultOptions.ignorePunctuations
        ? '\\-\\_\\.\\,\\"\\\'\\:\\;\\(\\)\\&\\!'
        : ''
    }]+$`;
  
    //Test Regex
    const regex = RegExp(pattern, defaultOptions.ignoreCase ? 'i' : '');
    if (regex.test(val)) return false;
  
    return true;
  };
  
  /**
   ** **
   ** ** ** VALIDATOR [ IsAlphaNumeric ]
   ** **
   */
  module.exports.isAlphaNumeric = (val, options) => {
    if (!val) return;
  
    //Default and new options
    const defaultOptions = {
      ignoreSpaces: true,
      ignoreCase: true,
      ignoreHyphens: false,
      ignoreDashes: false,
      ignorePunctuations: false,
      ...options,
    };
  
    //Regex Pattern
    const pattern = `^[a-z0-9${defaultOptions.ignoreSpaces ? '\\s' : ''}${
      defaultOptions.ignoreHyphens ? '\\-' : ''
    }${defaultOptions.ignoreDashes ? '\\_' : ''}${
      defaultOptions.ignorePunctuations
        ? '\\-\\_\\.\\,\\"\\\'\\:\\;\\(\\)\\&\\!'
        : ''
    }]+$`;
  
    //Test Regex
    const regex = RegExp(pattern, defaultOptions.ignoreCase ? 'i' : '');
    if (regex.test(val)) return false;
  
    return true;
  };
  
  /**
   ** **
   ** ** ** VALIDATOR [ IsNumber ]
   ** **
   */
  module.exports.isNumber = (val, options) => {
    if (!val) return;
  
    //Default and new options
    const defaultOptions = {
      ignoreHyphens: false,
      ignoreDashes: false,
      ...options,
    };
  
    //Regex Pattern
    const pattern = `^[0-9${defaultOptions.ignoreHyphens ? '\\-' : ''}${
      defaultOptions.ignoreDashes ? '\\_' : ''
    }]+$`;
  
    //Test Regex
    const regex = RegExp(pattern, '');
    if (regex.test(val)) return false;
  
    return true;
  };
  
  /**
   ** **
   ** ** ** VALIDATOR [ IsDecimal ]
   ** **
   */
  module.exports.IsDecimal = (val) => {
    if (!val) return;
  
    //Regex Pattern
    const pattern = `^\\d*\\.?\\d+$`;
  
    //Test Regex
    const regex = RegExp(pattern, '');
    if (regex.test(val)) return false;
  
    return true;
  };
  
  /**
   ** **
   ** ** ** VALIDATOR [ IsMin ]
   ** **
   */
  
  module.exports.isMin = (val, { min }) => {
    if (!val) return;
    return val < min;
  };
  
  /**
   ** **
   ** ** ** VALIDATOR [ IsMax ]
   ** **
   */
  module.exports.isMax = (val, { max }) => {
    if (!val) return;
    return val > max;
  };
  
  /**
   ** **
   ** ** ** VALIDATOR [ IsMinLength ]
   ** **
   */
  module.exports.isMinLength = (val, { min }) => {
    if (!val) return;
    return val.length < min;
  };
  
  /**
   ** **
   ** ** ** VALIDATOR [ IsMaxLength ]
   ** **
   */
  module.exports.isMaxLength = (val, { max }) => {
    if (!val) return;
    return val.length > max;
  };
  
  /**
   ** **
   ** ** ** VALIDATOR [ IsDate ]
   ** **
   */
  module.exports.isDate = (val) => {
    if (!val) return;
  
    //Regex Pattern
    const regex = /^[a-z0-9\-_\s]+$/i;
  
    //Test Regex
    if (regex.test(val)) return false;
  
    return true;
  };
  
  /**
   ** **
   ** ** ** VALIDATOR [ IsPassMatched ]
   ** **
   */
  module.exports.isPassMissmatched = (val, { password }) => {
    console.log(val, password);
    if (!val || !password) return;
  
    return val !== password;
  };
  
  /**
   ** **
   ** ** ** VALIDATOR [ IsCard ]
   ** **
   */
  module.exports.isCard = (val) => {
    if (!val) return;
  
    //Regex Pattern
    const regex = /^([0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4})$/;
  
    //Test Regex
    if (regex.test(val)) return false;
    return true;
  };
  
  /**
   ** **
   ** ** ** VALIDATOR [ IsEmail ]
   ** **
   */
  module.exports.isEmail = (val) => {
    if (!val) return;
  
    //Regex Pattern
    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
    //Test Regex
    if (regex.test(val)) return false;
    return true;
  };
  
  /**
   ** **
   ** ** ** VALIDATOR [ IsEmpty ]
   ** **
   */
  module.exports.isEmpty = (val) => {
    if (!val || val.toString().trim() === '' || val.toString().trim() === ' ')
      return true;
  
    return false;
  };
  
  /**
   ** **
   ** ** ** VALIDATOR [ IsEmptyList ]
   ** **
   */
  module.exports.isEmptyList = (val) => {
    if (!val || !val instanceof Array || !val.length > 0) return true;
  
    return false;
  };
  
  /**
   ** **
   ** ** ** VALIDATOR CREATOR
   ** **
   */
  //Create a function that will validate provided [value] against all provided [validators]
  module.exports.createValidator = (validators) => {
    return (val) => {
      //test [val] against all [validators], return immediately if validation failed
      let error, message;
  
      for (let i = 0; i < validators.length; i++) {
        const opt = { ...validators[i].options };
        if (validators[i].validator(val, opt)) {
          error = true;
          message = validators[i].message;
          return [error, message];
        }
      }
      return [error, ''];
    };
  };
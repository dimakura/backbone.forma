exports.utils = (function() {

  var counter = 0;

  var utils = {

    /**
     * Generates next ID.
     */
    nextId: function() { return 'formaid-' + ( counter++ ); }

  };

  return utils;

})();
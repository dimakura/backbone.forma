/**
 * Icon engine can be overriden in `forma.iconEngine`.
 */
exports.FontAwesomeIconEngine = {
  generateIcon: function(name) {
    return new forma.html.Tag('i', {class: ['fa', 'fa-'+name]}).toHtml();
  }
};

exports.iconEngine = exports.FontAwesomeIconEngine;
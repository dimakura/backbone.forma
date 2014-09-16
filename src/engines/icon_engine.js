
exports.DefaultIconEngine = {
  generateIconTag: function(name, opts) {
    var classNames = ['fa', 'fa-' + name];

    if( opts && opts.class ) { classNames.push(opts.class); }

    return new forma.html.Tag('i', {class: classNames});
  }
};

exports.iconEngine = exports.DefaultIconEngine;

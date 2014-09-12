exports.html = (function() {

  var html = {};

  /* html tag */

  html.Tag = (function() {

    /**
     * new forma.html.Tag([name], [options], [children])
     *
     */
    var Tag = function() {
      for(var i = 0, l = arguments.length; i < l; i++) {
        var argValue = arguments[i];
        if (typeof argValue === 'string' && !this.name) {
          this.name = argValue;
        } else if (typeof argValue === 'string') {
          this.children = argValue;
        } else if (argValue instanceof Array) {
          if (!this.children) { this.children = argValue; }
        } else if (argValue instanceof Object) {
          if(!this.parameters) { this.parameters = argValue; }
        }
      }
      this.name = this.name || 'div';
    };

    var parameterPair = function(params, key) {
      var value = params[key];
      if (value instanceof Array) {
        value = value.join(' '); // class: ['a', 'b'] => class="a b"
      } else if (typeof value === 'object') {
        value = _.keys(value).map(function(key) {return key + ':' + value[key]}).join(';');
      }
      return key + '="' + value + '"';
    };

    var tagStart = function() {
      var self = this;
      var ary = ['<', self.name];
      if (self.parameters) {
        var parametersArray = [];
        _.keys(self.parameters).forEach(function(key) {
          parametersArray.push(parameterPair(self.parameters, key));
        });
        ary.push(' ' +parametersArray.join(' '));
      }
      ary.push('>');
      return ary.join('');
    };

    var tagEnd = function() {
      return ['</', this.name, '>'].join('');
    };

    var tagBody = function() {
      if (typeof this.children === 'string') {
        return this.children;
      } else if (this.children instanceof Array) {
        return this.children.filter(function(x) {
          return x;
        }).map(function(child) {
          if (typeof child === 'string') { return child; }
          else if (typeof child.toHtml === 'function') { return child.toHtml(); }
          else { return child.toString(); }
        }).join('');
      }
    };

    Tag.prototype.toHtml = function() {
      return [
        tagStart.apply(this),
        tagBody.apply(this),
        tagEnd.apply(this)
      ].join('');
    };

    return Tag;
  })();

  return html;

})();

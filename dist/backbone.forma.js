!function(exports, global) {
    global.forma = exports;
    var FormaError = function(message) {
        this.name = "FormaError", this.message = message, this.stack = new Error().stack;
    };
    FormaError.prototype = new Error(), FormaError.prototype.constructor = FormaError, 
    exports.FormaError = FormaError, exports.Form = function() {
        var Form = function() {};
        return Form;
    }(), exports.html = function() {
        var html = {};
        return html.Tag = function() {
            var Tag = function() {
                for (var i = 0, l = arguments.length; l > i; i++) {
                    var argValue = arguments[i];
                    "string" != typeof argValue || this.name ? "string" == typeof argValue ? this.children = argValue : argValue instanceof Array ? this.children || (this.children = argValue) : argValue instanceof Object && (this.parameters || (this.parameters = argValue)) : this.name = argValue;
                }
                this.name = this.name || "div";
            }, parameterPair = function(params, key) {
                var value = params[key];
                return value instanceof Array ? value = value.join(" ") : "object" == typeof value && (value = _.keys(value).map(function(key) {
                    return key + ":" + value[key];
                }).join(";")), key + '="' + value + '"';
            }, tagStart = function() {
                var self = this, ary = [ "<", self.name ];
                if (self.parameters) {
                    var parametersArray = [];
                    _.keys(self.parameters).forEach(function(key) {
                        parametersArray.push(parameterPair(self.parameters, key));
                    }), ary.push(" " + parametersArray.join(" "));
                }
                return ary.push(">"), ary.join("");
            }, tagEnd = function() {
                return [ "</", this.name, ">" ].join("");
            }, tagBody = function() {
                return this.children ? "string" == typeof this.children ? this.children : void (this.children instanceof Array) : "";
            };
            return Tag.prototype.toHtml = function() {
                return [ tagStart.apply(this), tagBody.apply(this), tagEnd.apply(this) ].join("");
            }, Tag;
        }(), html;
    }();
}({}, function() {
    return this;
}());
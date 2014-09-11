!function(exports, global) {
    global.Forma = exports;
    var FormaError = function(message) {
        this.name = "FormaError", this.message = message, this.stack = new Error().stack;
    };
    FormaError.prototype = new Error(), FormaError.prototype.constructor = FormaError, 
    exports.FormaError = FormaError;
    var Field = function(options) {
        if (!options) throw new exports.FormaError("No properties specified for the field");
        this.name = options.name, this.type = options.type;
    };
    Field.prototype.template = function() {
        return _.template('<input name="' + this.name + '">');
    }, exports.Field = Field;
    var Form = function(fields) {
        this.fields = fields || [];
    };
    exports.Form = Form;
}({}, function() {
    return this;
}());
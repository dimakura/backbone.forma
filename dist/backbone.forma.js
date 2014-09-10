!function(exports, global) {
    global.Forma = exports;
    var Field = function(name) {
        this.name = name;
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
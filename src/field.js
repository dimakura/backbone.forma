var FIELD_TYPES = [
  'text',
  'password',
];

var Field = function(options) {
  if(!options) { throw new exports.FormaError('No properties specified for the field'); }
  this.name = options.name;
  this.type = options.type || 'text';
};

Field.prototype.template = function() {
  return _.template('<input name="' + this.name + '" type="' + this.type + '"">');
};

exports.Field = Field;

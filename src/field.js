var Field = function(name) {
  this.name = name;
};

Field.prototype.template = function() {
  return _.template('<input name="' + this.name + '">');
};

exports.Field = Field;
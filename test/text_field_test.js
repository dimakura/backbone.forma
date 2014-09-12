QUnit.test( "text field with name", function( assert ) {
  var textField = new forma.TextField('username');
  assert.equal(textField.name, 'username');
});

QUnit.test( "text field with complex attributes", function( assert ) {
  var textField = new forma.TextField({
    name: 'username',
    required: true,
    label: 'Username',
    hidden: false
  });
  assert.equal(textField.name, 'username');
  assert.equal(textField.required, true);
  assert.equal(textField.label, 'Username');
  assert.equal(textField.hidden, false);
});
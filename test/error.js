QUnit.test( "error creation", function( assert ) {
  var error = new forma.Error('severe error!');
  assert.equal(error.name, 'FormaError');
  assert.equal(error.message, 'severe error!');
  assert.ok(error.stack);
});
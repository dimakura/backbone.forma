QUnit.test( "form with title", function( assert ) {
  var form = new forma.Form('my form');
  assert.equal(form.title, 'my form');
});

QUnit.test( "form with complex attributes", function( assert ) {
  var form = new forma.Form({
    title: 'system login',
    icon: 'user',
  });
  assert.equal(form.title, 'system login');
  assert.equal(form.icon, 'user');
});
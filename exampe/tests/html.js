QUnit.test( "simple tag", function( assert ) {
  var p = new forma.html.Tag('p', 'this is a simple paragraph');
  assert.equal(p.toHtml(), '<p>this is a simple paragraph</p>');
});

QUnit.test( "complex tag", function( assert ) {
  var div = new forma.html.Tag('div', {
    id: 'main',
    class: ['class1', 'class2'],
    style: {size: '12px', color: 'red'}
  }, 'test');
  assert.equal(div.toHtml(), '<div id="main" class="class1 class2" style="size:12px;color:red">test</div>');
});

QUnit.test( "nested tags", function( assert ) {
  var div = new forma.html.Tag('p', [
    'first text ',
    'second text'
  ]);
  assert.equal(div.toHtml(), '<p>first text second text</p>');
});
$(function() {
  // --------------STEP 1--------------
  // wrap every word in every `<p>` tag with a `<span>` tag.
  // for example: <p>Hey there</p>
  // becomes: <p><span>Hey</span><span>there</span></p>
  // HINT: the `split` array method is your friend

  let [$p1, $p2] = [$('p:eq(0)'), $('p:eq(1)')];
  let [sp1, sp2] = [$p1, $p2].map(p => p
    .text().trim().split(' ')
    .map(word => $('<span>' + word + ' </span>'))
  );

  $p1.html(sp1);
  $p2.html(sp2);


  // --------------STEP 2--------------
  // Next, change spans to random colors, once per second

  let randomColor = () =>
    '#' + Math.floor(Math.random() * Math.pow(2,24)).toString(16);
  let setSpansRandomColor = () => $('span').each(function(idx) {
    $(this).css('color', randomColor());
  });

  setSpansRandomColor();
  setInterval(setSpansRandomColor, 1000);

});

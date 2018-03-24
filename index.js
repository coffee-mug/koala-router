const Koa = require('koa'),
      app = new Koa(),
      Trie = require('./trie.js');

var router = Trie.createTrie();

router.add('/', async ctx => {
  ctx.body = "Hello World";
});

router.add('/lol', async ctx => {
  ctx.body = "POL";
});

app.use(async ctx => {
  let route = ctx.request.url;

  let handler = router.get(route);

  handler(ctx);
})


app.listen(8000);

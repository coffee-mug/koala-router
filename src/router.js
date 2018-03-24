const Trie = require('./trie.js'),
      fs = require('fs');

const routerMethods = {
  handleRequests: async function handle(ctx) {
    let route = ctx.request.url;
    let handler = this.get(route);

    if (!handler) {
      // 404
      ctx.response.status = 404;
      return;
    }

    if (typeof handler == "string") {
      // File to render
      // https://stackoverflow.com/questions/24024566/display-a-static-html-file-with-koa-js
      ctx.type = "html";
      ctx.body = fs.createReadStream(handler);
      return;
    }
    return handler(ctx);
  }
}
// Route middleware for koa.js
function createRouter() {
  const trie = Trie.createTrie();
  return Object.assign(trie, routerMethods);
}

module.exports = { "create": createRouter };

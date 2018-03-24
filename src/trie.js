// Factories functions
function createNode() {
  let node = {
    value: null,
    next: new Array(256)
  }
  return Object.create(node);
}

function createTrie(root, radix=256) {
  root = root || createNode();

  var source = {
    root: root,
    radix: radix
  }

  var methods = {
    traverse(node, key, index) {
      if (!node)
        return null;

      if (index == key.length) {
        return node.value
      }

      console.log("Key", key, "index", index);
      var nextChar = key[index].charCodeAt();
      return this.traverse(node.next[nextChar], key, index + 1)
    },
    put(node, key, index, value) {
      if (!node) {
        node = createNode()
      }
      if (index == key.length) {
        node.value = value
        return node
      }
      var nextChar = key[index].charCodeAt();
      node.next[nextChar] = this.put(node.next[nextChar], key, index + 1, value)
      return node;
    },
    add(key, value) {
      return this.put(this.root, key, 0, value);
    },
    get(key) {
      return this.traverse(this.root, key, 0);
    },
  }

  // Object.assign and create methods allow us to "hide" some methods by making them
  // delegated instead of copied as a property of the object
  // Let's leverage this to hide initialization aspects (radix and root)
  let hidden = Object.create(source);
  return Object.assign(hidden, methods);
}

// TODO: Implement unit tests once wi-fi back
module.exports = { "createTrie": createTrie };

function Node(value, left, right, parent = "", children = []) {
  this.value = value;
  this.right = right;
  this.left = left;
  this.parent = parent;
  this.children = children;
  this.isRight = null;
  this.isLeft = null;
}

function createTree(arr) {
  for (var i = 1; i < arr.length; i++) {
    nodeDirection(arr[0], arr[i]);
  }

  createData(arr[0]);
  remove();
  try {
    drawGraph(arr);
  } catch {
    console.log("No Input");
  }
}

function remove() {
  var graph = document.querySelector("svg");
  if (graph) {
    graph.parentElement.removeChild(graph);
  }
}

function nodeDirection(root, node) {
  var a = Number(node.value);
  var b = Number(root.value);
  if (a < b) {
    if (root.left == null) {
      root.left = node;
      node.isLeft = true;
    } else {
      nodeDirection(root.left, node);
    }
  } else if (a > b) {
    if (root.right == null) {
      root.right = node;
      node.isRight = true;
    } else {
      nodeDirection(root.right, node);
    }
  }
}

function createData(node) {
  if (node == null) {
    return;
  }

  if (node.left) {
    node.children.push(node.left);
    node.left.parent = node;
    if (!node.right) {
      let newNode = new Node("Empty", null, null);
      newNode.isRight = true;
      node.children.push(newNode);
      newNode.parent = node;
    }
  }

  if (node.right) {
    node.children.push(node.right);
    node.right.parent = node;
    if (!node.left) {
      let newNode = new Node("Empty", null, null);
      newNode.isLeft = true;
      node.children.unshift(newNode);
      newNode.parent = node;
    }
  }

  createData(node.left);
  createData(node.right);
}

function createNodes(list) {
  new_list = [];

  for (var i = 0; i < list.length; i++) {
    if (list[i] == "") {
      continue;
    }
    new_list.push(new Node(list[i], null, null));
  }

  createTree(new_list);

  if (new_list.length != 0) {
    document.querySelector(".btn").disabled = false;
  } else {
    document.querySelector(".btn").disabled = true;
  }

  return new_list;
}

function bfs() {
  clearAnimations();
  var root = globalTree;
  if (!root) return;
  var queue = [root];
  var i = 0;

  while (queue.length > 0) {
    var node = queue.shift();

    (function (n, index) {
      setTimeout(() => {
        fillToColor(n.value, "gold");
      }, index * 1200);
    })(node, i);

    i++;

    if (node.left) queue.push(node.left);
    if (node.right) queue.push(node.right);
  }
  let result = [];
  if (globalTree) {
    let queue = [];
    queue.push(globalTree);
    while (queue.length) {
      let currentNode = queue.shift();
      result.push(currentNode.value);
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
  }
  displayResult(result);
}

function dfs() {
  clearAnimations();
  var root = globalTree;
  if (!root) return;
  var stack = [root];
  var i = 0;

  while (stack.length > 0) {
    var node = stack.pop();

    (function (n, index) {
      setTimeout(() => {
        fillToColor(n.value, "gold");
      }, index * 1200);
    })(node, i);

    i++;

    if (node.right) stack.push(node.right);
    if (node.left) stack.push(node.left);
  }
  let result = [];
  function traverse(node) {
    if (!node) return;
    result.push(node.value);
    traverse(node.left);
    traverse(node.right);
  }
  traverse(globalTree);
  displayResult(result);
}

function displayResult(result) {
  let resultDiv = document.getElementById("traversalResult");
  let traversalContainer = document.getElementById("traversalContainer");

  resultDiv.textContent = result.join(" -> ");
  traversalContainer.style.display = "block";
}

function clearAnimations() {
  var circles = document.querySelectorAll(".node");
  circles.forEach((circle) => {
    circle.firstChild.classList.remove("green");
    circle.firstChild.classList.remove("gold");
    circle.firstChild.classList.remove("gray");
  });
}

function clearAndCreate() {
  globalTree = getRoot()[0];
}

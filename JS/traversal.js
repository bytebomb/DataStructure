const tree = {
  val: "a",
  children: [
    {
      val: "b",
      children: [{ val: "d" }, { val: "e" }]
    },
    {
      val: "c",
      children: [{ val: "f" }, { val: "g" }]
    }
  ]
}

// 广度优先遍历
/*
1.根节点放入队列  
2.遍历开始，根节点出队列，子节点入队列
3.遍历结束
*/
const breadthFirstTraversal = node => {
  const result = []
  const queue = []
  queue.push(node)
  while (queue.length) {
    let current = queue.shift()
    result.push(current.val)
    current.children?.forEach(ele => {
      queue.push(ele)
    });
  }
  return result
}


// 深度度优先遍历
/*
1.获取根节点 
2.递归遍历，获取子节点
3.遍历结束
*/

const deepthFirstTraversal = node => {
  const result = []
  return function traversal(node) {
    result.push(node.val)
    node.children?.forEach(traversal)
    return result
  }(node)
}
console.log(breadthFirstTraversal(tree))
// console.log(deepthFirstTraversal(tree))
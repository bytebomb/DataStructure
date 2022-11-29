## 栈(Stack)
**特点**：
- 先进后出(FILO)

**实现方式**
- 一般基于数组实现
```javascript
class Stack {
  constructor() {
    this.items = []
  }
  //1.入一个新的元素
  push(item) {
    this.items.push(item)
  }

  //2.pop弹出栈顶元素
  pop() {
    return this.items.pop()
  }

  //3.查看栈顶元素
  peek() {
    return this.items[this.items.length - 1]
  }

  //4.判断栈是否为空
  isEmpty() {
    return !this.items.length
  }

  //5.返回栈中元素的个数
  size() {
    return this.items.length
  }

  //6.将栈结构的内容以字符串形式返回
  toString() {
    return this.items.join(" ")
  }
}

// 应用：十进制转成二进制
const dec2bin = (decNumber) => {
  let data = new Stack()
  // 除二取余
  while (decNumber > 0) {
    data.push(decNumber % 2)
    decNumber = Math.floor(decNumber / 2)
  }

  // 倒序排列
  let binaryString = ''
  while (!data.isEmpty()) {
    binaryString += data.pop()
  }

  return binaryString
}
console.log(dec2bin(100))
```

## 队列(Queue)
**特点**：
- 先进先出（FIFO)

**实现方式**
- 一般基于数组实现
```javascript
class Queue {
  constructor() {
    this.items = []
  }
  //1.入队一个新的元素
  enqueue(item) {
    this.items.push(item)
  }

  //2.出队第一个元素
  dequeue() {
    return this.items.shift()
  }

  //3.查看队首元素
  front() {
    return this.items[0]
  }

  //4.判断队列是否为空
  isEmpty() {
    return !this.items.length
  }

  //5.返回队列中元素的个数
  size() {
    return this.items.length
  }

  //6.将队列的内容以字符串形式返回
  toString() {
    return this.items.join(" ")
  }
}

// 应用：击鼓传花游戏
const passGame = (nameList, num) => {
  let q = new Queue()
  // 所有人入队列
  for (let i = 0; i < nameList.length; i++) {
    q.enqueue(nameList[i])
  }
  while (q.size() > 1) {
    // 开始数数
    for (let i = 1; i < num; i++) {
      // 没数到num的人，将他放到队尾
      q.enqueue(q.dequeue())
    }
    // 数到num的人，将之淘汰
    q.dequeue()
  }
  // 循环结束，剩最后一个人
  return q.front()
}
let l = [1, 2, 3, 4, 5, 6, 7, 8, 9,0]
console.log(passGame(l, 4));
```
## 优先级队列(PriorityQueue)
**特点**：
- 具有优先级的队列(即可以插队的队列)

**实现方式**
- 将队列的插入方式升级一下，即根据优先级插入
```javascript
class PriorityQueue {
  constructor() {
    this.items = []
  }
  //1.入队一个新的元素
  enqueue(item, priority) {
    let ele = { item, priority }
    if (this.items.length === 0) {
      this.items.push(ele)
    } else {
      let isAdd = false
      for (let i = 0; i < this.items.length; i++) {
        if (ele.priority > this.items[i].priority) {
          // 根据优先级插入到对应的位置
          this.items.splice(i, 0, ele)
          isAdd = true
          // 不break就会造成死循环（因为插入元素，数组长度一直在增加
          break
        }
      }
      // 如果优先最小则插入到队尾
      if (!isAdd) this.items.push(ele)
    }
  }

  //2.出队第一个元素
  dequeue() {
    return this.items.shift()
  }

  //3.查看队首元素
  front() {
    return this.items[0]
  }

  //4.判断队列是否为空
  isEmpty() {
    return !this.items.length
  }

  //5.返回队列中元素的个数
  size() {
    return this.items.length
  }

  //6.将队列的内容以字符串形式返回
  toString() {
    let res = ''
    for (let i = 0; i < this.items.length; i++) {
      res += this.items[i].item + " "
    }
    return res
  }
}
```

## 链表(LinkedList)
**特点**：
- 链表由元素本身和指向下一个元素的引用组成
- 相比于数组的优点
    - 链表中的元素在内存中不必是连续的
    - 不必在创建时确定大小
    - 插入和删除时时间复杂度为O(1),效率高
- 相比于数组的缺点
    - 链表进行元素访问时，无法通过下标直接访问元素，必须从第一个开始，不能跳过其中的任何一个元素
    

**实现方式**
- 将队列的插入方式升级一下，即根据优先级插入

```javascript
// 链表
class Node {
  constructor(data) {
    this.data = data
    this.next = null
  }
}
class LinkedList {
  constructor() {
    this.head = null
    this.length = 0
  }
  // 追加
  append(data) {
    let newNode = new Node(data)
    if (this.length === 0) {
      //第一个元素是头节点
      this.head = newNode
    } else {
      let current = this.head
      while (current.next) {
        // 找到最后一个节点
        current = current.next
      }
      //最后一个节点指向新的节点
      current.next = newNode
    }
    // 链表长度加一
    this.length += 1
  }

  // 插入
  insert(position, data) {
    if (position < 0 || position > this.length) return false
    let newNode = new Node(data)
    if (position === 0) {
      newNode.next = this.head
      this.head = newNode
    } else {
      let previous = this.head
      while (--position) {
        // 将指针移动到position - 1处
        // while(--i)执行顺序是：先--再判断，再执行
        // while(i--)执行顺序是：先判断再--，再执行
        // for()是先判断，再执行，再--
        // while(i--) 将会循环i次 ，while(--i)将会循环i-1次
        // position为1时，不执行，此时pevious=head
        previous = previous.next
      }
      newNode.next = previous.next
      previous.next = newNode
    }
    this.length += 1
  }

  // 根据下标获取元素
  get(position) {
    if (position < 0 || position >= this.length) return false
    let current = this.head
    while (position--) {
      current = current.next
    }
    return current.data
  }

  // 根据元素获取下标
  indexOf(data) {
    let index = 0
    let current = this.head
    while (current) {
      if (current.data === data) {
        return index
      }
      index++
      current = current.next
    }
    // 没找到，返回-1
    return -1
  }

  // 根据下标修改元素(和get相似)
  update(position, data) {
    if (position < 0 || position >= this.length) return false
    let current = this.head
    while (position--) {
      current = current.next
    }
    current.data = data
    return true

  }
  // 根据下标删除元素
  removeAt(position) {
    if (position < 0 || position >= this.length) return false
    if (position === 0) {
      this.head = this.head.next
      this.length--
    } else {
      let previous = this.head
      let current = this.head.next
      while (--position) {
        previous = previous.next
        current = current.next
      }
      previous.next = current.next
    }
    this.length--
    return true
  }

  // 根据元素值删除元素(调用indexOf和removeAt就行)
  remove(data) {
    let position = this.indexOf(data)
    this.removeAt(position)
  }
  // 链表判空
  isEmpty() {
    return this.length === 0
  }
  // 节点个数
  size() {
    return this.length
  }
  // 转成字符串输入
  toString() {
    let str = ""
    let current = this.head
    while (current) {
      str += current.data + ' '
      current = current.next
    }
    return str
  }
}
let list = new LinkedList()
list.append(1)
list.append(2)
list.append(3)
list.append(4)
list.append(5)

list.insert(0, 6)
console.log(list.get(1));
console.log(list.indexOf(6));
console.log(list.update(0, 0));
console.log(list.remove(3));
console.log(list.toString());
```

## 双向链表(DoublyLinkedList)
**特点**：
- 可以从头部遍历到尾部，也可以从尾部遍历到头部
- 相比于单向链表的优点
    - 可以双向遍历
- 相比于单向链表的缺点
    - 插入和删除时要考虑4个引用，实现麻烦
    - 占据空间大
    

**实现方式**
- 根据单向链表，考虑双向的情况
```javascript
// 双向链表
class DoublyLinkedNode {
  constructor(data) {
    this.data = data
    this.prev = null
    this.next = null
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = null
    this.tail = null
    this.length = 0
  }
  // 追加
  append(data) {
    let newNode = new Node(data)
    if (this.length === 0) {
      //第一个元素是头节点也是尾部节点
      this.head = newNode
      this.tail = newNode
    } else {
      newNode.prev = this.tail
      this.tail.next = newNode
      this.tail = newNode
    }
    // 链表长度加一
    this.length += 1
  }

  // 插入
  insert(position, data) {
    if (position < 0 || position > this.length) return false
    let newNode = new Node(data)
    if (this.length === 0) {
      this.head = newNode
      this.tail = newNode
    } else {
      // 分3种情况
      if (position === 0) {
        // 在头部插
        newNode.next = this.head
        newNode.prev = this.head.prev
        this.head = newNode
      } else if (position === this.length) {
        //在尾部插
        this.append(data)
      } else {
        //在中间插
        let current = this.head
        while (position--) {
          //先找到current
          current = current.next
        }
        newNode.next = current
        newNode.prev = current.prev
        current.prev.next = newNode
        current.prev = newNode
      }

    }
    this.length += 1
  }

  // 根据下标获取元素
  get(position) {
    if (position < 0 || position >= this.length) return false
    let current = this.head
    while (position--) {
      current = current.next
    }
    return current.data
  }

  // 根据元素获取下标
  indexOf(data) {
    let index = 0
    let current = this.head
    while (current) {
      if (current.data === data) {
        return index
      }
      index++
      current = current.next
    }
    // 没找到，返回-1
    return -1
  }

  // 根据下标修改元素(和get相似)
  update(position, data) {
    if (position < 0 || position >= this.length) return false
    let current = this.head
    while (position--) {
      current = current.next
    }
    current.data = data
    return true

  }
  // 根据下标删除元素
  removeAt(position) {
    if (position < 0 || position >= this.length) return false
    if (this.length === 1) {
      this.head = null
      this.tail = null
    } else {
      if (position === 0) {
        this.head = this.head.next
        this.length--
      } else if (position === this.length - 1) {
        this.tail = this.tail.prev
        this.tail.next = null
      } else {
        let current = this.head
        while (position--) {
          current = current.next
        }
        current.prev.next = current.next
        current.next.prev = current.prev
      }
    }
    this.length--
    return true
  }

  // 根据元素值删除元素(调用indexOf和removeAt就行)
  remove(data) {
    let position = this.indexOf(data)
    this.removeAt(position)
  }
  // 链表判空
  isEmpty() {
    return this.length === 0
  }
  // 节点个数
  size() {
    return this.length
  }

  // 向前输出
  forwardString() {
    let str = ""
    let current = this.tail
    while (current) {
      str += current.data + ' '
      current = current.prev
    }
    return str
  }

  // 向后输出
  backwardString() {
    let str = ""
    let current = this.head
    while (current) {
      str += current.data + ' '
      current = current.next
    }
    return str
  }
}

let list = new DoublyLinkedList()
list.append(1)
list.append(2)
list.append(3)
list.append(4)
list.append(5)

list.insert(2, 6)
list.update(2, 0)
list.remove(0 )
console.log(list.backwardString())
console.log(list.get(0))
console.log(list.indexOf(2))
```

## 哈希表(HashTable) 
**特点**：
- 可以提供非常快的查找-删除和插入操作
- 相比于数组的优点
    - 插入和删除操作效率比数组高 
    - 进行查找时
        - 如果是根据下标查找，数组效率高
        - 如果根据内容查找，数组效率很低
- 相比于树的优点
    - 速度比树快，编码效率比树高 

**缺点**    
- 表中的元素是无序的，key是不允许重复的，空间利用率低

**实现方式**
- 基于数组实现，将数组的下标值通过hash函数进行变换获取hashcode,用于解决数组插入和删除效率低的问题
- 一个大的数字转化成数组范围内下标的过程叫做哈希化，这个转化的函数叫做哈希函数，最终将数据插入到数组中，对整个结构进行封装，就形成了hash table
- 哈希化得到重复的下标叫做冲突
- 解决冲突的方法：
    - 链地址法（拉链法）：每个元素存成数组或者链表
    - 开放地址法：寻找空白的地方来存储，探测有3种方法：线性探测、二次探测、再哈希法
- 哈希函数的选择
    - 快速计算：不能太过复杂，尽量少的使用乘法和除法
    - 均匀分布：要让存储的元素尽量均匀的分布在数组中，size和步长尽量选择质数
    
**扩容**  
由于bucket是遍历查找，当bucket越来越长时，效率就会越来越慢，所以要进行扩容
- 装载因子：loadfactor=count/length
- 当loadfactor<0.25时空间进行压缩
- 当loadfactor>0.75时空间进行扩容

**质数**  
根据数论原理，容量为质数有助于元素在哈希表中的均匀分布，所以扩容时最好使容量为质数

```javascript
// 哈希表（拉链法）
class HashTable {
  constructor() {
    this.storage = []//存储空间
    this.count = 0 //已经存在的个数
    this.length = 7 //空间的大小
  }

  //哈希函数
  hashFn(str, size) {
    let hashCode = 0
    //1.将字符串转成较大的数字：hashCode
    for (let i = 0; i < str.length; i++) {
      hashCode = hashCode * 37 + str.charCodeAt(i) //37是一个常用的质数
    }
    //2.将hash压缩到数组范围之内
    return hashCode % size
  }

  //判断质数
  isPrime(num) {
    //方法一：遍历2->num-1是否能被整除
    //方法二：一个数若可以被因素分解，一个数一定小于等于sqrt(num),另一个数一定大于等于sqrt(num)。比如16
    let n = parseInt(Math.sqrt(num))
    for (let i = 2; i <= n; i++) {
      if (num % i == 0) return false
    }
    return true
  }

  //获取质数
  getPrime(num) {
    while (!this.isPrime(num)) {
      num++
    }
    return num
  }

  // 插入&修改操作
  put(key, value) {
    // 1.根据key获取对应的index
    let index = this.hashFn(key, this.length)
    // 2.根据index取出相对应的bucket
    let bucket = this.storage[index]

    // 3.创建
    if (!bucket) {
      bucket = []
      this.storage[index] = bucket

    }
    // 4.修改
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i]
      if (tuple[0] === key) {
        tuple[1] = value
        return
      }
    }
    // 5.添加
    bucket.push([key, value])
    this.count += 1

    // 判断是否需要扩容
    if (this.count / this.length > 0.75) {
      this.resize(this.getPrime(this.length * 2))
    }
  }

  // 获取操作
  get(key, value) {
    // 1.根据key获取对应的index
    let index = this.hashFn(key, this.length)

    // 2.根据index取出相对应的bucket
    let bucket = this.storage[index]

    // 3.判断bucket是否存在
    if (bucket === null) {
      return null
    }

    // 4.在buckent中找
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i]
      if (tuple[0] === key) {
        return tuple[1]
      }
    }
    // 5.没找到
    return null
  }

  // 删除操作
  remove(key, value) {
    // 1.根据key获取对应的index
    let index = this.hashFn(key, this.length)

    // 2.根据index取出相对应的bucket
    let bucket = this.storage[index]

    // 3.判断bucket是否存在
    if (bucket === null) {
      return null
    }

    // 4.在buckent中找
    for (let i = 0; i < bucket.length; i++) {
      let tuple = bucket[i]
      if (tuple[0] === key) {
        bucket.splice(i, 1)
        this.count--
        // 判断是否需要减少容量
        if (this.length > 7 && this.count / this.length < 0.25) {
          let newSize = this.getPrime(Math.floor(this.length / 2))
          this.resize(newSize)
        }
        return tuple[1]
      }
    }
    // 5.没找到
    return null
  }

  // 扩容
  resize(newLength) {
    // 1.保留旧的数据
    let oldStorage = this.storage

    // 2.新建数据
    this.storage = []
    this.count = 0
    this.length = newLength
    // 3.数据迁移
    for (let i = 0; i < oldStorage.length; i++) {
      // 取出桶里的数据
      let bucket = oldStorage[i]
      // 判断桶为空的情况
      if (!bucket) continue
      // 遍历桶
      for (let j = 0; j < bucket.length; j++) {
        // 取出数据，重新存
        let tuple = bucket[j]
        this.put(tuple[0], tuple[1])
      }
    }

  }

  // 判空
  isEmpty() {
    return !this.count
  }

  // 获取个数
  size() {
    return this.length
  }
}

let ht = new HashTable()
ht.put("a", 1)
ht.put("b", 2)
ht.put("c", 3)
ht.put("d", 3)
ht.put("e", 3)
ht.put("f", 3)
ht.put("g", 3)
ht.put("h", 3)
console.log(ht.size());

ht.remove("b")
ht.remove("c")
ht.remove("d")
ht.remove("e")
ht.remove("f")
console.log(ht.size());
```

## 树结构(Tree) 
**特点**：
- 综合了数组，链表，哈希表等的优点，比较全，但不专

**二叉树**： 

每一个节点最多只有两个子节点的树称为二叉树，事实上每一棵树都能通过“儿子-兄弟”的表示法转化为二叉树。

**二叉树的特性**： 
- 对于非空的二叉树(k>=1)
    - 深度为k的二叉树拥有的最大节点总数为2^k-1
    - 第i层的二叉树最大节点总数为2^(i-1)
    - 若n0表示叶子节点的个数，n2表示度为2的非叶子节点的个数，n0=n2+1 
    
**完美二叉树**

除了最下层，每一层的子节点树都为二

**完全二叉树**

除了最下层，每一层的节点总数都达到最大，倒数第二层只能缺右子节点，并且本层节点的子节点不能比前一个节点的子节点多，完全二叉树包含完美二叉树

**实现方式**
- 数组一般用于表示完全二叉树，如果表示不完全二叉树，要转换成完全二叉树，但这会造成空间浪费
- 所以一般用链表来表示二叉树

### 二叉搜索树(BST,binary search tree)
**特点**
- 二叉搜索树属于二叉树，可以为空
- 如果非空，则要满足
    - 非空左子树的所有键值要小于其根节点的键值
    - 非空右子树的所有键值要大于其根节点的键值
    - 左右子树本身也是二叉搜索树
- 以上特性导致二叉搜索树的查找、插入、删除效率高效率非常高，时间复杂度为O(logN)


**遍历**

根据父节点的位置：
- 前序遍历
- 中序遍历
- 后序遍历

**前驱&后继**
- 比节点小一点点数为节点的前驱，节点的前驱一定是左子树中的最大值
- 比节点大一点点数为节点的后继，节点的后继一定是右子树中的最小值
```javascript
class TreeNode {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}
class BinarySearchTree {
  constructor() {
    this.root = null
  }

  //插入节点
  insertNode(node, newNode) {
    if (node.key > newNode.key) {
      //向左查找
      if (node.left == null) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)// 递归查找
      }
    } else {
      //向右查找
      if (node.right == null) {
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)// 递归查找
      }
    }
  }
  // 插入
  insert(key) {
    // 1.根据key创建新的节点
    let newNode = new TreeNode(key)

    // 2.判断根节点是否有值
    if (this.root == null) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }
  // 遍历
  // 1.前序遍历
  preOrderTraversal(handler) {
    this.preOrderTraversalNode(this.root, handler)
  }
  preOrderTraversalNode(node, handler) {
    // 递归，调用栈原理，以下3个处理函数的顺序决定了遍历顺序    
    if (node !== null) {
      // 处理经过的节点
      handler(node.key)
      // 处理左节点
      this.preOrderTraversalNode(node.left, handler)
      // 处理右节点节点
      this.preOrderTraversalNode(node.right, handler)
    }
  }
  // 2.中序遍历
  midOrderTraversal(handler) {
    this.midOrderTraversalNode(this.root, handler)
  }
  midOrderTraversalNode(node, handler) {
    // 递归
    if (node !== null) {
      // 处理左节点
      this.midOrderTraversalNode(node.left, handler)
      // 处理经过的节点
      handler(node.key)
      // 处理右节点节点
      this.midOrderTraversalNode(node.right, handler)
    }
  }
  // 3.后序序遍历
  postOrderTraversal(handler) {
    this.postOrderTraversalNode(this.root, handler)
  }
  postOrderTraversalNode(node, handler) {
    // 递归
    if (node !== null) {
      // 处理左节点
      this.postOrderTraversalNode(node.left, handler)
      // 处理右节点节点
      this.postOrderTraversalNode(node.right, handler)
      // 处理经过的节点
      handler(node.key)
    }
  }

  //搜索是否存在
  // 方法一:使用以上遍历的方法
  // 方法二：使用循环
  search(key) {
    let node = this.root
    while (node) {
      if (node.key > key) {
        node = node.left
      } else if (node.key < key) {
        node = node.right
      } else {
        return true
      }
    }
    return false
  }
  // 获取最大值(即最右边的值)
  max() {
    let node = this.root
    while (node.right) {
      node = node.right
    }
    return node.key
  }
  // 获取最小值(即最左边的值)
  min() {
    let node = this.root
    while (node.left) {
      node = node.left
    }
    return node.key
  }

  // 找后继节点
  getSuccessor(delNode) {
    // 1.给后继存个指针
    let successor = delNode
    let current = delNode.right
    let successorParent = delNode
    // 2.循环查找
    while (current) {
      successorParent = successor
      successor = current
      current = current.left
    }
    // 3.判断寻找到的后继节点是否直接就是delNode的right
    if (successor != delNode.right) {
      successorParent.left = successor.right  
      successor.right = delNode.right
    }
    return successor
  }
  //删除操作
  //删除节点分3种情况，删除有0、1、2个子节点的节点
  remove(key) {
    let current = this.root
    let parent = null
    let isLeft = true

    // 1.找到要删除的节点
    while (current.key != key) {
      parent = current
      if (parent.key > key) {
        isLeft = true
        current = parent.left
      } else {
        isLeft = false
        current = parent.right
      }
      //没找到
      if (current == null) return false
    }

    // 2.分3种情况进行删除
    if (current.left == null && current.right == null) { //有0个子节点（叶节点）
      if (current == this.root) {
        this.root = null
      } else if (isLeft) {
        parent.left = null
      } else {
        parent.right = null
      }
    } else if (current.right == null && current.left != null) {   //有1个左子节点
      if (current == this.root) {
        this.root = current.left
      } else if (isLeft) {
        parent.left = current.left
      } else {
        parent.right = current.left
      }
    } else if (current.right != null && current.left == null) {  //有1个右子节点
      if (current == this.root) {
        this.root = current.right
      } else if (isLeft) {
        parent.left = current.right
      } else {
        parent.right = current.right
      }
    } else { //有两个子节点
      // 获取后继节点
      let successor = this.getSuccessor(current)
      if (current == this.root) {
        this.root = successor
      } else if (isLeft) {
        parent.left = successor
      } else {
        parent.right = successor
      }
      successor.left = current.left
    }
  }
}




let b = new BinarySearchTree()
b.insert(11)
b.insert(7)
b.insert(15)
b.insert(5)
b.insert(3)
b.insert(9)
b.insert(8)
b.insert(10)
b.insert(13)
b.insert(12)
b.insert(14)
b.insert(20)
b.insert(18)
b.insert(25)
b.remove(7)
b.remove(9)
b.remove(15)
b.midOrderTraversal(console.log)
console.log(b.max())
console.log(b.min())
console.log(b.search(1))
b.remove(4)
b.preOrderTraversal(console.log)
```

### 红黑树
如果插入连续的数字，则会导致二叉搜索树向链表的方向发展，层级很深，即非平衡树，效率变低，为了保持平衡，设计出了AVL树和红黑树两种平衡树，而**红黑树**是实践当中常用的树。

**特性**
- 节点是红色或者黑色
- 根节点是黑色的
- 每个叶子节点都是黑色的空节点（NIL）
- 每个红色节点的两个子节点都是黑色（从每个叶子到根的所有路径上不能有连续两个红色节点）
- 从任一节点到其每个叶子的所有路径都包含相同数目的黑色节点


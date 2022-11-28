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

  //6.将栈的内容以字符串形式返回
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

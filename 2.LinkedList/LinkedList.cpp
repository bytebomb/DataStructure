#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// 节点
typedef struct LinkedNode
{
  int data;                //节点数据
  struct LinkedNode *next; //下一个节点指针

} LinkedNode;

// 链表
typedef struct LinkedList
{
  int length;      //链表长度
  LinkedNode head; //头节点
} LinkedList;

// 节点初始化
LinkedNode *init_linkednode(int value)
{
  LinkedNode *ln = (LinkedNode *)malloc(sizeof(LinkedNode));
  ln->data = value;
  ln->next = NULL;
  return ln;
}

// 链表初始化
LinkedList *init_linkedlist()
{
  LinkedList *ll = (LinkedList *)malloc(sizeof(LinkedList));
  ll->length = 0;
  ll->head.next = NULL; //虚拟头节点,可以不存数据
  return ll;
}
// 打印链表
void output(LinkedList *l)
{
  if (l == NULL)
    return;
  printf("LIST(%d):", l->length);
  for (LinkedNode *p = l->head.next; p; p = p->next)
  {
    printf("->%d", p->data);
  }
  printf("\n");
}

// 链表销毁
void clear_linkedlist(LinkedList *l)
{
  if (l == NULL)
    return;
  LinkedNode *p = l->head.next, *q;
  while (p)
  { //先依次销毁节点
    q = p->next;
    free(p);
    p = q;
  }
  free(l); // 销毁链表
}

// 插入节点
int insert(LinkedList *l, int value, int index)
{
  if (l == NULL)
    return 0;
  if (index < 0 || index > l->length)
    return 0;
  LinkedNode *p = &(l->head), *node = init_linkednode(value);
  while (index--)
  {
    //先将指针移动到第index的前一个的位置
    p = p->next;
  }
  // 先操作节点再操作链表，避免内存泄漏
  node->next = p->next;
  p->next = node;
  l->length += 1;
  output(l);
  return 1;
}

// 删除节点
int erase(LinkedList *l, int index)
{
  if (l == NULL)
    return 0;
  if (index < 0 || index >= l->length)
    return 0;
  LinkedNode *p = &(l->head), *node;
  while (index--)
  { //移动到要删除节点的前一个位置
    p = p->next;
  }
  node = p->next; //先把要删除的存起来，否则失去控制造成内存泄漏
  p->next = p->next->next;
  free(node);
  l->length -= 1;
  output(l);
  return 1;
}

#define MAX_OPT 30
int main()
{
  srand(time(0));
  int opt, index, value;
  LinkedList *l = init_linkedlist();
  for (int i = 0; i < MAX_OPT; i++)
  {
    opt = rand() % 3;
    value = rand() % 100;
    index = rand() % (l->length + 1);
    switch (opt)
    {
    case 0:
    case 1:
    {
      printf("list insert %d at %d\n", value, index);
      insert(l, value, index);
    }
    break;
    case 2:
    {
      printf("list erase a node at %d\n", index);
      erase(l, index);
    }
    break;

    default:
      break;
    }
  }
  // 销毁链表
  clear_linkedlist(l);
  return 0;
}
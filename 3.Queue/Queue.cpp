#include <stdio.h>
#include <stdlib.h>
#include <time.h>

// 循环队列
typedef struct Queue
{
  int *data;      //用数组来存储
  int head, tail; //头和尾
  int length;     //初始化的长度
  int count;      //队列的元素个数,用于循环队列
} Queue;

// 初始化
Queue *init(int length)
{
  Queue *q = (Queue *)malloc(sizeof(Queue));
  q->data = (int *)malloc(sizeof(int) * length);
  q->head = q->tail = q->count = 0; //队列为空的状态
  q->length = length;
  return q;
}

// 销毁
int clear(Queue *q)
{
  if (q == NULL)
    return 0;
  free(q->data);
  free(q);
  return 1;
}

// 获取排头（队首）
int first(Queue *q)
{
  if (q == NULL)
    return 0;
  if (q->count == 0)
    return 0;
  return q->data[q->head];
}

// 入队
int push(Queue *q, int value)
{
  if (q == NULL)
    return 0;
  if (q->count == q->length) //队列满了
    return 0;
  q->data[q->tail++] = value;
  if (q->tail == q->length)
    q->tail = 0; //循环队列的关键,如果队尾超出，重置为0;
  q->count += 1;
  return 1;
}
// 出队
int pop(Queue *q)
{
  if (q == NULL)
    return 0;
  if (q->count == 0) //队列为空
    return 0;
  q->head++; //先进先出
  if (q->head == q->length)
    q->head = 0; //循环队列的关键,如果队首超出，重置为0;
  q->count -= 1;
  return 1;
}

// 打印
void output(Queue *q)
{
  if (q == NULL)
    return;
  printf("[ ");
  for (int i = q->head, j = 0; j < q->count; j++)
  {
    int ind = (i + j) % q->length;
    printf("%d ", q->data[ind]);
  }
  printf("]\n\n");
}

#define MAX_OPT 20
int main()
{
  srand(time(0));
  Queue *q = init(10);
  int opt, value;
  for (int i = 0; i < MAX_OPT; i++)
  {
    value = rand() % 100;
    opt = rand() % 3;
    switch (opt)
    {
    case 0:
    case 1:
    {
      printf("push %d to queue:\n", value);
      push(q, value);
    }
    break;
    case 2:
    {
      printf("pop %d from queue:\n", first(q));
      pop(q);
    }
    break;
      break;
    }
    output(q);
  }
}
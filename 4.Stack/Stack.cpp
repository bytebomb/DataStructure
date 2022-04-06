#include <stdio.h>
#include <stdlib.h>
#include <time.h>

typedef struct Stack
{
  int *data;
  int top, size;
} Stack;
// 初始化
Stack *init(int size)
{
  Stack *s = (Stack *)malloc(sizeof(Stack));
  s->data = (int *)malloc(sizeof(int) * size);
  s->top = -1;
  s->size = size;
  return s;
}

// 判空
int empty(Stack *s)
{
  return s->top == -1;
}
// 栈顶
int top(Stack *s)
{
  if (empty(s))
    return 0;
  return s->data[s->top];
}
// 进栈
int push(Stack *s, int value)
{
  if (s == NULL)
    return 0;
  if (s->top + 1 == s->size) //栈满
    return 0;
  s->top += 1;
  s->data[s->top] = value;
  return 1;
}
// 出栈
int pop(Stack *s)
{
  if (s == NULL)
    return 0;
  if (empty(s))
    return 0;
  s->top -= 1;
  return 1;
}
// 清空
void clear(Stack *s)
{
  if (s == NULL)
    return;
  free(s->data);
  free(s);
  return;
}
// 打印
void output(Stack *s)
{
  printf("stack(%d):[ ", s->size);
  for (int i = 0; i < s->top + 1; i++)
  {
    printf("%d ", s->data[i]);
  }
  printf("]\n\n");
  return;
}
#define MAX_OPT 20
int main()
{
  srand(time(0));
  Stack *s = init(10);
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
      printf("push %d to stack:\n", value);
      push(s, value);
    }
    break;
    case 2:
    {
      printf("pop %d from stack:\n", top(s));
      pop(s);
    }
    break;
      break;
    }
    output(s);
  }
  clear(s);
}
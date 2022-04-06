#include <stdio.h>
#include <stdlib.h>
#include <time.h>

typedef struct Vector
{
  int *data;
  int size;
  int length;
} Vector;

//创建
Vector *init(int n)
{
  Vector *vec = (Vector *)malloc(sizeof(Vector)); //给顺序表分配内存
  vec->data = (int *)malloc(sizeof(int));         //给顺序表的元素分配内存
  vec->size = n;
  vec->length = 0;
  return vec;
}
// 输出
void output(Vector *vec)
{
  printf("Vector(%d) = [ ", vec->length);
  for (int i = 0; i < vec->length; i++)
  {
    printf("%d ", vec->data[i]);
  }
  printf("]\n\n");
  return;
}
// 扩容
int expand(Vector *vec)
{
  // realloc先在原寄存器中申请内存，如果不成功则会调用mallock申请新的内存，
  // 如果mallock申请成功，则原来的数据拷贝到新的内存，释放原来的内存，并将指针指向新的内存，
  // 如果申请不成功，则返回NULL,且不会释放原先的内存;
  int new_size = vec->size * 2;

  int *data = (int *)realloc(vec->data, sizeof(int) * new_size);
  if (data == NULL)
    // 分配失败
    return 0;
  vec->data = data;
  return 1;
}
// 插入
int insert(Vector *vec, int index, int value)
{
  // 先处理不合法操作
  if (vec == NULL)
    return 0;
  if (index < 0 || index > vec->length)
    return 0;
  if (vec->length == vec->size)
  {
    // 扩容失败
    if (!expand(vec))
      return 0;
  };
  for (int i = vec->length; i > index; i--)
  { //插入的位置后的元素依次往后移
    vec->data[i] = vec->data[i - 1];
  }
  vec->data[index] = value;
  vec->length += 1;
  return 1;
}
// 删除
int erase(Vector *vec, int index)
{
  if (vec == NULL)
    return 0;
  if (vec->length == 0)
    return 0;
  if (index < 0 || index >= vec->length)
    return 0;
  for (int i = index; i < vec->length; i++)
  {
    vec->data[index] = vec->data[index + 1];
  }
  vec->length -= 1;
  return 1;
}

// 销毁
void clear(Vector *vec)
{
  if (vec == NULL)
    return;
  free(vec->data);
  free(vec);
  return;
}

#define MAX_OPT 20
int main()
{
  // 写随机测试用例
  srand(time(0));
  int opt, index, value;
  Vector *vec = init(MAX_OPT);
  for (int i = 0; i < MAX_OPT; i++)
  {
    opt = rand() % 4;
    index = rand() % (vec->length + 1);
    value = rand() % 100;
    switch (opt)
    {
    case 0:
    case 1:
    case 2:
      printf("insert %d to vector at %d\n", value, index);
      insert(vec, index, value);
      break;
    case 3:
      printf("erase items at %d from vector\n", index);
      erase(vec, index);
      break;
    default:
      break;
    }
    output(vec);
  }

  return 0;
}
from random import randint
from time import time

lst = [randint(1, 10000) for _ in range(10000)]

# complexity n**2
def selectionSort(lst):
    for i in range(len(lst)):
        min_ind = i
        min_ = lst[i]
        for j in range(i + 1, len(lst)):
            if lst[j] < min_:
                min_ = lst[j]
                min_ind = j
        lst[min_ind] = lst[i]
        lst[i] = min_
    return lst

# complexity n**2
def insertionSort(lst):
    for i in range(1, len(lst)):
        j = i
        while j > 0 and lst[j] < lst[j-1]:
            tmp = lst[j]
            lst[j] = lst[j-1]
            lst[j-1] = tmp
            j = j -1

    return lst

t = time()
(insertionSort(lst))
t2 = time()
print("Time for selection sort : ",t2 - t)




from ctypes import Array
import itertools


t = int(input())
t_ = t



class mytuple(tuple):
    def __hash__(self) -> int:
        lst = [0 for _ in range(10)]
        for e in self:
            lst[e] += 1
        return hash(''.join(map(str, lst)))

multiples = {
    1 : ((9,)),
    2 : set(),
    3 : set(),
    4 : set(),
    5 : set(),
    6 : set(),
    7 : set(),
    8 : set(),
    9 : set(),
}

def createMultiples(nbs = []):
    # if nbs = []:
    if sum(nbs) == 9:
        tp = sorted(nbs)
        tp = mytuple(tp)
        # sorted(tuple)
        multiples[len(nbs)].add(tp)
        return
    if sum(nbs) > 9:
        return
    
    for i in range(1,9):
        createMultiples(nbs + [i])
createMultiples()

for i in range(2, len(multiples)):
    tmp = []
    for j in multiples[i]:
        ll = list(itertools.permutations(j))
        for l in ll:
            tmp.append(l)
    multiples[i].clear()
    for l in tmp:
        multiples[i].add(l)
def adder(fs, tp, arr = [], ind = 0):
    lst = []
    k = len(fs)
    j = len(tp)
    if arr == []:
        arr = [j] + [0] * (k-1-j)

    l = list(tp) + [0] * (k-j)
    for p in list(set(itertools.permutations(arr))):
        a = []
        for i in range(len(p)):
            a.append(l[i] * p[i])
        lst.append(''.join([str(o) for o in a]))
    
    if ind < len(fs) - 1:
        while arr[ind+1] <= arr[ind]:
            arr[ind + 1] += 1
            arr[ind] -= 1
            lst.extend(adder(fs, tp, arr, ind + 1))
    return lst
    

def solve(fs, lst=[], ind=0):
    lst.extend(adder(fs, (9,)))
    # lst = list(set(list))
    for i in range(2, len(fs) - ind + 1):
        for tp in multiples[i]:
            lst.extend(adder(fs, tp,))
    return lst

while t > 0:
    r = 0

    f,l = [int(j) for j in input().split(' ')]
    ls = str(l)
    ss = '0' + str(len(ls)) + 'd'
    fs = format(f,ss)

    lst = solve('0' * len(fs))
    lst = [str(l_) for l_ in lst if f <= int(l_) <= l]
    lst = set(lst)
    r = len(lst)


    print("Case #",t_ - t + 1,": ",r,sep="")
    t -= 1
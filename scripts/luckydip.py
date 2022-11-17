
from math import ceil

t = int(input())
t_ = t

def binarySearchBiggerThan(arr, nb, i = 0, j = -1):
    if j == -1:
        j = len(arr) - 1
    mid = (i + j) // 2
    if arr[mid] < nb:
        if j - i <= 1:
            if arr[i] >= nb:
                return i
            return j
        return binarySearchBiggerThan(arr, nb, mid, j)
    elif arr[i] >= nb:
        return i
    else:
        return binarySearchBiggerThan(arr, nb, i + 1, mid)

while t_ > 0:
    r = 0
    n,k = [int(v) for v in input().split(" ")]
    nbs = [int(v) for v in input().split(' ')]
    nbs.sort()
    sums_ = [nbs[0]]
    p = 1
    while p < len(nbs):
        sums_.append(sums_[-1] + nbs[p])
        p += 1

    r = sum(nbs) / len(nbs)
    i = 0
    while i < k:
        betterNumbersStart = binarySearchBiggerThan(nbs, r) - 1
        betterNumbersCount = len(nbs) - betterNumbersStart - 1
        if betterNumbersStart < 0:
            betterNumbersAverage = (sums_[-1] ) / betterNumbersCount
        else:
            betterNumbersAverage = (sums_[-1] - sums_[betterNumbersStart]) / betterNumbersCount

        betterChance = betterNumbersCount / len(nbs)
        r = r * (1 - betterChance) + betterNumbersAverage * betterChance
        i += 1

    print("Case #", t - t_ + 1, ": ", r, sep="")
    t_ -= 1
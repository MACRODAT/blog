import itertools
from timeit import repeat


t = int(input())
t_ = t

multiples = dict()

for i in range(1,10):
    multiples[i] = set()

def makeMultiples(nbs = []):
    if sum(nbs) == 9:
        multiples[len(nbs)].add(tuple(sorted(nbs)))
    if sum(nbs) > 9:
        return
    for i in range(1,10):
        makeMultiples(nbs + [i])

makeMultiples()

def getAllNineMultiplesBetween(low, high):
    high_len = len(str(high))
    low_len = len(str(low))
    candidates = []

    for i in range(1, high_len):
        for el in multiples[i]:
            el = el + tuple([0] * (high_len - i))
            candidates.append(el)
    allCondidates = []
    for e in candidates:
        allCondidates.extend( list(itertools.permutations(e)) )
    candidates = []
    for e in allCondidates:
        candidates.append([str(j) for j in e])
    # allCondidates = [str(j) for j in e for e in allCondidates]
    allCondidates = [int(''.join(e)) for e in candidates]
    
    ## total number of numbers containing
    p = (high - low) // 10
    # p -= 
    
    sumCandidates = len([i for i in allCondidates if low <= i <= high])

    return sumCandidates
    

while t > 0:
    r = 0
    l,h = [int(j) for j in input().split(' ')]

    r = getAllNineMultiplesBetween(l,h)

    
    print("Case #",t_ - t + 1, " :", r, sep='')
    t -= 1
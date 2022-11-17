from math import ceil


t = int(input())
t_ = t

def toBase9(number):
    div = number
    rem = number % 9
    lst = [rem]
    while div >= 9:
        div = div // 9
        lst.append(div % 9)
    lst = reversed(lst)
    return int(''.join([str(s) for s in lst]))

def fromBase9(number):
    s = str(number)
    s = s[::-1]
    c = 0
    for i in range(len(s)):
        c += pow(9, i) * int(s[i])

    return c
while t > 0:
    r = 0
    l,h = [int(j) for j in input().split(' ')]

    l9 = toBase9(l)
    h9 = toBase9(h)
    
    diff = toBase9(h - l)

    diff_str = str(diff)
    l9s = str(l9)
    h9s = str(h9)
    if len(h9s) > 1:
        numbersDivisibleBy9 = int(h9s[:len(h9s) - 1])
        if len(l9s) > 1:
            numbersDivisibleBy9 -= int(l9s[:len(l9s) - 1])
        # numbersDivisibleBy9 = fromBase9(numbersDivisibleBy9)
    else:
        numbersDivisibleBy9 = 0
    
    
    # we need the total count of numbers containing 9 not present 
    # in the previous list
    # 
    # every (120)b9 numbers, we have roughly 16 numbers of the sort
    
    numbersNotDivisibleBy9 = 0

    startRest = h % 99
    startRest = h - startRest
    startRest = max(startRest, l)
    for i in range(startRest, h + 1):
        if '9' in str(i) and i % 9 != 0:
            numbersNotDivisibleBy9 += 1
    
    r = fromBase9(diff)
    endRest = l % 99
    endRest = 99 - (endRest)
    endRest += l
    endRest = min(endRest, h)
    if startRest >= endRest:
        for i in range(l, endRest + 1):
            if '9' in str(i) and i % 9 != 0:
                numbersNotDivisibleBy9 += 1
        numbersNotDivisibleBy9 += ( (startRest - endRest) // 99 ) * 16
        # numbersNotDivisibleBy9 += (h9 % 120) - (l9 % 120) 
        # numbersNotDivisibleBy9 *= 16



    r = r + 1 - (numbersDivisibleBy9 + numbersNotDivisibleBy9)


    print("Case #",t_ - t + 1, ": ", r, sep='')
    t -= 1
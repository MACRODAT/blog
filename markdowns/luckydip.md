# Table of contents  

# The problem  
Lucky Dip is part of Kickstart 2018/Round A.  
[Link to the official Kickstart problem](https://codingcompetitions.withgoogle.com/kickstart/round/0000000000050edf/0000000000050e1d#problem)

## Statement of the problem  
In this Lucky Dip, there is a bag with **N** items. The ++i-th++ item in the bag has value ++Vi++. You will put your hand into the bag and draw one item at random; all items in the bag have an equal probability of being chosen. The organizers want contestants to feel that they have some element of choice, so after you draw an item, you can either keep it, or "redip" by returning it to the bag and drawing again. *(Note that the returned item is now just as likely to be chosen as any of the other items in the bag.)*
You may only redip a maximum of K times. If you use **K** redips, you must keep the item that you draw on your **(K + 1)-th** draw.

If you play optimally to maximize the value of the item you will end the game with, what is the expected value of that item?

## Input

The input starts with one line containing one integer **T**: the number of test cases. T test cases follow.

Each test case consists of two lines. The first line consists of two integers N and K: the number of items in the bag, and the maximum number of times you may redip. The second line consists of **N** integers **Vi**, each representing the value of the **i-th item**.

## Output

For each test case, output one line containing Case #x: y, where x is the test case number (starting from 1) and y is the expected value described above. Your answer will be considered correct if it is within an absolute or relative error of 10-6 of the correct answer. See the FAQ for an explanation of what that means, and what formats of real numbers we accept.

## Limits

Memory limit: 1GB.
$$
1 ≤ T ≤ 100  \newline

1 ≤ Vi ≤ 10^9  \newline

1 ≤ N ≤ 2 * 10^4  \newline

$$

# Analysis

This is the most interesting part. Let's try to understand what the problem really wants us to do !

!> Before diving further, give it a try !

## Concretisation, first part

Let's start by considering the simpler cases. If we're only allowed one chance, then the expected value is whatever is the mean (average) number of that bag (or *list of numbers, really*). **Let's call it dip[0].**

Also, if we are allowed one chance to redip, then we must see if we really want to do so. As such, we know already what we might expect next, i.e. dip[0] (*see previous paragraph*), so if we end up picking at once a bigger value than the expected one, that's it. Otherwise, we better redip. All in all, this additional chance dip[1] has to be equal or more than dip[0].

?> With this information in mind, try to work out an algorithm to get the expected value dip[n] for any number n of redips.

++So, how to properly compute dip[n] ?++

!> Following a decision tree, where each branch (*or decision*) has a corresponding probability and expected value, then the final expected value of that decision tree is E(x) = Sum(E(x[i]) * P[i]), ie multiply each expected value by its corresponding probability and sum up. Note that the sum(P[i]) = 1. [Read here for more info.](https://corporatefinanceinstitute.com/resources/knowledge/other/total-probability-rule/)

## Concretisation, second part

The trick is to see that, each time we have to redip, we are making a decision whether to redip or not.

We will use a  recursive loop, we know the previous expected value **dip[n]** as well as the **first value dip[0]** (*see previous*).  
All we have to do is compute **dip[n + 1]**.  
Either a number in the bag is bigger than dip[n], in that case we choose it, or it's smaller, then we have to redip. So the chance of us choosing not to redip, is the total count of numbers bigger than **dip[n]** (*call it betterNumbers[]*) over the total count of numbers overall. And the average value we expect from such numbers is just the average value of **betterNumbers[]**.  

As such :  

$$$dip[n + 1] = averageDip[n + 1] * probabilityNoDip[n + 1] + dip[n] * (1 - probabilityNoDip[n + 1])$$$

So, we only have to create such a recursive loop and we will obtain $$$dip[n]$$$


## Optimisation

This solution might work well for smaller datasets, however, within bigger datasets, we have to do some optimisation.

Let's compute its complexity : **K** (redips, ie loops)) **x** **N** (number of elements in the bag as we go through these elements in each loop)

A linear complexity is too much for the given inputs. (See topic on complexity)

A **K * N** complexity is the result of two processes below, let's see what we can do to correct things.

### Why computing the sum every time ?

One thing you may have noticed is that we compute the sum of some of the elements every time we need to average their value. We can do better. 
Let's find the sum of an array arr[], between two indexes i and j. (That's what we're doing when compute the average.)
Traditionally, just sum up all the values from i to j. then divide the sum by the total count of numbers.
We may be doing this too much, so just create another array of N elements, called sums_[], such as :  
$$$sums_[n] = sums_[n-1] + arr[n]$$$  

So, to find the sum of arr[] between i and j, just substract :  
$$$sums_[j] - sums_[i]$$$
This turns a **K * N** complexity into just a **K** complexity.

?> This is an interesting technique to keep in mind !


### Computing betterNumbers[]

Let's see. if you loop over all numbers, comparing each with dip[n], it's a **K*N** complexity. 

How about sorting our numbers at first, then inside the loop we can efficiently compute our **betterNumbers[]** using *binary search* ?

We define betterNumbers[] as choosing not to redip, ie the numbers bigger than **dip[n]**. So, we have to find the next bigger number than dip[n] using binary search. In short, we have to create a modified version of binary search that can do that.  

Let's see how : As usual, we start by having i(low) = 0 and j(high) = len(arr) - 1.
The trick is to only move i up if we're sure that arr[i] is smaller than dip[n].
So, if it is, we see if arr[mid] is smaller, as such it will be our next low (i) index. Otherwise, we only increment i by one and we set j = mid because we know arr[mid] is bigger than dip[n].

x> Beware of duplicates ! and also be sure not to run into infinite loops, see our code below if you can't figure it out.

But in your sorting class, you may have remembered that sorting an array is only **N*log(N)** in complexity ! Also, binary search is only **log(N)**, so we end up with a complexity of **Nxlog(N) + Kxlog(N)**, ie **(K+N)xlog(N)**, which is a much better result.

?> Always compute the complexity for your test algorithms to decide if you need to make changes and where.

# Final Solution
This is my implementation (python3) for my final solution :

```python

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
```

# Final Notes
## Redipping

Sometimes, code may work only for smaller limits, requiring the developer to **reconsider** his methods or/and approach to the problem.

As such, try to always see the bigger picture at first ! 

> When you find a good move, look for a better one.

If you think your algorithm may be further developped to respect given limits, you may start with a **basic** implementation at first to verify it works *(in this case, it outputs the correct expected value)*, then you can proceed to optimise the algorithm.
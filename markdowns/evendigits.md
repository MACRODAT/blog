# Table of contents  

# The problem  
Even Digits is part of Kickstart 2018/Round A.  
[Link to the official Kickstart problem](https://codingcompetitions.withgoogle.com/kickstart/round/0000000000050edf/00000000000510ed#problem)

## Statement of the problem  
Supervin has a unique calculator. This calculator only has a display, a plus button, and a minus button. Currently, the integer N is displayed on the calculator display.

Pressing the plus button increases the current number displayed on the calculator display by 1. Similarly, pressing the minus button decreases the current number displayed on the calculator display by 1. The calculator does not display any leading zeros. For example, if 100 is displayed on the calculator display, pressing the minus button once will cause the calculator to display 99.

Supervin does not like odd digits, because he thinks they are "odd". Therefore, he wants to display an integer with only even digits in its decimal representation, using only the calculator buttons. Since the calculator is a bit old and the buttons are hard to press, he wants to use a minimal number of button presses.

Please help Supervin to determine the minimum number of button presses to make the calculator display an integer with no odd digits.

## Input

The first line of the input gives the number of test cases, T. T test cases follow. Each begins with one line containing an integer N: the integer initially displayed on Supervin's calculator.

## Output

For each test case, output one line containing Case #x: y, where x is the test case number (starting from 1) and y is the minimum number of button presses, as described above.

## Limits

1 ≤ T ≤ 100.
Time limit: 20 seconds per test set.
Memory limit: 1GB.
Small dataset (Test set 1 - Visible)
1 ≤ N ≤ 10**5.
Large dataset (Test set 2 - Hidden)
1 ≤ N ≤ 10**16.

# Analysis

This is the most interesting part. Let's try to understand what the problem really wants us to do !

!> Before diving further, give it a try !

## Concretisation, first part

Now, obviously, crunching in plus and minus at the same time does not contribute to anything. So we should either look for a bigger number (call it Y) or a smaller one (X). Either, we find a method to **determine** whether we want a (+) or a (-), or we just try both and then choose the number the lesser difference. *i.e. less operations to be done on the calculator.*

But let's see if finding such a method *if it even exists* is worth further of your time. See, any chance of solving the second dataset with 10**16 numbers is hopeless if the complexity is more than log(n). So, running our function twice at worst case, once, for the smaller number and another for the bigger number is just the smarter way to go.

?> Always try to figure out how to approach a problem before diving into code. You may just win time with minimal bits of analysis.

But how do we go about finding either Y or X ?

## Concretisation, second part

To find either X or Y, we have to think of a constant time complexity solution or at most, a log(n) solution (big risk, 10**16 !!).

x> Anything beyond is only good for Dataset 1, such as looping all numbers smaller than our original number until one is found such as all digits are even.

Now, how do we find our function ? **Always**, in similar situations, start by solving the problem by hand using numbers of your choosing. You may get a general idea. **Then**, further consider *exceptional* numbers that may trigger unwanted effects. Let's see concretely :

# Final Solution
This is my implementation (python3) for my final solution :

```python
testcases = int(input())
t_ =  testcases
while t_ > 0:
    r = 0
    n = int(input())

    j = 0
    ns = str(n)
    s_inc = ''
    s_dec = ''
    flag_chg = False
    pos_chg = -1
    all_check_inc = True
    for l in ns:
        if flag_chg:
            s_inc += '0'
            s_dec += '8'
        elif int(l) % 2 != 0:
            s_inc = s_dec = ns[:j+1]
            if j >= len(ns) - 1:
                r = 1
                break
            else:
                flag_chg = True
                pos_chg = j
                s_inc = s_inc[:-1] + str(int(s_inc[-1]) + 1)
                s_dec = s_dec[:-1] + str(int(s_dec[-1]) - 1)
                if int(l) == 9:
                    all_check_inc = False
        j += 1
    if flag_chg:
        nb_inc = int(s_inc)
        nb_dec = int(s_dec)
        if all_check_inc:
            r = min(n - nb_dec, nb_inc - n)
        else:
            r = n - nb_dec
    print("Case #",testcases - t_ + 1,": ", r,sep='')   
    t_ -= 1
```

# Final Notes
## Yes
eee
## No
eje
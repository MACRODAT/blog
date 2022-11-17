from random import randint


testcases = int(input())

t_ =  testcases


def compare(n):
    
    # figure out the min number of tries by using a simple mathematical formula
    # 
    # 
    ns = str(n)
    j = 0
    for j in range(0, len(ns)):
        nb = int(ns[j])
        if nb % 2 != 0:
            # the number is odd
            break
    if len(ns[j:]) == 1 and int(ns[j:]) % 2 != 0:
        r = 1
    elif int(ns[j:j+1]) % 2 == 0:
        r = 0
    elif ns[j] == '9':
        nb = int(ns[j:]) 
        r = int('8' * len(str(nb))) - nb
        r = abs(r)
    else:
        nb = int(ns[j+1:])
        if len(ns) - j <= 2:
            if nb >= 4:
                r = 10 - nb
            else:
                r = nb + 2
        elif nb > int('4' + ('8' * (len(ns[j+1:]) - 1))):
            r = int('1' + ('0' * len(ns[j+1:]))) - nb
        else:
            tmp = len(ns[j+1:])
            r = nb + max(12, int(('1' * (tmp - 1)) + '2'))


    return r



def working(A):
    numberOfDigits = len(A)
    firstOddDigitIndex = -1
    
    for y in range(numberOfDigits):
        if int(A[y]) % 2 != 0:
            firstOddDigitIndex = y
            break

    if firstOddDigitIndex == -1:
        return 0
    elif firstOddDigitIndex == numberOfDigits-1:
        return 1
    else:
        # mainNum is the slice of the original number from the first odd digit to the end
        mainNum = int(A[firstOddDigitIndex: ])
        numberOfDigitsInMain = len(str(mainNum))

        # numberWithZeroes is the number used to replace all the digits to the right of the first odd digit with zeroes
        numberWithZeroes = 10 ** (numberOfDigitsInMain - 1)

        # numberWithEights is the number used to replace all the digits to the right of the first odd digit with eights
        numberWithEights = ''.join(['8' for x in range(numberOfDigitsInMain - 1)])

        firstOddDigit = int(str(mainNum)[ :1])
        
        UpNum = (firstOddDigit + 1) * numberWithZeroes
        DownNum = int(str(firstOddDigit - 1) + numberWithEights)
        
        numberOfKeys = mainNum - DownNum if A[firstOddDigitIndex] == '9' else min(UpNum - mainNum, mainNum - DownNum)
        
        return numberOfKeys


while t_ > 0:
    r = 0
    # n = int(input())
    n = randint(1,1000)

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
                if int(l) == 9:
                    all_check_inc = False
                s_inc = s_inc[:-1] + str(int(s_inc[-1]) + 1)
                s_dec = s_dec[:-1] + str(int(s_dec[-1]) - 1)
        j += 1
    if flag_chg:
        nb_inc = int(s_inc)
        nb_dec = int(s_dec)
        if all_check_inc:
            r = min(n - nb_dec, nb_inc - n)
        else:
            r = n - nb_dec
    r2 = working(str(n))
    if r != r2:
        print("error")
        raise Exception("mismatch")
    print("Case #",testcases - t_ + 1,": ", r,sep='')   
    t_ -= 1

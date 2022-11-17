import bisect

t = int(input())

t_ = t

while t > 0:

    ## let's get all the input parameters
    L = int(input())
    words = {}
    for word in input().split(' '):
        l = len(word)
        if l in words:
            words[l].append(word)
        else:
            words[l] = [word]
    S1, S2, N, A, B, C, D = [word for word in input().split(' ')]
    N, A, B, C, D = int(N), int(A), int(B), int(C), int(D)
    ## generating the string S
    x = [ord(S1),ord(S2)]

    s = S1 + S2
    for i in range(2, N):
        x.append(A * x[i-1] + B * x[i-2] + C)
        x[i] %= D
        s += chr(97 + (x[i] % 26))

    ## we have all the data
    ## let's run the algorithm

    ## first off sort the words by length
    # words.sort(key=lambda w: len(w))

    ## then let's iterate over s while checking for matches
    matches = 0
    while len(words) > 0:
        skippedIndices = []
        l = list(words.keys())[-1]
        # l = len(words[0])
        tmpwords = words.pop(l)

        # while len(words) > 0 and len(words[0]) <= l:
        #     tmpwords.append(words.pop(0))
        # we have the words, let's populate their frequency tables
        freqtables = []
        for word in tmpwords:
            freqtable_ = {}
            for c in 'abcdefghijklmnopqrstuvxywz':
                freqtable_[(c)] = 0 
            for c in word:
                freqtable_[c] += 1
            freqtables.append(freqtable_)
        # let's start the checkup
        j = l
        StringFreqTable = {}
        for c in 'abcdefghijklmnopqrstuvxywz':
            StringFreqTable[(c)] = 0 
        for c in s[:l]:
            StringFreqTable[c] += 1
        while j <= len(s):
            i = j - l
            if i > 0:
                # update frequency table
                StringFreqTable[s[i-1]] -= 1
                StringFreqTable[s[j-1]] += 1
            for p in range(len(tmpwords)):
                if p not in skippedIndices:
                    t_1 = tmpwords[p]
                    # check starting words
                    if t_1[0] == s[i] and t_1[-1] == s[j-1]:
                        # all right, check frequency tables
                        if StringFreqTable == freqtables[p]:
                            matches += 1
                            skippedIndices.append(p)
                    
            j += 1

    # print(words)
    

    print("Case #",t_ - t + 1, ": ", matches, sep="")
    t -= 1
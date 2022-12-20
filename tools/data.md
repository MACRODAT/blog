# Table of contents  

# Backtracking 

## Introduction  

Backtracking is a systematic approach to explore all possibilites a solution can take, and to test them. It *constructs* a tree of partial solutions and at each iteration will extend its partial solution while *testing* it. Don't worry, we'll explain.

## What we will do ?  

Backtracking is an approach, and as such, its possibilities are endless. It is definitely a noteworthy strategy that will help you solve the most **complex** challenges :  

- Construct all **subsets** of a given set.
- We will find all **combinations** of a given set.
- We will solve *any* soduku set.

# Learn by doing  

## Esempio Uno : Generate all subsets  

As we said, while backtracking, we need to test whether a given *solution candidate* is indeed a solution. For that, we may define a **boolean** function that will test exactly that. Other times, it is pretty strightforward.

So, to generate all subsets using backtracking :
The **idea** is simple, at each index `i` of the *original set* `S` of length `n`, we'll consider all subsequent *subsets* in the range `i..n` that will contain `S[i]`. That is : `{ S[i] }`, `{ S[i], S[i+1] }`, and so on. We iterate i from `0` until `n` thus covering all solutions.  

So, defining a function : `void backtracking(vector<int> s, vector<vector<int>>& solutions, vector<int>& cur, int index = 0)`  
- s : is our original array [1,2,3] for example.
- solutions : the vector of all solutions.
- cur : the current subset to be explored.
- index : *custom* parameter to keep track of our position in `s`.

Our function will do the following :  

- At each index `i`, our current backtracking **partial solution** is a `vector<int>` called `cur` which we do get as a parameter.
- We know from *implementation* that our iterations are unique so add our `cur` to the list of solutions without any further verifications.
- For all indexes `j` in range `i..n`, we add `s[j]` to our *partial* subset, then we run backtracking with that new subset.
- After calling backtracking, we undo changes to `cur`, so as to explore the next possible solution in the tree of solutions. (*Think of it as going from child to parent in the tree of solutions*)

In concrete terms, here is my solution :  

```c++
void backtracking(vector<int> s, vector<vector<int>>& solutions, vector<int>& cur, int index = 0) {
    // testing the current partial solution => valid every time (unique, valid)
    solutions.push_back(cur);
    for (int i = index; i < s.size(); ++i) {
        // gen the new partial solution
        cur.push_back(s[i]);
        // run our backtracking with new partial solution
        backtracking(s, solutions, cur, i + 1);
        // undo the partial solution to move to the next
        cur.pop_back();
    }
}
```

We also have to define a helper function that will initially call backtracking for us :  

```c++
vector<vector<int>> subsets(vector<int> const &s) {
    vector<vector<int>> solutions; // this will hold all subsets
    vector<int> cur; // current partial solution
    // run our backtracking algo
    backtracking(s, solutions, cur);
    return solutions;
}
```

Here is the complete code :

```c++
#include <iostream>
#include <vector>

using namespace std;

void backtracking(vector<int> s, vector<vector<int>>& solutions, vector<int>& cur, int index = 0) {
    // testing the current partial solution => valid every time (unique, valid)
    solutions.push_back(cur);

    for (int i = index; i < s.size(); ++i) {
        // gen the new partial solution
        cur.push_back(s[i]);
        
        // run our backtracking with new partial solution
        backtracking(s, solutions, cur, i + 1);

        // undo the partial solution to move to the next
        cur.pop_back();
    }
}


vector<vector<int>> subsets(vector<int> const &s) {
    vector<vector<int>> solutions; // this will hold all subsets
    vector<int> cur; // current partial solution

    // run our backtracking algo
    backtracking(s, solutions, cur);

    // return the solutions !
    return solutions;
}

int main()
{
    vector<int> s{ 1,2,3 };
    auto o = subsets(s);
}
```

## Esempio due : Permutations

Honestly, it's just the same idea. You can see the pattern : Instead of *choosing* elements and picking them at each iterations, we'll be *swapping* them instead.

Let's see :  

```c++
void backtracking_permutations(vector<vector<int>>& solutions, vector<int>& cur, int index = 0, bool unique = false)
{
    if (unique)
        solutions.push_back(cur);

    for (int i = index; i < cur.size(); ++i) {
        swap(cur, index, i);
        backtracking_permutations(solutions, cur, index + 1, i != index);
        swap(cur, index, i);
    }
}
```

But, now, we need to make sure the solution is unique. Because part of the solution is *to swap one element with itself*, we may not modify the array and hence run into **duplicate** solutions. But *whenever* we do that, we set `unique` to false by using `i != index`.

Here goes the complete code :  

```c++
void swap(vector<int>& a, int i, int j) {
    int tmp = a[i];
    a[i] = a[j];
    a[j] = tmp;
}

void backtracking_permutations(vector<vector<int>>& solutions, vector<int>& cur, int index = 0, bool unique = false)
{
    if (unique)
        solutions.push_back(cur);

    for (int i = index; i < cur.size(); ++i) {
        swap(cur, index, i);
        backtracking_permutations(solutions, cur, index + 1, i != index);
        swap(cur, index, i);
    }
}

vector<vector<int>> permutations(vector<int> s) {
    // we copy s as we will modify it.
    vector<vector<int>> solutions; // this will hold all subsets
    vector<int> cur; // current partial solution

    // run our backtracking algo
    backtracking_permutations(solutions, s, 0, true);

    // return the solutions !
    return solutions;
}

int main()
{
    vector<int> s{ 1,2,3 };
    auto o = permutations(s);
}

```

## Esempio tre: Solving Soduku

We'll use backtracking to solve a soduku puzzle (*and maybe generate boards*). The idea is still the same *although the implementation is more sophisticated*:  

### The idea 

- We'll define a board with digits, rows, columns. If there is no predefined **digit**, we'll put `zero:0`.
- At each iteration, we'll look for the next empty slot (column-wise then row-wise), suppose it is at location `{row : r, column : c, sector : s }`. 
  - We'll look for the **missing** digits in row r.
  - We'll look for the **missing** digits in column c.
  - We'll look for the **missing** digits in sector s.
  - We'll perform an intersection of all missing digits.
- We'll take these missing digits, one at each time, at location `{r,c}`, and we'll continue our backtracking.
- If we reach the end (no more empty slots), we **have** a solution. (*Think about it*).
- If we do NOT have any digits during our **intersection** of all missing digits, then the current board in this **partial solution** is not valid. You can see that we do not have to check for repetitive digits, as we only have to look for the missing ones, and there won't be any (**by virtue of our implementation**) anyways.
- When we perform our backtracking, we'll return the `board` if there is a solution, otherwise we return `False`.
- If a backtracking for a particular *partial solution* returns False, we next move to the next **missing** digit replacing it in the same slot `{r,c}`.
- If all missing digits return `False`, this partial solution does not accept any solutions. Return `False`.

If all backtracking functions (i.e. our original one) return `False`, then this board does not accept any solutions. (*there must be a mistake in the board.*).

### Example board

```python
board_ = [
    [7,8,0,4,0,0,1,2,0],
    [6,0,0,0,7,5,0,0,9],
    [0,0,0,6,0,1,0,7,8],
    [0,0,7,0,4,0,2,6,0],
    [0,0,1,0,5,0,9,3,0],
    [9,0,4,0,6,0,0,0,5],
    [0,7,0,3,0,0,0,1,2],
    [1,2,0,0,0,7,4,0,0],
    [0,4,9,2,0,6,0,0,7]
]
```

### Defining the board

Of key importance, is how we implement our objects.

We have to index frequencies of digits in every row, column, and sector. So let's generate a dictionnary before-hand :

```python
dgt = [i for i in range(1, 10)]
def dictMaker(defaultValue = 1):
    d = {}
    for d_ in dgt:
        d[d_] = defaultValue
    d[0] = 1
    return d
```

Our row, columns, sectors are each formed by 9 digits. Let's create a contain class called `group` that will hold just that.   
Hence, every row, columm, sector, is a group.  
- We keep the list of digits indexed, with `0` for empty slot.
- We keep the frequencies of existing digits in the group.
- We may need to keep the **missing digits**, containing inverse frequencies, i.e. the digits that do NOT exist in the group. 
- Every time we update the group, we have to update the frequencies.

```python
class group:
    def __init__(self, pos) -> None:
        self.digits = [0 for _ in range(9)]
        self.existing = dictMaker(0)
        self.missing = dictMaker(1)
        self.score = 0
        self.pos = pos
    def add(self, digit, row):
        self.digits[row] = digit
        self.update()
    def update(self):
        self.missing = dictMaker(1)
        self.existing = dictMaker(0)
        self.score = 0
        for d in self.digits:
            self.existing[d] += 1
            self.missing[d] -= 1
            if d != 0:
                self.score += 1
```

!> This may look laborious a first-hand, but is **extremely** ressource-saving for the processor as we don't have to calculate **existing** or **missing** frequencies every time. These values are calculated per-modification.

We'll also define a point class, that will be an indexor of a every slot : `{r,c}` r being the row and c being the column. It will also help us calculate the sector of that particular point.

```python
class point:
    def __init__(self, x_, y_) -> None:
        self.x = x_
        self.y = y_
    def sectorFinder(self, r, c):
        s = (r // 3) * 3
        s += c // 3
        return s
    def sectorIndexer(self, r, c):
        return (r % 3) * 3 + c % 3 
```

Finally, let's implement our board class, containing 9 rows which are groups, 9 columns, 9 sectors. Duplicate information, as each point will be defined three times, but very helpful in the grander scheme of things.

```python
class board:
    def __init__(self) -> None:
        self.rows = [group(i) for i in range(9)]
        self.cols = [group(i) for i in range(9)]
        self.sect = [group(i) for i in range(9)] # sectors 0 - 1 - 2 => 3 - 4 - 5...
    
    def update(self, pos, digit):
        r = pos.x
        c = pos.y
        s = (r // 3) * 3
        s += c // 3
        f = pos.sectorIndexer(r, c)
        self.rows[r].add(digit, c)
        self.cols[c].add(digit, r)
        self.sect[s].add(digit, f)

    def isDone(self):
        for r_ in self.rows:
            if 0 in r_.digits:
                return False
        return True   

    def __str__(self) -> str:
        s = ''
        for r in range(0, 9):
            for c in range(0, 9):
                if self.rows[r].digits[c] == 0:
                    s += '.'
                else:
                    s += str(self.rows[r].digits[c])
                if (c + 1) % 3 == 0:
                    s += '|'
            if (r + 1) % 3 == 0:
                    s += '\n--------------'
            s += '\n'
        return s
```

Every time we need to modify an element on the board, we have to modify its version in the row, in the column, and in the sector via the function :  
```def update(self, pos, digit):```

Finally, we have a `def isDone(self):` function that checks whether there is no longer a `0` in the board. *(We only have to check either of `rows` or `column` or `sect`)*

### The solver  

Please re-read our idea above, this is just that implemented in python code.

```python
def backtrackingSolver(b, moves = []):
    if len(moves) == 0:
        return backtrackingSolver(b, [point(0, 0)])
    else:
        # check if we are ok, with the block
        m = moves[-1]
        r = m.x
        c = m.y
        d = b.rows[r].digits[c]
        s = m.sectorFinder(r, c)
        
        while True:
            # look for the next slot, if no more, we are done.
            c += 1
            if c > 8:
                c = 0
                r += 1
                if r > 8:
                    if b.isDone():
                        return b
                    else:
                        return False
            while b.rows[r].digits[c] != 0: 
                # Keep looking until the next empty slot
                c += 1
                if c > 8:
                    c = 0
                    r += 1
                    if r > 8:
                        r = 0
                        if b.isDone():
                            return b
                        else:
                            return False
            # what's the sector of point(r,c) ?
            s = m.sectorFinder(r, c)

            g = b.rows[r].missing
            l = set([list(g.keys())[i] for i in range(9) if list(g.values())[i] >= 1])
            g = b.cols[c].missing
            l2 = set([list(g.keys())[i] for i in range(9) if list(g.values())[i] >= 1])
            g = b.sect[s].missing
            l3 = set([list(g.keys())[i] for i in range(9) if list(g.values())[i] >= 1])
            # All MISSING digits possible will be found by set-intersection.
            l = l.intersection(l2).intersection(l3)
            l.discard(0)

            if len(l) == 0:
                # No solution is possible for this partial solution
                return False

            if len(l.union(l2).union(l3)) == 0:
                if b.isDone():
                    return True

            s2 = m.sectorIndexer(r, c)
            s = m.sectorFinder(r, c)

            for p in list(l):
                # update missing our point(r,c) and backtrack.
                b.rows[r].add(p, c)
                b.cols[c].add(p, r)
                b.sect[s].add(p, s2)
                res = backtrackingSolver(b, moves + [point(r,c)])
                if res != False:
                    return res
                else:
                    # reverse action : undo changes.
                    b.rows[r].add(0, c)
                    b.cols[c].add(0, r)
                    b.sect[s].add(0, s2)
            return False

```

Then, we create our objects and call the backtracking function.

```python
b = board()
for r in range(0, 9):
    for c in range(0, 9):
        b.update(point(r, c), board_[r][c])
bo = backtrackingSolver(b)
s = ''
if bo == False:
    print("UNSOLVABLE")
else:
    for r in range(0, 9):
        for c in range(0, 9):
            s += str(bo.rows[r].digits[c])
            if (c + 1) % 3 == 0:
                s += '.'
        if (r + 1) % 3 == 0:
                s += '\n.............'
        s += '\n'
    print(s)
```

### Complete Code  

Let's gather everything together :

```python
# soduku solver 

from copy import deepcopy
from random import randint
from turtle import back

board_ = [
    [7,8,0,4,0,0,1,2,0],
    [6,0,0,0,7,5,0,0,9],
    [0,0,0,6,0,1,0,7,8],
    [0,0,7,0,4,0,2,6,0],
    [0,0,1,0,5,0,9,3,0],
    [9,0,4,0,6,0,0,0,5],
    [0,7,0,3,0,0,0,1,2],
    [1,2,0,0,0,7,4,0,0],
    [0,4,9,2,0,6,0,0,7]
]

dgt = [i for i in range(1, 10)]
def dictMaker(defaultValue = 1):
    d = {}
    for d_ in dgt:
        d[d_] = defaultValue
    d[0] = 1
    return d

class group:
    def __init__(self, pos) -> None:
        self.digits = [0 for _ in range(9)]
        self.existing = dictMaker(0)
        self.missing = dictMaker(1)
        self.score = 0
        self.pos = pos
    def add(self, digit, row):
        self.digits[row] = digit
        self.update()
    def update(self):
        self.missing = dictMaker(1)
        self.existing = dictMaker(0)
        self.score = 0
        for d in self.digits:
            self.existing[d] += 1
            self.missing[d] -= 1
            if d != 0:
                self.score += 1

class point:
    def __init__(self, x_, y_) -> None:
        self.x = x_
        self.y = y_
    def sectorFinder(self, r, c):
        s = (r // 3) * 3
        s += c // 3
        return s
    def sectorIndexer(self, r, c):
        return (r % 3) * 3 + c % 3 

class board:
    def __init__(self) -> None:
        self.rows = [group(i) for i in range(9)]
        self.cols = [group(i) for i in range(9)]
        self.sect = [group(i) for i in range(9)] # sectors 0 - 1 - 2 => 3 - 4 - 5...
    
    def update(self, pos, digit):
        r = pos.x
        c = pos.y
        s = (r // 3) * 3
        s += c // 3
        f = pos.sectorIndexer(r, c)
        self.rows[r].add(digit, c)
        self.cols[c].add(digit, r)
        self.sect[s].add(digit, f)

    def isDone(self):
        for r_ in self.rows:
            if 0 in r_.digits:
                return False
        return True   

    def __str__(self) -> str:
        s = ''
        for r in range(0, 9):
            for c in range(0, 9):
                if self.rows[r].digits[c] == 0:
                    s += '.'
                else:
                    s += str(self.rows[r].digits[c])
                if (c + 1) % 3 == 0:
                    s += '|'
            if (r + 1) % 3 == 0:
                    s += '\n--------------'
            s += '\n'
        return s

def backtrackingSolver(b, moves = []):
    if len(moves) == 0:
        return backtrackingSolver(b, [point(0, 0)])
    else:

        # check if we are ok, with the block
        m = moves[-1]
        r = m.x
        c = m.y
        d = b.rows[r].digits[c]
        s = m.sectorFinder(r, c)
        # we already use missing digits so this is not really needed
        # if (b.rows[r].existing[d] > 1) or (b.cols[c].existing[d] > 1) or (b.sect[s].existing[d] > 1):
        #     moves.pop()
        #     return False
        # we are probably ok with this moves, so let's get along => let's explore another square !
        # rowsSorted = list(u for u in b.rows)
        # later TODO

        # r = 0
        # c = -1
        
        while True:
            c += 1
            if c > 8:
                c = 0
                r += 1
                if r > 8:
                    if b.isDone():
                        return b
                    else:
                        return False
            while b.rows[r].digits[c] != 0:
                c += 1
                if c > 8:
                    c = 0
                    r += 1
                    if r > 8:
                        r = 0
                        if b.isDone():
                            return b
                        else:
                            return False

            s = m.sectorFinder(r, c)

            g = b.rows[r].missing
            l = set([list(g.keys())[i] for i in range(9) if list(g.values())[i] >= 1])
            g = b.cols[c].missing
            l2 = set([list(g.keys())[i] for i in range(9) if list(g.values())[i] >= 1])
            g = b.sect[s].missing
            l3 = set([list(g.keys())[i] for i in range(9) if list(g.values())[i] >= 1])
            l = l.intersection(l2).intersection(l3)
            l.discard(0)

            if len(l) == 0:
                return False

            if len(l.union(l2).union(l3)) == 0:
                if b.isDone():
                    return True

            s2 = m.sectorIndexer(r, c)
            s = m.sectorFinder(r, c)

            for p in list(l):
                b.rows[r].add(p, c)
                b.cols[c].add(p, r)
                b.sect[s].add(p, s2)
                res = backtrackingSolver(b, moves + [point(r,c)])
                if res != False:
                    return res
                else:
                    b.rows[r].add(0, c)
                    b.cols[c].add(0, r)
                    b.sect[s].add(0, s2)
            return False


b = board()
for r in range(0, 9):
    for c in range(0, 9):
        b.update(point(r, c), board_[r][c])
bo = backtrackingSolver(b)
s = ''
if bo == False:
    print("UNSOLVABLE")
else:
    for r in range(0, 9):
        for c in range(0, 9):
            s += str(bo.rows[r].digits[c])
            if (c + 1) % 3 == 0:
                s += '.'
        if (r + 1) % 3 == 0:
                s += '\n.............'
        s += '\n'
    print(s)
```

### Bonus : Generate Soduku Boards

We can generate boards with varying amount of *difficulties* using slight modifications.

Let's see : 

```python
# board MAKING
b = board()
upd = []
m = point(0,0)
d = randint(0,8)
b.update(m, d)
while backtrackingSolver(b) == False:
    r = randint(0,8)
    c = randint(0,8)
    d = randint(0,8)

    s2 = m.sectorIndexer(r, c)
    s = m.sectorFinder(r, c)

    if b.rows[r].existing[d] < 1 and b.cols[c].existing[d] < 1 and b.sect[s].existing[d] < 1:
        b.update(point(r, c), d)
print("****SOLUTION****")
print(b)
print("****************")
```

You can put this code inside a `loop` to keep generating boards.

### Still Some work to do

Our solution does work, however some *really* clever soduku puzzles will take too long to solve. It seems there are ways of improving our backtracking.

- Rememeber, we had to fail a **partial** solution if there no moves left ? But that is until we reach that square, so imagine it being the last square on the board ! Then an enormous amount of work will be wasted just to end up in a dead square (*soduku rules say we'll find trouble earlier but still...!*). 
- What about checking for the total amount of allowed moves, (**candidates**), and only going with the less risky option at first ? Let's say a square has only one possible move, then it will be quite sure and it will make our guesses later more established !

My advice to you, if you want to try these, rank the moves from least to biggest, if there is any squares with no moves left immediately *fail*, otherwise start with the less risky squares.


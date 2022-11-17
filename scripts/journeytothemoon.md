
# Table of contents  

# Introduction

JOURNEY TO THE MOON is part of hackerranks's problems. This is mainly a graph-related problem.

## THE PROBLEM

The member states of the UN are planning to send  people to the moon. They want them to be from different countries. You will be given a list of pairs of astronaut ID's. Each pair is made of astronauts from the same country. Determine how many pairs of astronauts from different countries they can choose from.

## EXAMPLE

Say $$ n = 4 $$, and astronauts = [[1,2],[2,3]]
There are four astronauts (0 -> 4) and there are two countries A(0) and B(1,2,3). So that there are *three* pairs to choose from.

## TASK

Complete the journeyToMoon function.

## INPUT 

journeyToMoon has the following parameter(s):

- int n: the number of astronauts
- int astronaut[p][2]: each element astronaut[i] is a  element array that represents the ID's of two astronauts from the same country.

## OUTPUT

long long (64 bit) the number of astronaut pairs.

## LIMITS

$$
1 <= n <= 10^5 \newline
1 <= p <= 10^4 \newline
$$

# SOLVING THE PROBLEM

## ANALYSIS P1  

!> This is a fairly good problem to solve, make sure to give it a try before reading our answer.

At first, you may be tempted to use **Union-Find** algorithms. You'll be excused to do so as this is clearly a grouping problem. But a keen observation will make you reconsider your **choice** :  
Observe that Union-Find lets you find the country of each astronaut, but not *how many astronauts* there are !  
For that you need to loop over the entire array of node parents, each time marking the visited nodes, but as there may be different paths of reaching the same parent (i.e country) from different astronauts, you will have to keep track of each set of astronauts or at least the identifier of the parent node of different astronauts. It's just too messy. We tried that. Too slow !

Anyways, here is a sample :

```c++

typedef long long ll;

struct graph {
    ll *parents;
    ll *maxs;
    bool *found;
    ll count;
    ll num_found = 0;

    graph(int count_) {
        parents = new ll[count_];
        maxs = new ll[count_];
        for (ll i = 0; i < count_; ++i) {
            parents[i] = i; // each element will initially be in its own subset
            maxs[i] = -1;
        }
        count = count_;
    }

    int find(int x, bool note = false) {
        ll par = -1;
        ll max_ = -1;
        while (par != x) {
            if (note && !found[x]) { num_found++; found[x] = true; }
            par = x;
            x = parents[x];
        }

        return par;
    }

    void union_(ll x, ll y) {
        /*
        if (y > x) return union_(y, x);*/
        int par_x = find(x);
        int par_y = find(y);
        int max_x = max(x, maxs[par_x]);
        int max_y = max(y, maxs[par_y]);
        if (max_x > max_y)
        {
            parents[par_x] = max_y;
            maxs[par_y] = max_x;
        }
        else {
            parents[par_y] = max_x;
            maxs[par_x] = max_y;
        }
    }

    vector<ll> countSubsets() {
        found = new bool[count] {false};
        num_found = 0;
        vector<ll> subsets; int s = 0;
        ll last_index = 0;

        for (ll i = count - 1; i > 0; --i) {
            if (!found[i]) {
                // gen subset for i
                find(i, true);
                subsets.push_back(num_found - last_index);
                last_index = num_found;
            }
        }

        return subsets;
    }
};

ll journeyToMoon(int n, vector<vector<int>> astronaut) {
    auto g = graph(n);
    ll n_ = astronaut.size();
    for (ll i = 0; i < n_; i++) {
        auto p = astronaut[i];
        g.union_(p[0], p[1]);
    }
    vector<ll> subsets = g.countSubsets();

    ll result = 0;
    
    // magic //

    return total;
}

```

And it does not look so pretty.

?> This is an example of why you should consider ALL parameters of your problem and not just rely on intuition.

!> Above code can only get you 25 points as it is simply too slow for all test cases.

## ANALYSIS P2

So let's see. What about the classic DFS ? As the astronauts of the same country will all be connected, this is a sure way to locate them all ! Just keep track of the found astronauts, so as not to count / visit them again. So much simpler.

All right, now we have all the astronauts of the same country, just multiply the count of each two sets together and voila !

But no ! If $$ n -> 100000$$ then that will almost $$ O(n ^ (3 / 2)) $$ for a simple count. Just imagine if every astronaut came from a different country (In another planet with 100000 countries).

That is clearly a problem. Luckily, maths's here to save us. Imagine a set of n astronauts each from a different country. Now, there should n-1 choices for the first astronaut, n-2 for the second, etc...   
That is :  
$$
    (n - 1) + (n - 2) + (n - 3) + ... + 1 = n * (n - 1) / 2
$$

Perfect ! Now, what if two astronauts are in the same country ?  
Just think about it : the only change is that they wouldn't be able to be in the same pair. So will have to substract 1.

Idem for more than 2 : Just remove the total combinations of 2 of the total count of the country.

That is a loop of $$ O(n) $$, not $$ O(n ^ (3 / 2)) $$ 

# Solution

```c++

// JOURNEYTOTHEMOON.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <vector>

/* * Complete the 'journeyToMoon' function below. * * The function is expected to return an llEGER. * The function accepts following parameters: * 1. llEGER n * 2. 2D_llEGER_ARRAY astronaut */
using namespace std;
typedef long long ll;

ll dfs(vector<vector<ll>> &vertices, bool* visited, ll node) {
    ll count = 1; visited[node] = true;
    for (ll i = 0; i < vertices[node].size(); ++i) {
        if (!visited[vertices[node][i]])
            count += dfs(vertices, visited, vertices[node][i]);
    }
    return count;
}

#define MAXCOUNTRIES 100005

ll journeyToMoon(ll n, vector<vector<ll>> astronaut) {
    ll n_ = astronaut.size();
    vector<vector<ll>> vertices(n, vector<ll>() );
    bool visited[MAXCOUNTRIES] { false };
    vertices.reserve(n);

    for (ll i = 0; i < n_; i++) {
        vertices[astronaut[i][1]].push_back(astronaut[i][0]);
        vertices[astronaut[i][0]].push_back(astronaut[i][1]);
    }

    vector<ll> subsets;

    for (ll i = 0; i < n; ++i) {
        if (vertices[i].size() && !visited[vertices[i][0]])
            subsets.push_back(dfs(vertices, visited, i));
    }


    ll result = 0;
    ll n_subsets = subsets.size();
    ll total = n * (n - 1) / 2;
    for (ll i = 0; i < n_subsets; ++i) {
        total -= (subsets[i] - 1) * subsets[i] / 2; 
       
    }

    return total;
}

int main()
{
    vector<vector<ll>> v{ {2, 1}, {4, 3},};
    ll r = journeyToMoon(100000, v);
}


```
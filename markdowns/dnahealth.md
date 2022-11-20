# Table of contents  

# The problem  
Determining DNA Health is part of Kickstart 2018/Round A.  
[Link to the official Hackerrank problem](https://www.hackerrank.com/challenges/determining-dna-health)

## Statement of the problem  
I am going to sum up the problem statement. For more details please read the official problem statement.  
So we basically have to count the occurences of **"n"** pattern strings, in a total of **"s"** DNA strings.  
For example in the DNA string "dpps", with patterns ["s","d"], there is *one* "s" and *one* "d".  
While counting the occurences, we want to find the health of each gene found (which must be bound by a maximum and minimum value given for each DNA string), and keep note of the maximum health and minimum health of all the given DNA strings.  

That is basically a pretty short summary of the problem statement.  
So given the following:

1. An array of beneficial gene strings, ``` genes = [g0, g1, g2, ..., g(n-1)]```. Note that these gene sequences are not guaranteed to be **distinct**. VERY IMPORTANT.
2. An array of gene health values, ``` health = [h0, h1, h2, ..., h(n-1)]``` , where each h(i) is the health value for gene g(i).
3. A set of  DNA strands where the definition of each strand has three components, start , end , and d, where string d is a DNA for which genes g(start...end) inclusive are healthy.

## Input

The input starts with one line containing one integer **T**: the number of test cases. T test cases follow.

Each test case consists of two lines. The first line consists of two integers N and K: the number of items in the bag, and the maximum number of times you may redip. The second line consists of **N** integers **Vi**, each representing the value of the **i-th item**.

## Constraints

let **sum** be the sum of the lengths of all genes and DNA strands

$$
0 ≤ sum ≤ 2 * 10^6  \newline

1 ≤ n,s ≤ 10^5  \newline

0 ≤ first ≤ last < n  \newline

$$

-   the sum of the lengths of all genes and DNA strands
-   It is guaranteed that each g(i) consists of lowercase English alphabetic letters only (i.e., `a` to `z`).

## Output

Print two space-separated integers describing the respective total health of the _unhealthiest_ and the _healthiest_ strands of DNA.


## Limits

Memory limit: 1GB.


# Analysis

This is the most interesting part. Let's try to understand what the problem really wants us to do !

!> Spend more time studying the problem by yourself for better results.

## Concretisation, first part

So this is a classic multiple pattern searching problem. (read about grep !)
If you've never heard of it, please read more [here](https://en.wikipedia.org/wiki/String-searching_algorithm).  

?> There are many algorithms that could be used, for instance KMP, Aho-Corasick, please take enough time to read about each of these algorithms and their respective usage cases.

++So, why Aho-Corasick ?++

A simple and inefficient way to see where one string occurs inside another is to check at each index, one by one. This could lead to $$ O(n * s) $$ running time. Almost a year running time ! See [Growth rates of common functions measured in nanoseconds](#).

!> Aho-Corasick being an extension of KMP is very lengthy in its implementation. Use KMP whenever it's enough.

Once we find the occurences of patterns within each DNA string, then the rest is easy to implement. Just check whether the search results are within $$ first <= result <= last $$ and lastly keep only the ` minimum ` and `maximum`, which should be `unsigned long long`.

All in all, we're looking into a complexity of $$ O(n + s) $$ which should be fine for the given limits.

From the author's editorial :
> Let F(i, str) be the purity value of the string str when considering only the genes in the range 1 to i (inclusive). Then the answer for the query (L, R, str) is equal to the value F(R, str) - F(L-1, str). We will calculate the values of F(i, str) using the Aho-Corasick algorithm. We insert all the genes into the automaton (trie) at the beginning, and for each query string, store the sequential order of nodes visited while iterating through that string. Now, if you are node x in the automaton, all the genes which end at this position can be reached by suffix links from the current node. So, from the Aho-Corasick trie, create another tree. Node a is the parent of node b in the newly created tree if a is the suffix link of b in the automaton. For a particular node in the new tree which corresponds to some gene, that gene occurs as a substring in all the nodes in its subtree.

## Concretisation, second part

The trick is to see that there may be many alterations to be added to a classic Aho-Corasick implementation. 

- We may have **multiple** duplicate `genes`. Therefore, the automaton to be constructed needs to keep in mind that many duplicate patterns *may exist* and as a result may choose, for example, to keep a record of all patterns (or their respective indexes within array `genes`) in a `vector<int>` or a `vector<string>`.
- Also, when searching for results, we have to loop over the entire `vector<int>` of all valable patterns, and only then to find out whether they fit within range $$ first <= result <= last $$.
- We have to construct one automaton for all the given DNA strings, but ultimately as mentioned in above points, we may have to post-produce the resulting health after searching for all `genes` within the DNA string.


## Optimisation

This solution might work well as long as we keep using **pointer and references** whenever possible. Not only that, but as the DNA has characters within `a-z` (abcd...z) it is best that we construct our automaton of an array of pointers to nodes. This array should have a fixed size of 26, with default `nullptr`.

As such, my implementation of the struct :
```c++
struct gene
{
    gene* next[26];
    vector<int> w;

    gene* failure = nullptr;

    gene() {
        for (int i = 0; i < 26; ++i) {
            next[i] = nullptr;
        }
    }
};
```
Why so ? this is implicitely equivalent to a `map<char, gene*>`. But as we have ways to convert our determined range (a-z) of characters, we can simply look for the character at its given index. How ? See :

```c++
    char int_to_char(const int& i) {
        return char('a' + i);
    }

    int char_to_int(const char& c) {
        return c - 'a';
    }

```
This also saves us from looping the entire `gene->next` array looking for some character ! Smart and efficient.

?> Always check your data range for the best optimised data structures to be used, Consider thoroughly how your data travels during its lifetime for the best optimised implementations.

# Final Solution
This is my implementation (C++) for my final solution :

```c++
// dnahealth.cpp : This file contains the 'main' function. Program execution begins and ends there.
//

#include <iostream>
#include <vector>
#include <deque>
#include <map>

using namespace std;


struct gene
{
    gene* next[26];
    vector<int> w;

    gene* failure = nullptr;

    gene() {
        for (int i = 0; i < 26; ++i) {
            next[i] = nullptr;
        }
    }
};

struct graph
{
    gene *automaton;
    vector<string> patterns;

    char int_to_char(const int& i) {
        return char('a' + i);
    }

    int char_to_int(const char& c) {
        return c - 'a';
    }

    void insert(const char *word, int len_, int index) {
        gene* p = automaton;

        while (word && *word != '\0') {
            const char& e = *word;
            int pos = char_to_int(e);
            if (!p->next[pos])
                p->next[pos] = new gene();
            p = p->next[pos];
            word++;
        }
        p->w.push_back(index);
    }

    void constructFailure()
    {
        deque<gene*> q;
        q.push_back(automaton);

        while (!q.empty()) {
            auto p_ = q.front();
            q.pop_front();

            for (int i = 0; i < 26; ++i) {
                if (p_->next[i] != nullptr) {
                    if (p_ == automaton) {
                        p_->next[i]->failure = automaton;
                    }
                    else {
                        auto f = p_->failure;
                        while (f && f->next[i] == nullptr)
                            f = f->failure;
                        if (f == nullptr)
                            p_->next[i]->failure = automaton;
                        else
                            p_->next[i]->failure = f->next[i];

                    }
                    q.push_back(p_->next[i]);
                }
            }
        }
    }

    graph(vector<string> &genes)
    {
        patterns = genes;
        automaton = new gene();

        // compiling follow-edges 

        int gen_ind = 0;
        for (const auto& g : genes) {
            // compile the gene ionto our automaton
            insert(g.c_str(), g.length(), gen_ind);
            gen_ind++;
        }


        // compiling failure edges
        // BFS IMPLEMENTATION OF FAILURES
        constructFailure();

        // everything is setup up perfectly for now ;)

    }

    vector<pair<int, vector<int>*>> findMatches(const char* str)
    {
        vector<pair<int, vector<int>*>> matches;
        int i = 0;
        gene* p = automaton;

        while (str && *str != '\0')
        {
            int ind = char_to_int(*str);
            while (p->next[ind] == nullptr && p != automaton)
                p = p->failure;
            if (p->next[ind] == nullptr) {
                i++; str++;
                continue;
            }
            p = p->next[ind];
            auto p_ = p;
            while (p_ != automaton) {
                if (!p_->w.empty())
                    matches.push_back(make_pair(i, &p_->w));
                p_ = p_->failure;
            }
            i++; str++;
        }

        return matches;
    }

};

unsigned long long  dnaHealth(graph &g, int first, int last, string d, vector<int> &health)
{
    // 
    unsigned long long  h = 0;
    auto res = g.findMatches(d.c_str());
    for (auto const& i : res) {
        auto r = i.second;
        for (const auto& e : (*r)) {
            if (e >= first && e <= last) {
                h += health[e];
            }
        }
    }

    return h;
}

int main()
{
    vector<string> genes{ "a", "b", "c","aa", "d", "b"};
    vector<int> health{ 1,2,3,4,5,6 };
    graph g = graph(genes);
    dnaHealth(g, 1, 5, "caaab", health);
    dnaHealth(g, 0, 4, "xyz", health);
    dnaHealth(g, 2, 4, "bcdybc", health);
}

```

# Final Notes

If you've just read the analysis. Please, just try to implement the algorithm yourself. It would help you a lot.
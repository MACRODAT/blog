# Problem

Marc loves cupcakes, but he also likes to stay fit. Each cupcake has a calorie count, and Marc can walk a distance to expend those calories. If Marc has eaten cupcakes so far, after eating a cupcake with `c` calories he must walk _at least_ % $$$ 2^j * c  $$$ miles to maintain his weight.

Given the individual calorie counts for each of the cupcakes, determine the minimum number of miles Marc must walk to maintain his weight. Note that he can eat the cupcakes in any order.

minimum number of miles Marc must walk to maintain his weight. Note that he can eat the cupcakes _in any order_.

## **Function Description**

Complete the _marcsCakewalk_ function in the editor below.

marcsCakewalk has the following parameter(s):

- _int calorie\[n\]:_ the calorie counts for each cupcake

## **Returns**

- _long:_ the minimum miles necessary

## **Input Format**

The first line contains an integer `n`, the number of cupcakes in `calorie`.
The second line contains `n` space-separated integers, `calorie[n]`.

## Constraints

$$$
    1 <= n <= 40 \newline
    1 <= c[i] <= 1000 \newline
$$$

# Solution

```c++

#include <bits/stdc++.h>

using namespace std;

string ltrim(const string &);
string rtrim(const string &);
vector<string> split(const string &);

/*
 * Complete the 'marcsCakewalk' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts INTEGER_ARRAY calorie as parameter.
 */

long marcsCakewalk(vector<int> calorie) {
    sort(calorie.begin(), calorie.end(), greater<int>());
    long result = 0;
    for (int i = 0; i < calorie.size(); ++i) result += calorie[i] * pow(2, i);
    return result;
}

int main()
{
    ofstream fout(getenv("OUTPUT_PATH"));

    string n_temp;
    getline(cin, n_temp);

    int n = stoi(ltrim(rtrim(n_temp)));

    string calorie_temp_temp;
    getline(cin, calorie_temp_temp);

    vector<string> calorie_temp = split(rtrim(calorie_temp_temp));

    vector<int> calorie(n);

    for (int i = 0; i < n; i++) {
        int calorie_item = stoi(calorie_temp[i]);

        calorie[i] = calorie_item;
    }

    long result = marcsCakewalk(calorie);

    fout << result << "\n";

    fout.close();

    return 0;
}

string ltrim(const string &str) {
    string s(str);

    s.erase(
        s.begin(),
        find_if(s.begin(), s.end(), not1(ptr_fun<int, int>(isspace)))
    );

    return s;
}

string rtrim(const string &str) {
    string s(str);

    s.erase(
        find_if(s.rbegin(), s.rend(), not1(ptr_fun<int, int>(isspace))).base(),
        s.end()
    );

    return s;
}

vector<string> split(const string &str) {
    vector<string> tokens;

    string::size_type start = 0;
    string::size_type end = 0;

    while ((end = str.find(" ", start)) != string::npos) {
        tokens.push_back(str.substr(start, end - start));

        start = end + 1;
    }

    tokens.push_back(str.substr(start));

    return tokens;
}

```
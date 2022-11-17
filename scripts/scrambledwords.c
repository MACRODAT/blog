
#include<iostream>
#include<stdio.h>
#include<cstdio>
#include<string>
#include<cmath>
#include<stdlib.h>
#include<algorithm>
#include<string.h>
#include<cstring>
#include<vector>
#include<queue>
#include<map>
#include<set>
#include<windows.h>
using namespace std;
//Problem C Google Kickstart 2018
const int maxn=1010;
int T;
int N;
int L;
int A;
int B;
int C;
int D;
char arr[maxn];
string dict[maxn];
char S1;
char S2;
long long x[maxn];
int ans;
int main()
{
//    string a="ee";
//    sort(a.begin()+1,a.end()-1);
//    cout<<a<<endl;
//    return 0;
//    freopen("input.txt","r",stdin);
    freopen("C-small-practice.in","r",stdin);
    freopen("C.txt","w",stdout);
    scanf("%d",&T);
    for(int ca=1;ca<=T;ca++)
    {
        memset(arr,0,sizeof(arr));
        memset(x,0,sizeof(x));
        ans=0;
        //memset(dict,0,sizeof(dict));
        scanf("%d",&L);
        for(int i=0;i<L;i++)
        {
            cin>>dict[i];
            sort(dict[i].begin()+1,dict[i].end()-1);
        }
        cin.ignore();
        scanf("%c %c %d %d %d %d %d",&S1,&S2,&N,&A,&B,&C,&D);
        //cout<<S1<<" "<<S2<<" "<<N<<" "<<A<<" "<<B<<" "<<C<<" "<<D<<endl;
        x[0]=S1-'a'+97;
        x[1]=S2-'a'+97;
        arr[0]=S1;
        arr[1]=S2;
        for(int i=2;i<N;i++)
        {
            x[i]=(A%D)*(x[i-1]%D)+(B%D)*(x[i-2]%D)+C%D;//mod 26 to avoid overflow?
            x[i]%=D;
            arr[i]=97+x[i]%26;
        }
//        cout<<arr<<endl;
//        char cmparr[]="aapxjdnrbtvldptfzbbdbbzxtndrvjblnzjfpvhdhhpxjdnrbt";
//        if(strcmp(cmparr,arr)==0)
//        {
//            cout<<"ok"<<endl;
//        }
        for(int i=0;i<L;i++)
        {
            //cout<<dict[i]<<endl;
            for(int j=0;j<N;j++)
            {
                //cout<<j<<endl;
                //cout<<dict[i][0]<<" "<<arr[j]<<" "<<dict[i][dict[i].length()-1]<<" "<<arr[j+dict[i].length()-1]<<endl;
                if(j+dict[i].length()<=N&&dict[i][0]==arr[j]&&dict[i][dict[i].length()-1]==arr[j+dict[i].length()-1])
                {
                    //cout<<"here"<<endl;
                    char tmparr[100010];
                    for(int k=j;k<j+dict[i].length();k++)
                    {
                        tmparr[k-j]=arr[k];
                    }
                    tmparr[dict[i].length()]='\0';
                    //cout<<tmparr<<endl;
                    sort(tmparr+1,tmparr+dict[i].length()-1);
                    bool flg=true;
                    for(int k=0;k<dict[i].length();k++)
                    {
                        if(dict[i][k]!=tmparr[k])
                        {
                            flg=false;
                            break;
                        }
                    }
                    if(flg==true)
                    {
                        ans++;
                        break;
                    }
                }
            }
        }
        printf("Case #%d: %d\n",ca,ans);
    }
    return 0;



    -----
    import sys
#file = 'test'
#file = 'small'
file = 'large'
 
ques = 'C'
 
res = []
 
def slove(a,n,s1,s2,N,A,B,C,D):
    s=['']*N
    s[0],s[1]=s1,s2
    x=[0]*N
    x[0],x[1]=ord(s1),ord(s2)
    for i in range(2,N):
        x[i] = (A*x[i-1]+B*x[i-2]+C)%D
        s[i]=chr(97+x[i]%26)
    s=''.join(s)
    
    ret = 0
    for ss in a:
        for i in range(len(s)-len(ss)+1):
            st = s[i:i+len(ss)]
            if st[0]==ss[0] and st[-1]==ss[-1] and (len(ss)<=2 or sorted(ss[1:-1])==sorted(st[1:-1])):
                ret+=1
                break
    return ret
    
sys.stdin = open('%s-%s-practice.in'%(ques, file), 'r')
cases = int(input())
for i_ in range(cases):
    n=int(input())
    a=input().strip().split(' ')
    b=input().strip().split(' ')
    s1,s2,N,A,B,C,D=b[0],b[1],int(b[2]),int(b[3]),int(b[4]),int(b[5]),int(b[6])
    res.append(slove(a,n,s1,s2,N,A,B,C,D))
    
fp = open('%s-%s-practice.out'%(ques, file), 'w')
for i_,c in enumerate(res):
    fp.write('Case #%d: %d\n'%(i_+1,c))

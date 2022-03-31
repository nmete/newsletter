#include<iostream>
using namespace std;


void permutation(string str, string op)
{
      if(str.length() == 0)
      {
      	cout<<op<<" ";
      	return;
      }
      
      permutation(str.substr(1),op+str[0]);
      permutation(str.substr(1),op+(char)toupper(str[0]));

}
int main()
{
    string str;

    cin>>str;

    permutation(str,"");
	return 0;
}
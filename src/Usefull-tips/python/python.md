# Python

## Change file extension

```python
import os,sys,glob
folder = '/Users/zhuoleidong/Desktop/self-study/leetcode-txt-version/array'
folder1 = '/Users/zhuoleidong/Desktop/self-study/leetcode-txt-version/backtracking'
folder2 = '/Users/zhuoleidong/Desktop/self-study/leetcode-txt-version/linkedList'
folder3 = '/Users/zhuoleidong/Desktop/self-study/leetcode-txt-version/math'

for filename in os.listdir(folder3):
    print(filename)
    infilename = os.path.join(folder3,filename)
    if not os.path.isfile(infilename): continue
    oldbase = os.path.splitext(filename)
    newname = infilename.replace('.java', '.txt')
    output = os.rename(infilename, newname)

read_files = glob.glob('/Users/zhuoleidong/Desktop/self-study/leetcode-txt-version/*/*.txt')
with open("leetcode.txt", "wb") as outfile:
    for f in read_files:
        with open(f, "rb") as infile:
            outfile.write(infile.read())
        outfile.write('\n\n'.encode())
```
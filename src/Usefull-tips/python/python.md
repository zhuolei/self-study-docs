# Python

## Pycharm 快捷键

### keybinding eclipse
alt + 右箭头 前进到源码所在位置 Navigate ➡
alt + 左箭头 看源码时回到调用源码的位置
alt + 上下箭头 两行代码调换位置
ctrl + f 搜索
ctrl + h 全局搜索
shift + 回退键 多行回退
home end 行首和行尾
shift + end 光标在行首， 选择这一行
ctrl + o
ctrl + shift + r Navigate file...


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
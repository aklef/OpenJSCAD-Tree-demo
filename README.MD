# OpenJSCAD Tree Demo #

I saw this beautiful tree somewhere on the internet and got inspired

!["Fractal tree"](../fractaltree.png)

"Fractal tree" ([tree.c](https://github.com/smcameron/opencscad/blob/master/tree.c "tree.c"), 47 lines of C code.) ([source](http://smcameron.github.io/opencscad/ "source"))

... to make the same tree in OpenJSCAD! (spoiler: it sorta fails)

I ported it, then generated the following portion of a tree before node.js ate up all my RAM and crashed...

!["Recursive tree attempt"](../RecursiveTree.jscad.JPG)

"Recursive tree with a Depth of 5" ([RecursiveTree.jscad](../RecursiveTree.jscad "RecursiveTree.jscad"), 49 lines of JavaScript.) ([source](../RecursiveTree.stl "source"))

Then I made an iterative version that uses MUCH less RAM... 

Here's a web-generated tree with a Depth of 4 that uses only a few hundred megs of memory:

!["Iterative tree with a Depth of 4"](../tree-web.JPG)

"Iterative tree with a Depth of 4" ([tree.jscad](../tree.jscad "tree.jscad"), 44 lines of JavaScript.) ([source](../tree-web.stl "source"))

And another similar tree, loaded into Cura.

!["Iterative tree with a Depth of 4"](../tree.jscad.JPG)

"Iterative tree with a Depth of 4" ([tree.jscad](../tree.jscad "tree.jscad"), 44 lines of JavaScript.) ([source](../tree.jscad.stl "source"))

I attempted to generate the tree with a Depth of 5, as in the original. However, it failed twice, each time after about five hours computing and using all the (gig and a half) of memory I'd given node. 
([treeDepth5.jscad](../treeDepth5.jscad "treeDepth5.jscad"), also 44 lines of JavaScript but won't terminate properly, for me.)

// title      : OpenJSCAD.org Logo
// orig_author: Stephen M. Cameron
// orig_URL   : https://github.com/smcameron/opencscad/blob/master/tree.c
// author     : Andréas K.LeF.
// license    : MIT License
// revision   : 0.003
// tags       : Logo,Intersection,Sphere,Cube
// file       : tree.jscad

// Gives a number between 0 and at least 32767.
// see https://www.cplusplus.com/reference/cstdlib/RAND_MAX/
const r = () =>    Math.random();
const fixup = n => (Math.abs(n) < 0.0000001) ? 0 : n;
const TILTANGLE =  fixup(25 + r() * 10);
const ZANGLE =     fixup(r() * 360);
const HEIGHTFACT = r() * 0.3 + 0.6;

const makeBranch = (b, tilt, height, vector) =>
           translate([0, 0, fixup(height)],
                     rotate(tilt, vector,
                            rotate(ZANGLE, [0, 0, 1], b)));

const stick = height => cylinder({h: height,        //Default = height
                                 r1: (height/17),   //Default = height/18
                                 r2: (height/21)}); //Default = height/20

function makeTree(ofHeight, Depth)
{
  var tree; console.log("Making tree...");

  for (var level = Depth, ofHL, up, branches; level >= 0; level--)
  {
    branches = Math.floor(4**(level));
    //console.log("[Start] Level "+level+" with "+branches+" branches to expand");
    ofHL = ofHeight[level];
    up = level+1;

    for (var branch = 0, bunch; branch < branches; branch++)
    {
      bunch = stick(ofHL);
      //console.log("expanding branch " + branch + "...");
      if (tree && tree[up])
        bunch = union(bunch,
                      makeBranch(tree[up].pop(),  TILTANGLE, ofHL, [1, 0, 0]),
                      makeBranch(tree[up].pop(), -TILTANGLE, ofHL, [1, 0, 0]),
                      makeBranch(tree[up].pop(),  TILTANGLE, ofHL, [0, 1, 0]),
                      makeBranch(tree[up].pop(), -TILTANGLE, ofHL, [0, 1, 0]));
      else if (!tree)
        tree = Array(up).fill(null).map(() => Array(0));

      tree[level].push(bunch);
    }
    //console.log(tree);
    //console.log("[Done!] expanded tree to level "+level);
  }
  console.log("[Done] tree filled!");
  // console.log("[STL] generating mesh...");
  return tree[0][0];
}

function main()
{
  var   Heights = [ 33 ]; // Default is 20: the max segment height
  const Depth   = 4; // Default is 4 cuz 5 breaks my pc. How many (stick+branch) layers our tree has.

  console.log("Making a tree" +
              "TILTANGLE :    " + TILTANGLE +
              "\nZANGLE :     " + ZANGLE +
              "\nHEIGHTFACT : " + HEIGHTFACT +
              "\nDepth :      " + Depth);

  for (var i = 1; i <= Depth; i++)
    Heights[i] = (Heights[i-1] * HEIGHTFACT);

  console.log(Heights);
  return makeTree(Heights, Depth);
}

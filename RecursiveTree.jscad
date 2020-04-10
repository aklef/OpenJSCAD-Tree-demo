// title      : OpenJSCAD.org Logo
// orig_author: Stephen M. Cameron
// orig_URL   : https://github.com/smcameron/opencscad/blob/master/tree.c
// author     : Andréas K.LeF.
// license    : MIT License
// revision   : 0.003
// tags       : Logo,Intersection,Sphere,Cube
// file       : tree.jscad

// See https://www.cplusplus.com/reference/cstdlib/RAND_MAX/
// Gives a number between 0 and at least 32767.
function r()
{
    return Math.random()  ;
}

let TILTANGLE = fixup(25 + r() * 10);
let ZANGLE = fixup(r() * 360);
let HEIGHTFACT = (r() * 0.3 + 0.6);

function fixup(n)
{
    return (Math.abs(n) < 0.0000001) ? 0 : n;

}

function branch(level, tilt, height, vector)
{
    let b = makeTree(level, (height * HEIGHTFACT));

    b = rotate(ZANGLE, [0, 0, 1], b);
    b = rotate(tilt, vector, b);
    b = translate([0, 0, fixup(height)], b);
   return b;
}

function makeTree(level, height)
{
   var tree = cylinder({h: height,
                        r1: (height/18),
                        r2: (height/20)
                        });
   // Work on the branches
   if (level <= 5)
   {
        level++;
        tree = union(tree,
                     //branch(level, TILTANGLE, height, [1, 0, 0]),
                     //branch(level,-TILTANGLE, height, [1, 0, 0]),
                     //branch(level, TILTANGLE, height, [0, 1, 0]),
                       branch(level,-TILTANGLE, height, [0, 1, 0])
                     );
   }
   // Base case. (Default level is 5)
   return tree;
}

function main()
{
    console.log("Making a tree");
    console.log("TILTANGLE : "    + TILTANGLE +
                "\nZANGLE : "     + ZANGLE +
                "\nHEIGHTFACT : " + HEIGHTFACT);
  return makeTree(0, 33);
}

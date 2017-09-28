"use strict";

var tree = [];
var count = 0;

var leaves = [];

var txt;

function setup() {
   createCanvas(800, 500);
   colorMode(HSL);

   var lenTree = 200;
   var a = createVector(width / 2, height);
   var b = createVector(width / 2, height - lenTree);
   var root = new Branch(a, b);

   tree[0] = root;

   var button = createButton("CLICK ME!");
   button.mousePressed(runTree);
   //button.position(width/2, height/2);
}

function runTree() {
   for (var i = tree.length - 1; i >= 0; i--) { //as we add more stuff to the array, the end increases. This is why we start from the end of the array
      if (!tree[i].finished) {
         tree.push(tree[i].branchR());
         tree.push(tree[i].branchL());
      }
      tree[i].finished = true;
   }

   count++;
   if (count === 6) {
      for (var i = 0; i < tree.length; i++) {
         if (!tree.finished) {
            leaves[i] = new Leaves(tree[i].end.x, tree[i].end.y);
         }
      }
   }
}

function draw() {
   frameRate(10);
   background(255);

   for (var i = 0; i < tree.length; i++) {
      var t = tree[i];
      t.show();
      t.jitter();
      t.fall();
   }

   for (var i = 0; i < leaves.length; i++) {
      var l = leaves[i];

      var gravity = createVector(0, 1);
      gravity.mult(l.mass);
      l.applyForce(gravity);

      var friction = p5.Vector.mult(l.vel, -1);
      friction.normalize();
      friction.mult(2);
      friction.limit(l.vel.mag());
      l.applyForce(friction);

      var wind = createVector(random(-2, 3), 0);
      l.applyForce(wind);

      l.update();
      l.bounce();
      l.display();
   }
}

class Leaves {
   constructor(x, y) {
      this.pos = createVector(x, y);
      this.vel = createVector(0, 0);
      this.acc = createVector();
      this.mass = random(1, 2);
      this.size = 10 * this.mass;
   }

   update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0); //so it don't just keep on rolling
   }

   applyForce(force) {
      force.div(this.mass); //pay attention to this
      this.acc.add(force);
   }

   bounce() {
      if (this.pos.x < 0 || this.pos.x > width) {
         this.vel.x = -this.vel.x;
         this.vel.mult(0.8);
      }
      if (this.pos.y < 0 || this.pos.y > height) {
         this.vel.y = -this.vel.y;
         this.vel.mult(0.8);
      }
      this.pos.x = constrain(this.pos.x, 0, width);
      this.pos.y = constrain(this.pos.y, 0, height);
   }

   display() {
      push();

      fill(random(0, 50), 100, 50, .2);
      noStroke();

      ellipse(this.pos.x, this.pos.y, this.size);
      pop();
   }
}

// count++;
// if (count === 6) {
//    for (var i = 0; i < tree.length; i++) {
//       if (!tree[i].finished) {
//          var leaf = tree[i].end.copy();
//          leaves.push(leaf);
//       }
//    }
// }
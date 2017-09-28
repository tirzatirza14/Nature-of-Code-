function Branch(begin, end) {
   this.begin = begin;
   this.end = end;
   this.finished = false;
   
   this.strokeW = 1;

   this.jitter = function() {
      this.end.x += random(-1, 1);
      this.end.y += random(-1, 1);
   }

   this.fall = function(){
      this.end.y += (0, 1);
      this.end.z += (0,0,11);
   }
   this.show = function() {
      stroke(0);
      line(this.begin.x, this.begin.y, this.end.x, this.end.y);
   }

   //let's figure out how to condense this 
   this.branchR = function() {
      var dir = p5.Vector.sub(this.end, this.begin); //vector of the direction of the new branch
      dir.rotate(PI / 4);
      dir.mult(random(0.67, 1));
      var newEnd = p5.Vector.add(this.end, dir);
      var b = new Branch(this.end, newEnd)
      return b; //return it so we can get the right branch
   }

   this.branchL = function() {
      var dir = p5.Vector.sub(this.end, this.begin); //vector of the direction of the new branch
      dir.rotate(-PI / 4);
      dir.mult(random(0.5, 0.67));
      var newEnd = p5.Vector.add(this.end, dir);
      var b = new Branch(this.end, newEnd)
      return b; //return it so we can get the left branch
   }
}
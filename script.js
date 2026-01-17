"use strict"

// you will see object name and getName
let obj = {
    name: "Amil",
    getName() {
        console.log(this);
    }
}

obj.getName();
/////////////////////

// now if you use arrow function you will get window object.
let obj1 = {
    name: "Amil",
    getName: ()=> {
        console.log(this);
    }
}

obj1.getName();
///////////////////////


// now check value of this in arrow function as arrow function don't have own this it takes it from lexical scope.
const amil = () =>{
    console.log(this);
}
amil();
/////////////////////

// now use normal function
// you will get undefine
// coz this look for object as it encosed with function not method.
function ali(){
    console.log(this);
}
ali();
/////////////////

// now we can reuse the method of other object in other object

const obj3 = {
    name: "ali waris"
}

obj.getName.call(obj3); 
// Invokes getName immediately with `this` set to obj3.

obj.getName.apply(obj3, ['sjnkjs', 'test']); 
// Same as call, but arguments are passed as an array.

const x = obj.getName.bind(obj3); 
// Returns a new function with `this` permanently bound to obj3.
x();


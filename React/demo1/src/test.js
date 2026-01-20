const obj = {
    name: {
        name: "Amil"
    },
    name2: {
        name: "Ali"
    }

}

// Rename the inner 'name' property to avoids conflicts
const { 
  name: { name: actualName1 }, 
  name2: { name: actualName2 } 
} = obj;

console.log(actualName1, actualName2); // "Amil", "Ali"

// console.log(name.name, name2.name);
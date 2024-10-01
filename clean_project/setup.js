#!/usr/bin/node

let child = require('child_process');

let altervativeBuildTaken = false;
const initialList = ["cmake", "tree-sitter"];

let checkInPath = (binaryList) => {

    for (let i = 0; i < binaryList.length; i++){
        let binary = binaryList[i];

        let whichCommand = process.platform == 'win32'? 'where.exe' : 'which';
        
        let binaryExists = child.spawnSync(whichCommand, [binary]).status === 0;

        if (binaryExists) {
            console.log(`${binary} found on OS PATH`)
        }
        else {
            console.log(`${binary} not found on OS PATH`)
            return false;
        }
    }
    return true;
}


if (checkInPath(initialList)){
    console.log("All binaries needed on OS Path found\n");
}
else {
    console.log(`Missing binary on OS path from list ${initialList}`)
    let alternative_list = ["cmake", "rustc", "cargo"];

    if (checkInPath(alternative_list)){
        console.log(`altervative build path found\n`)
    } else {
        console.log(`Programs needed for this project to be built are missing.`)
        console.log(`Either program in list ${initialList} or in list ${alternative_list} are needed`)
        process.exit(1)
    }
}


// Template generation
console.log("Starting grammar.js generation")



#!/usr/bin/env node
const fsPromises = require('fs/promises');
const fs = require('fs');
const chalk = require('chalk'); 
const path = require('path');



// option 3 using fsPromises
const { lstat } = fsPromises;

const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
    if (err) {
        console.log(err);
    } 
    const statPromises = filenames.map(filename => {
        return lstat(path.join(targetDir, filename));
    });

    const allStats = await Promise.all(statPromises);

    for (let stats of allStats) {
        const index = allStats.indexOf(stats);

        if (stats.isFile()) {
            console.log(chalk.green(filenames[index]))
        } else {
            console.log(chalk.blue(filenames[index]));
        }
        
    }
});

// 1 using promise manually

/* const lstat = (filename) => {
    return new Promise((resolve, reject) => {
        fs.lstat(filename, (err, stats) => {
            if (err) {
                reject(err);
            }
            resolve(stats);
        })
    })
} */


// 2 using promise with util module and promisify 
//const lstat = util.promisify(fs.lstat);


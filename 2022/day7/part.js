import { Day } from '../Util.js';

console.clear();

export class Part extends Day {
    constructor(fileName) {
        super(fileName);
    }

    render() {
        console.log(this.data);

        // **** Part 1 *** //
        // this.part1(this.data);

        // *** Part 2 *** //
        this.part2(this.data);

    }

    buildFileSystem(data) {
        let paths = {
            '/': {
                files: [],
                size: 0
            }
        };
        let currentPath = [];

        for (let d of data) {
            if (d.match(/\$/g)) {
                let command = d.split(' ');
                if (command[1] === 'cd') {
                    if (command[2] === '..') {
                        currentPath.pop();
                    } else {
                        currentPath.push(command[2]);
                    }
                } 
            } else {
                let output = d.split(' ');
                if (d.match(/\d+/g)) {
                    paths[currentPath.join('')].files.push({ name: output[1], size: +output[0] });
                    paths[currentPath.join('')].size += (+output[0]);
                    
                    let checkPath = currentPath.slice();
                    checkPath.pop();
                    while (checkPath.length > 0) {
                        paths[checkPath.join('')].size += (+output[0]);
                        checkPath.pop();

                    }
                } else {
                    paths[currentPath.join('') + output[1]] = {
                        files: [],
                        size: 0
                    }
                }
            }
        }

        return paths;
    }

    part1(data) {
        let fileSystem = this.buildFileSystem(data);

        let max100k = Object.keys(fileSystem).reduce((a,c) => {
            if (fileSystem[c].size < 100000) {
                a += fileSystem[c].size;
            }

            return a;
        }, 0);

        console.log(max100k);
    }

    part2(data) {
        let fileSystem = this.buildFileSystem(data);
        let totalDiskSpace = 70000000;
        let neededUnusedSpace = 30000000;
        let currentUnusedSpace = totalDiskSpace - fileSystem['/'].size;
        let spaceLeftToDelete = neededUnusedSpace - currentUnusedSpace;

        console.log(fileSystem);
        console.log('currentUnusedSpace', currentUnusedSpace);
        console.log('spaceLeftToDelete', spaceLeftToDelete);

        let dirsBigEnough = Object.keys(fileSystem).reduce((a,c) => {
            if (fileSystem[c].size > spaceLeftToDelete) {
                a.push(fileSystem[c]);
            }

            return a;
        }, []).sort((a,b) => a.size - b.size);

        console.log('result', dirsBigEnough[0].size);

    }
}
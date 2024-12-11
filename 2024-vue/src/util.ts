export async function getInput(file: string): Promise<string> {
    return new Promise(async (resolve, reject) => {
        const path = `http://localhost:3000/file?file=${file}`
        const text = await fetch(path).then(x => x.text());

       resolve(text);
    });
 }
 
 export class Day {
    filename: string;
    data: string[];

    constructor(fileName: string) {
       this.filename = fileName;
       this.data = [];
 
       this.setup();
    }
 
    async setup() {
       this.data = (await getInput(this.filename)).split('\n');
 
       this.render();
    }
 
    render() { };
 }

 export function splitCap(path: string) {
    path = path.replace('/', '');
    path = path.replace(/\d+/g, ' $&');
    path = path.replace(/d/g, (match: string) => match.toUpperCase());

    return path;
 }
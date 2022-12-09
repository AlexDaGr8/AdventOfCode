export async function getInput(file) {
   return new Promise((resolve, reject) => {
      resolve(fetch(file).then(x => x.text()));
   });
}

export class Day {
   constructor(fileName) {
      this.fileName = fileName;
      this.data = [];

      this.setup();
   }

   async setup() {
      this.data = (await getInput(this.fileName)).split('\n');

      this.render();
   }

   render() { };
}
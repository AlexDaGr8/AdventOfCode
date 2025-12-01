export default async function getInput(file) {
   return new Promise((resolve, reject) => {
        try {
            const data = fetch(file)
                .then(x => x.text())
                .then(y => ({ text: y, rows: y.split('\n')}));
        
            if (!data) throw new Error('data not found');
            
            resolve(data);
        } catch (e) {
            reject(`Error fetching data: ${e}`)
        }
   });
}
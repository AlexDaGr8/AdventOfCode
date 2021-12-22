export async function getResult(file) {
    return new Promise((resolve, reject) => {
       resolve(fetch(file).then(x => x.text()));
    });
  }
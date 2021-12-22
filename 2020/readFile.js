function readFile(name) {
    return new Promise((res, rej) => {
        var rawFile = new XMLHttpRequest();
        rawFile.open('GET', name, true);
        rawFile.onreadystatechange = function() {
            if (rawFile.readyState === 4) {
                var allText = rawFile.responseText;
                res(allText.split('\n'))
            }
        }
        rawFile.send();
    })
}

export default readFile;
function imageProcessing(width, height, inputStr) {
    this.width = width;
    this.height = height;
    this.input = inputStr.split('').map(d => +d);
    this.layers = [];
    this.colors = ['black', 'white', 'transparent'];
}

imageProcessing.prototype.getLayers = function() {
    let demensions = this.width * this.height;
    for (var i = 0; i < this.input.length; i += demensions) {
        this.layers.push(this.input.slice(i, i + demensions));
    }
    return this.layers;
}

imageProcessing.prototype.getImage = function() {
    let image = this.layers[0];

    this.layers.forEach(layer => {
        for (var i = 0; i < image.length; i++) {
            if (image[i] === 2) image[i] = layer[i];
        }
    });
    return image;
}

imageProcessing.prototype.display = function() {
    let image = this.getImage();
    let returnStr = '';
    for (var i = 0; i < image.length; i += this.width) {
        returnStr += image.slice(i, i + this.width).join(' ') + '\n';
    }
    return returnStr;
}

imageProcessing.prototype.getLayerWithMostNumber = function(number) {
    return this.layers.reduce((acc, curr) => {
        return this.amountWithNumber(acc, number) > this.amountWithNumber(acc, number) 
            ? acc 
            : curr;
    })
}

imageProcessing.prototype.getLayerWithFewestNumber = function(number) {
    return this.layers.reduce((acc, curr) => {
        return this.amountWithNumber(acc, number) < this.amountWithNumber(curr, number) 
            ? acc 
            : curr;
    })
}

imageProcessing.prototype.amountWithNumber = function(arr, number) {
    return arr.filter(d => d === number).length;
}
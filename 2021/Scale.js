export default function Scale(x) {
  this._range = [];
  this._domain = [];
  this.number = (x) => +x;
  this.scale = function(x) {
  return ((x - this._domain[0]) * (this._range[1] - this._range[0])) / ((this._domain[1] - this._domain[0])) + this._range[0];
  }
  this.range = function(arr) {
  return arr.length ? (this._range = Array.from(arr, this.number), this) : this._range.slice();
  }
  this.domain = function(arr) {
   return arr ? (this._domain = Array.from(arr, this.number), this) : this._domain.slice();
  }
  return this;
}
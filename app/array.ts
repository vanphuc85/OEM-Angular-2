declare interface Array<T> {
    pushNoDuplicate(item: T): boolean;
}  

Array.prototype.pushNoDuplicate = function(item) {
    Array.prototype.push(item);
    console.log(Array.prototype.push);
    debugger
    

    console.log(this);

    return this;
};




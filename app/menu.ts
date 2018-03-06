export class Menu {
    public name : string ;
    public displayName : string ;
    public active : boolean ;

    constructor(_name : string , _displayName: string , _active : boolean){
        this.name = _name ;
        this.displayName = _displayName ;
        this.active = _active ;
    }
}

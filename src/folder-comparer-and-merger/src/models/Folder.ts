import File from './File';

class Folder{
    public name:string = "";
    public path:string = "";
    public size:number = 0; 
    public folders:Folder[] = [];
    public files:File[] = [];    
}

export default Folder;
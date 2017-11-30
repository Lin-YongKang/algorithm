import Graph from './Graph';
export class Cycle{
    private marked : boolean[];
    private _hadCycle : boolean;
    constructor(graph :Graph){
        let VLen = graph.V();
        this.marked = new Array(VLen);
        this._hadCycle = false;
        for(let s= 0 ; s < VLen ; s++){
            if(!this.marked[s]){
                this.dfs(graph,s,s);
            }
        }
    }
    private dfs(graph : Graph , v : number , u : number):void{
        this.marked[v] = true;
        for(let w of graph.adj(v)){
            if(!this.marked[w]){
                this.dfs(graph,w,v);
            }else if( w !=u) this._hadCycle = true;
        }
    }
    public hasCycle():boolean{
        return this._hadCycle;
    }
}
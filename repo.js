class Repository {

    constructor(canvasBoundingRect) {
        this.dropPoints = [];
        this.resources = [];
        this.gatherers = [];
        this.init(canvasBoundingRect);
    }

    _getAllEntities() {
        return this.dropPoints.concat(this.resources).concat(this.gatherers);
    }
    
    init(cbr) {
        
        // root x and y
        let rX = cbr.width/2;
        let rY = cbr.height/2;

        // droppoints
        let dp = new DropPoint().place(rX, rY);
        this.dropPoints.push(dp);

        // resources
        for(let i = 0; i < 1000; i++) {
            let res = new Resource(Gmt.randInt(1, 4)).place(
                Gmt.randFloat(0, cbr.width), 
                Gmt.randFloat(0, cbr.height)
            );
            this.resources.push(res);
        }

        // gatherers 
        for(let i = 0; i < 20; i++) {
            let gth = new Gatherer().place(
                Gmt.randFloat(cbr.width * 0.25, cbr.width * 0.75), 
                Gmt.randFloat(cbr.height * 0.25, cbr.height * 0.75)
            );
            this.gatherers.push(gth);
        }
        
    }

    tick() {
        let repo = this;
        this._getAllEntities().forEach(e => e.act(repo));
    }

    draw(cw, framenNum) {
        this._getAllEntities().forEach(e => {
            let shape = e.pos.toCircle(e.size).toPolygon(e.nofEdges, e.rotation);
            let col = e.color;
            cw.fillPolygon(shape, col);
        });
    }

}
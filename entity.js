class Entity {

    constructor(color, size, nofEdges) {
        this.pos = new Gmt.Vertex();
        this.color = color;
        this.size = size;
        this.nofEdges = nofEdges;
        this.rotation = 0;
    }

    rotate(rad) {
        this.rotation += rad;
    }

    place(x, y) {
        this.pos.place(x, y);
        return this;
    }

    act(repo) {
        // abs
    }

}

class Resource extends Entity {

    constructor(value) {
        super();
        this.value = value;
        this.color = Gmt.rgba(Gmt.randInt(0, 30), Gmt.randInt(50, 100), Gmt.randInt(20, 60), 0.5);
        this.size = 3 + value/2;
        this.carried = false;
        this.stockpiled = false;
        this.nofEdges = 5;
    }

    act(repo) {
        if(!this.carried) {
            this.rotate(0.05);
        }
    }
}

class Gatherer extends Entity {

    constructor() {
        super();
        this.color = Gmt.rgba(Gmt.randInt(100, 200), Gmt.randInt(0, 30), Gmt.randInt(0, 30), 0.6);
        this.size = 10;
        this.carriedResource = null;
        this.nofEdges = 3;
    }

    act(repo) {
        if(!!this.carriedResource) {
            // carry res to base
            this.pos.moveTowards(repo.dropPoints[0].pos, 1.2)
            this.rotation = this._directionTo(repo.dropPoints[0]);
            this.carriedResource.pos.place(this.pos.x, this.pos.y);
            if(this.pos.distanceTo(repo.dropPoints[0].pos) < 50) {
                // drop off res
                this.carriedResource.stockpiled = true;
                this.carriedResource = null;
            }
        } else {
            let res = this._findResource(repo);
            if(!!res) {
                // res found
                this.pos.moveTowards(res.pos, 2);
                this.rotation = this._directionTo(res);
                if(this.pos.distanceTo(res.pos) < 10) {
                    // pickup res
                    this._pickupResource(res);
                }
            } else {
                // res not found
            }
        }
       
    }

    _findResource(repo) {
        let gatherer = this;
        let targetResource = null;
        let targetDistance = 99999;
        repo.resources.forEach(res => {
            if(!res.carried && !res.stockpiled) {
                let distance = res.pos.distanceTo(gatherer.pos);
                if(targetDistance > distance) {
                    targetDistance = distance;
                    targetResource = res;
                }
            }
        });
        return targetResource;
    }

    _directionTo(res) {
        let polar = Gmt.cartesianToPolar(this.pos.x - res.pos.x, this.pos.y - res.pos.y);
        return polar.phi + Gmt.PI;
    }

    _pickupResource(res) {
        this.carriedResource = res;
        res.carried = true;
    }
        

}

class DropPoint extends Entity {

    constructor() {
        super();
        this.color = Gmt.rgba(Gmt.randInt(100, 200), Gmt.randInt(0, 30), Gmt.randInt(0, 30), 0.7);
        this.size = 50;
        this.stockpile = 0;
        this.nofEdges = 8; 
    }

    act(repo) {
        this.rotate(0.01);
    }

}


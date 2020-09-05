let cw = new Gmt.CanvasWrapper('canvas-home');
let repo = new Repository(cw.getBoundingRect());

new Gmt.Loop(60, loop => {
    cw.fill('black');
    repo.tick();
    repo.draw(cw, loop.getFrame());
}).start();


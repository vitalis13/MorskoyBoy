class Game {
    constructor() {
        this.stage = 'preparation';
        this.playerOrder = true

        this.player = new Topology({
            offsetX: 50,
            offsetY: 100
        });

        this.computer = new Topology({
            offsetX: 500,
            offsetY: 100,
            secret: true
        });

        this.computer.randoming();

        // this.player
        //     .addSheeps(
        //         {x: 0, y: 0, direct: 0, size: 3},
        //         {x: 0, y: 2, direct: 1, size: 4},
        //     )
        //     .addChecks(
        //         {x: 5, y: 5},
        //         {x: 5, y: 4}
        //     );

        this.player.randoming();
        this.stage = 'play';


        requestAnimationFrame(x => this.tick(x))
    }

    tick(timestamp) {
        requestAnimationFrame(x => this.tick(x))


        clearCanvas();
        drawGrid();

        this.player.draw(context);
        this.computer.draw(context);

        if (this.stage === 'preparation') {
            this.tickPreparation(timestamp)
        } else if (this.stage === 'play') {
            this.tickPlay(timestamp)

            mouse.pleft = mouse.left;
        }
    }



    tickPreparation(timestamp){
            const sheepSizes = [4, 3, 3, 2, 2, 2, 1, 1, 1, 1];
            const sheepSize = sheepSizes[this.player.sheeps.length];


            if (!this.player.isPointUnder(mouse)) {
                return
            }
            const coordinats = this.player.getCoordinats(mouse);


            const sheep = {
                x: coordinats.x,
                y: coordinats.y,
                direct: mouse.s ? 0 : 1,
                size: sheepSize
            };
            if (!this.player.canStay(sheep)) {
                return;
            }
            this.player.drawSheep(context, sheep)

            if (mouse.left && !mouse.pleft) {
                this.player.addSheeps(sheep)

                if (this.player.sheeps.length === 10) {
                    this.stage = 'play'
                }
            }

        }
            tickPlay(timestamp){
        if(this.playerOrder){
            if(!this.computer.isPointUnder(mouse)){
                return
            }
            const point = this.computer.getCoordinats(mouse);

            if(mouse.left && !mouse.pleft){
                this.computer.addChecks(point);
                this.computer.update();
                this.playerOrder = false;
            }

        }
        else{
            const  point = {
                x:Math.floor(Math.random() * 10),
                y:Math.floor(Math.random() * 10)
            }
            this.player.addChecks(point);
            this.player.update();
            this.playerOrder = true;

        }
    }

}

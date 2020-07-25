class Topology {
    constructor(param) {
        this.offsetX = param.offsetX;
        this.offsetY = param.offsetY;

        this.sheeps = [];
        this.checks = [];
    }

    addSheeps(...sheeps) {
        for (const sheep of sheeps) {
            if (!this.sheeps.includes(sheep)) {
                this.sheeps.push(sheep)
            }
        }
        return this
    }

    addChecks(...checks) {
        for (const check of checks) {
            if (!this.checks.includes(check)) {
                this.checks.push(check)
            }

        }
        return this
    }

    draw(context) {
        this.drawFields(context);

        for (const sheep of this.sheeps) {
            this.drawSheep(context, sheep)
        }
        for (const check of this.checks) {
            this.drawCheck(context, check)
        }
        return this


    }

    drawFields(context) {
        context.strokeStyle = 'blue';
        context.lineWidth = 1;

        for (let i = 1; i <= 11; i++) {
            context.beginPath();
            context.moveTo(
                this.offsetX + i * FIELD_SIZE,
                this.offsetY
            );
            context.lineTo(
                this.offsetX + i * FIELD_SIZE,
                this.offsetY + 11 * FIELD_SIZE
            );
            context.stroke()
        }

        for (let i = 1; i <= 11; i++) {
            context.beginPath();
            context.moveTo(
                this.offsetX,
                this.offsetY + i * FIELD_SIZE,
            );
            context.lineTo(
                this.offsetX + 11 * FIELD_SIZE,
                this.offsetY + i * FIELD_SIZE,
            );
            context.stroke()
        }

        context.textAlign = 'center';
        context.font = '18px comic sans';

        const alphabet = 'АБВГДЕЖЗИК';
        for (let i = 0; i < 10; i++) {
            const letter = alphabet[i];

            context.fillText(
                letter,
                this.offsetX + i * FIELD_SIZE + FIELD_SIZE * 1.5,
                this.offsetY + FIELD_SIZE * 0.8
            )
        }

        for (let i = 1; i <= 10; i++) {
            context.fillText(
                i,
                this.offsetX + FIELD_SIZE * 0.4,
                this.offsetY + i * FIELD_SIZE + FIELD_SIZE * 0.8,
            )
        }
        return this
    }

    drawSheep(context, sheep) {
        context.fillStyle = 'rgba (0, 0, 0)';
        context.globalAlpha = 0.8;

        context.beginPath();
        context.rect(
            this.offsetX + sheep.x * FIELD_SIZE + FIELD_SIZE + 2,
            this.offsetY + sheep.y * FIELD_SIZE + FIELD_SIZE + 2,
            (sheep.direct === 0 ? sheep.size : 1) * FIELD_SIZE - 4,
            (sheep.direct === 1 ? sheep.size : 1) * FIELD_SIZE - 4
        );
        context.fill();
        return this

    }

    drawCheck(context, check) {
        context.fillStyle = 'black';

        context.beginPath();
        context.arc(
            this.offsetX + check.x * FIELD_SIZE + FIELD_SIZE * 1.5,
            this.offsetY + check.y * FIELD_SIZE + FIELD_SIZE * 1.5,
            3,
            0,
            Math.PI * 2
        );
        context.fill();
        return this
    }

    isPointUnder(point) {
        if (
            point.x < this.offsetX + FIELD_SIZE ||
            point.x > this.offsetX + 11 * FIELD_SIZE ||
            point.y < this.offsetY + FIELD_SIZE ||
            point.y > this.offsetY + 11 * FIELD_SIZE) {
            return false
        }
        return true
    }

    getCoordinats(point) {
        if (!this.isPointUnder(point)) {
            return false
        }
        // const x = parseInt((point.x - this.offsetX - FIELD_SIZE) / FIELD_SIZE);
        // const y = parseInt((point.y - this.offsetY - FIELD_SIZE) / FIELD_SIZE);
        return {
            x:parseInt((point.x - this.offsetX - FIELD_SIZE) / FIELD_SIZE),
            y:parseInt((point.y - this.offsetY - FIELD_SIZE) / FIELD_SIZE)
        }
    }

    canStay (sheep) {
        if(sheep.direct === 0 && sheep.x + sheep.size >10){
            return false
        }
        if(sheep.direct === 1 && sheep.y + sheep.size > 10){
            return false
        }

        const map = [
            [true, true, true, true, true, true, true, true, true, true,],
            [true, true, true, true, true, true, true, true, true, true,],
            [true, true, true, true, true, true, true, true, true, true,],
            [true, true, true, true, true, true, true, true, true, true,],
            [true, true, true, true, true, true, true, true, true, true,],
            [true, true, true, true, true, true, true, true, true, true,],
            [true, true, true, true, true, true, true, true, true, true,],
            [true, true, true, true, true, true, true, true, true, true,],
            [true, true, true, true, true, true, true, true, true, true,],
            [true, true, true, true, true, true, true, true, true, true,],
        ]

        for (const sheep of this.sheeps) {
            if (sheep.direct === 0) {
                for (let x = sheep.x - 1; x < sheep.x + sheep.size + 1; x++) {
                    for (let y = sheep.y - 1; y < sheep.y + 2; y++) {
                        if (map[y] && map[y][x]) {
                            map [y][x] = false
                        }
                    }
                }
            } else {
                for (let x = sheep.x - 1; x < sheep.x + 2; x++) {
                    for (let y = sheep.y - 1; y < sheep.y + sheep.size + 1; y++) {
                        if (map[y] && map[y][x]) {
                            map [y][x] = false
                        }
                    }
                }
            }
        }
        if (sheep.direct === 0) {
            for (let i = 0; i < sheep.size; i++) {
                if (!map[sheep.y][sheep.x + i]) {
                    return false
                }
            }
        } else {
            for (let i = 0; i < sheep.size; i++) {
                if (!map[sheep.y + i][sheep.x]) {
                    return false
                }
            }
        }
        return true

    }

    randoming(){
        this.sheeps = [];

        for (let size = 4; size > 0; size--) {
            for (let n = 0; n < 5 - size; n++) {
                let flag = false
                while (!flag) {
                    const sheep = {
                        x: Math.floor((Math.random() * 10)),
                        y: Math.floor((Math.random() * 10)),
                        direct: Math.random() > Math.random() ? 0 : 1,
                        size
                    }
                    if (this.canStay(sheep)) {
                        this.addSheeps(sheep)
                        flag = true
                    }
                }

            }
        }

    }





}
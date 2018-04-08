
class Ant {
    constructor(x, y) {
        this.Reset(x, y)
    }
    static get Color() {
        return '#FE0000'
    }
    Reset(x, y) {
        this.X = x
        this.Y = y
        this.Direction = 'Up'
        this.NbSteps = 0
        $(this).trigger("move")
    }
    TurnRight() {
        if (this.Direction === 'Up') {
            this.X += 1
            this.Direction = 'Right'
        }
        else if (this.Direction === 'Right') {
            this.Y += 1
            this.Direction = 'Down'
        }
        else if (this.Direction === 'Down') {
            this.X -= 1
            this.Direction = 'Left'
        }
        else {
            this.Y -= 1
            this.Direction = 'Up'
        }

        this.NbSteps++
        $(this).trigger("move")
    }
    TurnLeft() {
        if (this.Direction === 'Up') {
            this.X -= 1
            this.Direction = 'Left'
        }
        else if (this.Direction === 'Left') {
            this.Y += 1
            this.Direction = 'Down'
        }
        else if (this.Direction === 'Down') {
            this.X += 1
            this.Direction = 'Right'
        }
        else {
            this.Y -= 1
            this.Direction = 'Up'
        }

        this.NbSteps++
        $(this).trigger("move")
    }
    Turn(direction) {
        switch (direction) {
            case "left": this.TurnLeft(); break;
            case "right": this.TurnRight(); break;
            default: throw "The value '" + value + "' is not recognized as a correct direction value."
        }
    }
}

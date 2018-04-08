
class Grid {
    constructor(elemId, size) {
        this.ElemId = elemId
        this.Size = size
    }
    get Size() {
        return this.Colors.length
    }
    set Size(value) {
        this.Colors = new Array(value)
        for (let i = 0; i < this.Colors.length; i++) {
            this.Colors[i] = new Array(value)
        }

        this.RealSize = 800
        this.CellSize = Math.floor(this.RealSize / value)
        this.RealSize = this.CellSize * value

        $("#" + this.ElemId).prop("width", this.RealSize).prop("height", this.RealSize)
        this._context = $("#" + this.ElemId).get(0).getContext('2d');

        this.Clear()
    }
    get MiddleX() {
        return Math.ceil(this.Size / 2)
    }
    get MiddleY() {
        return Math.ceil(this.Size / 2)
    }
    IsInside(x, y) {
        return (x > 0 && y > 0 && x < this.Size && y < this.Size)
    }
    IsOutside(x, y) {
        return !this.IsInside(x, y)
    }
    Clear() {
        this._context.clearRect(0, 0, this.RealSize, this.RealSize)
        for (let i = 0; i < this.Colors.length; i++) {
            for (let j = 0; j < this.Colors[i].length; j++) {
                this.Colors[i][j] = '#FFFFFF'
            }
        }

        for (let x = 0; x <= this.RealSize; x += this.CellSize) {
            this._context.moveTo(x, 0)
            this._context.lineTo(x, this.RealSize)
        }

        for (let y = 0; y <= this.RealSize; y += this.CellSize) {
            this._context.moveTo(0, y)
            this._context.lineTo(this.RealSize, y)
        }

        this._context.strokeStyle = '#DDD'
        this._context.stroke()
    }
    SetColor(x, y, color) {
        if (this.IsOutside(x, y)) {
            return
        }

        if (color !== Ant.Color) {
            this.Colors[x - 1][y - 1] = color
        }

        let a = ((x - 1) * this.CellSize) + 1
        let b = ((y - 1) * this.CellSize) + 1
        let width = this.CellSize - 2

        this._context.fillStyle = color
        this._context.fillRect(a, b, width, width)
    }
    GetColor(x, y) {

        if (this.IsOutside(x, y)) {
            return null
        }

        return this.Colors[x - 1][y - 1]
    }
}

class TicTacToe {

    ticTacToe = [[0,0,0],[0,0,0],[0,0,0]];

    getCell(x, y) {
        return this.ticTacToe[y][x];
    }

    setCell(x, y, value) {
        this.ticTacToe[y][x] = value;
    }

    checkCol(colIdx, id) {
        return this.ticTacToe[colIdx].every((cell) => cell == id);
    }

    checkRow(rowIdx, id) {
        let row = [];
        this.ticTacToe.forEach((col) => row.push(col[rowIdx]));
        return row.every((cell) => cell == id);
    }

    checkDiagonal(lr, id) {
        let lrIdxes = lr ? [0,1,2] : [2,1,0];
        let lrIdx = 0;
        let diag = []
        this.ticTacToe.forEach((col) =>{ diag.push(col[lrIdxes[lrIdx]]); lrIdx++});
        return diag.every((cell) => cell == id);
    }

    checkWin(id) {
        let colWin = this.checkCol(0, id) || this.checkCol(1, id) || this.checkCol(2, id);
        let rowWin = this.checkRow(0, id) || this.checkRow(1, id) || this.checkRow(2, id);
        let diagWin = this.checkDiagonal(true, id) || this.checkDiagonal(false, id);

        return colWin || rowWin || diagWin;
    }

    checkGameOver(id) {
        let ticTacToeFull = this.ticTacToe[0].every((cell) => cell != 0) && this.ticTacToe[1].every((cell) => cell != 0) && this.ticTacToe[2].every((cell) => cell != 0);
        let win = this.checkWin(id)

        return {"over": ticTacToeFull || win, "id": win ? id : 0};
    }

    resetTicTacToe() {
        this.ticTacToe = [[0,0,0],[0,0,0],[0,0,0]];
    }

    getTicTacToe() {
        return this.ticTacToe;
    }
}

module.exports.TicTacToe = TicTacToe;
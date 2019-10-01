class TicTacToe {
    constructor() {
        //Задаём поле для игры в крестики-нолики в виде массива
        this.field = [[], [], []];
        //Хранилище для текущего игрока (первым ходит крестик)
        this.sign = "x";
    }

    getCurrentPlayerSymbol() {
        return this.sign;
    }

    nextTurn(rowIndex, columnIndex) {
        /*Если ячейка в поле пустая, то проверяем какой знак нужно обработать,
        ложим его в хранилище и передаём ход другому игроку*/
        if(this.field[rowIndex][columnIndex] === undefined) {
            this.field[rowIndex][columnIndex] = this.sign;
            if(this.sign === "o") {
                this.sign = "x";
            } else {
                this.sign = "o";
            }
        }
    }

    isFinished() {
        if(this.getWinner() === "o" || this.getWinner() === "x" || this.noMoreTurns() === true) return true;
        return false;
    }
    /*Должен вернуть победителя*/
    getWinner() {
        let arrLine = [];
        //Собираем в массив строки
        for(let i = 0; i < this.field.length; i++) {
            let line = "";
            for(let j = 0; j < this.field[i].length; j++) {
                line = line + this.field[i][j];
            }
            arrLine.push(line);
        }
        //Собираем в массив столбцы
        for(let i = 0; i < this.field.length; i++) {
            let line = "";
            for(let j = 0; j < 3; j++) {
                line = line + this.field[j][i];
            }
            arrLine.push(line);
        }
        //Собираем в массив диагонали
        let diagonalFirst = this.field[0][0] + this.field[1][1] + this.field[2][2];
        let diagonalSecond = this.field[0][2] + this.field[1][1] + this.field[2][0];
        arrLine.push(diagonalFirst);
        arrLine.push(diagonalSecond);
        //Переменная, куда будем помещён победитель
        let win;
        /*Перебираем массив комбинаций. Если встретиться
        "ooo" то win = "o" - если "xxx" то win = "x" */
        arrLine.forEach(function(item) {
            if(item === "ooo") win = "o";
            if(item === "xxx") win = "x";
        });

        if(win === "o") return "o";
        if(win === "x") return "x";
        //Если победителя ещё нет или ничья, то return null
        return null;
    }
    //Должен вернуть true, если все ячейки заняты
    noMoreTurns() {
        //Колличество свободных ячеек
        let freeCell = 9;
        /*Проверяем все ячейки на то, свободны ли они,
        если нет, то уменьшаем счётчик и если счётчик в 
        итоге равен нулю, то ячеек свободных нет*/
        for(let i = 0; i < this.field.length; i++) {
            for(let j = 0; j < this.field[i].length; j++) {
                if(this.field[i][j] != undefined) freeCell--;
            }
        }
        if(!freeCell) return true;
        return false;
    }

    isDraw() {
        //Если ячейка пустая или строка не полнсотью занята, то увеличиваем счётчик
        let checkWinner = 0;
        for(let i = 0; i < this.field.length; i++) {
            for(let j = 0; j < this.field[i].length; j++) {
                if(this.field[i][j] === undefined || this.field[j].length < 3) checkWinner++;
            }
        }
        /*Если счётчик увеличился, то собираем все строки, столбцы и диагонали
        в массив, а затем перебором проверяем на на выйгрыш*/
        if(!checkWinner) {
            let arrLine = [];
            //Собираем в массив строки
            for(let i = 0; i < this.field.length; i++) {
                let line = "";
                for(let j = 0; j < this.field[i].length; j++) {
                    line = line + this.field[i][j];
                }
                arrLine.push(line);
            }
            //Собираем в массив столбцы
            for(let i = 0; i < this.field.length; i++) {
                let line = "";
                for(let j = 0; j < this.field[i].length; j++) {
                    line = line + this.field[j][i];
                }
                arrLine.push(line);
            }
            //Собираем в массив диагонали
            let diagonalFirst = this.field[0][0] + this.field[1][1] + this.field[2][2];
            let diagonalSecond = this.field[0][2] + this.field[1][1] + this.field[2][0];
            arrLine.push(diagonalFirst);
            arrLine.push(diagonalSecond);
            //Перебираем массив и ищем выйгрышную линию
            let count = 0;
            arrLine.forEach(function(item) {
                if(item === "ooo" || item === "xxx") count++;
            });
            if(count !== 0) return false;
            return true;
        }
        return false;
    }

    getFieldValue(rowIndex, colIndex) {
        /*Если в данной ячейке имеется знак, то возвращаем его,
        а если нет, то возвращаем null
        */
        if(this.field[rowIndex][colIndex] !== undefined) {
            return this.field[rowIndex][colIndex];
        } else {
            return null; 
        }
    }
}

module.exports = TicTacToe;

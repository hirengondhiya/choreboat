(function() {
    class ChoreBoat {
        images = [
            'assets/img/beach.svg',
            'assets/img/space.svg',
            'assets/img/robot.svg',
        ];
        closedDoorImage = 'assets/img/closed_door.svg';
        currentStreak = document.getElementById('current-streak');
        bestStreak = document.getElementById('best-streak');
        goodLuckMsg = document.getElementById('good-luck');
        btnPlayAgain = document.getElementById('play-again');
        doors = Array.from(document.getElementsByClassName('door'));

        constructor() {
            this.goodLuckMsg.classList.remove('hide');
            this.btnPlayAgain.classList.add('hide');
            this.bestStreak.textContent = this.currentStreak.textContent = 0;

            this.onDoorOpenBound = this.onDoorOpen.bind(this);

            this.btnPlayAgain.addEventListener('click',this.restartGame.bind(this));
            this.closeAllDoors();            

            this.resetCurrentRun();
        }

        makeDoorsClickable() {
            this.doors
                    .forEach(
                        (door) => {
                            door.addEventListener('click', this.onDoorOpenBound);
                            door.classList.add('cursor-pointer');
                    });
        }

        removeDoorsOpenEvent() {
            this.doors.forEach((door) => this.removeDoorOpenEvent(door));
        }
        removeDoorOpenEvent(door) {
            if(/^((?!closed).)*$/) {
                door.removeEventListener('click', this.onDoorOpenBound);
                door.classList.remove('cursor-pointer');    
            }
        }
        restartGame(event) {
            this.resetCurrentRun();
            this.closeAllDoors();
            this.toggleDisplayMsgNBtn();
        }
        resetCurrentRun() {
            this.currentRun = {
                doorsNotOpened: 3,
                images: this.images.map(image => image)
            };
        }
        closeAllDoors() {
            this.doors.forEach(door => door.src = this.closedDoorImage);
            this.makeDoorsClickable();
        }
        toggleDisplay(element) {
            element.classList.toggle('hide');
        }
        toggleDisplayMsgNBtn() {
            this.toggleDisplay(this.goodLuckMsg);
            this.toggleDisplay(this.btnPlayAgain);
        }
        gameOver() {
            return /^((?!robot).)*$/.test(this.currentRun.images.toString()) || this.currentRun.doorsNotOpened == 0;
        }
        gameWon() {
            return this.currentRun.images.length == 0;
        }   
        getRandomImage() {
            let index = Math.floor(Math.random() * this.currentRun.images.length);
            return this.currentRun.images.splice(index, 1);
        }        
        onDoorOpen(event) {
            this.currentRun.doorsNotOpened--;

            event.target.src = this.getRandomImage();
            this.removeDoorOpenEvent(event.target);

            if (this.gameOver()) {
                this.toggleDisplayMsgNBtn();
                this.removeDoorsOpenEvent();

                if(this.gameWon()) {
                    this.currentStreak.textContent++;
                    this.bestStreak.textContent = Math.max(this.currentStreak.textContent, this.bestStreak.textContent);
                    this.btnPlayAgain.textContent = "You Won! Play Again?"
                    this.btnPlayAgain.classList.add('btn-success');
                    this.btnPlayAgain.classList.remove('btn-danger');
                } else {
                    this.currentStreak.textContent = 0;
                    this.btnPlayAgain.textContent = "Gameover! Play Again?"
                    this.btnPlayAgain.classList.add('btn-danger');
                    this.btnPlayAgain.classList.remove('btn-success');
                }
            }            
        }
    }
    let game = new ChoreBoat();
})();
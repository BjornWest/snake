input.onButtonPressed(Button.A, function () {
    if (canMove == 0) {
        if (direction > 0) {
            direction += -1
            canMove = 1
        } else {
            direction = 3
            canMove = 1
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (canMove == 0) {
        if (direction < 3) {
            direction += 1
            canMove = 1
        } else {
            direction = 0
            canMove = 1
        }
    }
})
function snakeMove () {
    canMove = 0
    led.plot(foodX, foodY)
    if (run == 0) {
        if (direction == 0) {
            ypos += -1
        } else if (direction == 1) {
            xpos += 1
        } else if (direction == 2) {
            ypos += 1
        } else {
            xpos += -1
        }
        if (xpos == 5) {
            xpos = 0
        } else if (xpos == -1) {
            xpos = 4
        } else if (ypos == 5) {
            ypos = 0
        } else if (ypos == -1) {
            ypos = 4
        }
        foodTemp = 0
    }
    xList.unshift(xpos)
    yList.unshift(ypos)
    if (xList.length > length) {
        led.unplot(xList[length], yList[length])
        xList.pop()
        yList.pop()
        for (let index = 0; index < length; index++) {
            foodTemp += 1
            if (xpos == xList[foodTemp] && ypos == yList[foodTemp]) {
                run += 1
                basic.showIcon(IconNames.Sad)
                control.waitMicros(2000000)
                music.playTone(330, music.beat(BeatFraction.Whole))
                music.playTone(311, music.beat(BeatFraction.Whole))
                music.playTone(294, music.beat(BeatFraction.Whole))
                music.playTone(277, music.beat(BeatFraction.Breve))
                basic.showNumber(length)
                control.waitMicros(2000000)
                control.reset()
            }
        }
    }
    led.plot(xpos, ypos)
}
let food = 0
let foodTemp = 0
let run = 0
let direction = 0
let canMove = 0
let foodY = 0
let foodX = 0
let yList: number[] = []
let xList: number[] = []
let ypos = 0
let xpos = 0
let length = 0
length = 1
xpos = 2
ypos = 3
xList = [xpos]
yList = [ypos]
foodX = 2
foodY = 2
canMove = 0
loops.everyInterval(500, function () {
    snakeMove()
})
basic.forever(function () {
    if (xpos == foodX && ypos == foodY) {
        length += 1
        music.playTone(932, music.beat(BeatFraction.Half))
        music.playTone(988, music.beat(BeatFraction.Half))
        food = randint(0, 25 - length)
        foodX = 0
        foodY = 0
        for (let index = 0; index < food; index++) {
            if (foodX < 4) {
                foodX += 1
            } else {
                foodY += 1
                foodX = 0
            }
            foodTemp = 0
            for (let index = 0; index < length; index++) {
                if (foodX == xList[foodTemp] && foodY == yList[foodTemp]) {
                    if (foodX < 4) {
                        foodX += 1
                    } else {
                        foodY += 1
                        foodX = 0
                    }
                }
                foodTemp += 1
            }
        }
        led.plot(foodX, foodY)
    }
})
basic.forever(function () {
    control.waitMicros(500000)
    led.unplot(foodX, foodY)
    control.waitMicros(500000)
    led.plot(foodX, foodY)
})

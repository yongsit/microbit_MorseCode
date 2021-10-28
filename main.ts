input.onButtonPressed(Button.A, function () {
    if (mode == "setup") {
        if (channel > 1) {
            channel += -1
        }
    }
    if (mode == "run") {
        radio.sendValue("morse", 1)
    }
    displayMorse(code)
})
function displayMorse (morseCode: any[]) {
    for (let index = 0; index <= 4; index++) {
        if (morseCode[index] == 1) {
            led.plot(index, 4)
            led.unplot(index, 3)
        }
        if (morseCode[index] == 2) {
            led.plot(index, 4)
            led.plot(index, 3)
        }
    }
}
function ShowSignalStrength (sigStrength: number) {
    for (let index = 0; index <= 9; index++) {
        if (index <= strength) {
            led.plot(index % 5, Math.floor(index / 5))
        } else {
            led.unplot(index % 5, Math.floor(index / 5))
        }
    }
}
// Change mode to "run".
input.onButtonPressed(Button.AB, function () {
    mode = "run"
})
input.onButtonPressed(Button.B, function () {
    if (mode == "setup") {
        if (channel < 9) {
            channel += 1
        }
    }
    if (mode == "run") {
        radio.sendValue("morse", 2)
    }
    displayMorse(code)
})
radio.onReceivedValue(function (name, value) {
    if (mode == "run" && name == "morse") {
        strength = Math.floor(Math.map(radio.receivedPacket(RadioPacketProperty.SignalStrength), -128, -42, -1, 9))
        ShowSignalStrength(strength)
        code.shift()
        if (value == 1) {
            code.push(1)
            music.playTone(262, music.beat(BeatFraction.Quarter))
        }
        if (value == 2) {
            code.push(2)
            music.playTone(262, music.beat(BeatFraction.Whole))
        }
        displayMorse(code)
    }
})
// Select channel until A+B is pressed. The channel can be selected from 1 to 9.
let strength = 0
let code: number[] = []
let mode = ""
let channel = 0
channel = 1
mode = "setup"
code = [
0,
0,
0,
0,
0
]
strength = 0
while (mode == "setup") {
    basic.showNumber(channel)
}
radio.setGroup(channel)
basic.clearScreen()

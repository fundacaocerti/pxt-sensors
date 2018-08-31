# Sensors

Sensors package for pxt-microbit

## Basic usage

### NeoPixel - Set and Get Brightness

Set and get NeoPixel LEDs brightness. To use this blocks, an instatiation of NeoPixel strip is needed. Example:

```blocks
let item: neopixel.Strip = null
item = neopixel.create(DigitalPin.P0, 24, NeoPixelMode.RGB)
sensors.setBrightness(item, 50)
basic.showNumber(sensors.getBrightness(item))
```

### Grove - On Gesture, 4-DigitDisplay and Distance Sensor

Create a 4-DigitDisplay, set brightness and show number in this display. Example:

```blocks
let item: grove.TM1637 = null
item = sensors.create4dDisplay(DigitalPin.P0, DigitalPin.P1)
sensors.setBrightness4dDisplay(item, 2)
sensors.showNumber4dDisplay(item, 5555)
```

On Gesture and Distance Sensor (Ultrasonice Sensor (in cm) from Grove) are also available. Example:

```blocks
sensors.onGesture(SensorsGroveGesture.Wave, () => {
    basic.showString("Hello!")
})
basic.showNumber(sensors.measureInCentimeters(DigitalPin.P0))
```

### Servo Continuous

Triggers the servo motor in the selected direction and speed (0 to 100%), in pins P13, P14 and P15. Example:

```blocks
sensors.continuousServoWritePin13(Direction.Right, 100)
```

### Get Sensors Status (on/off)

Read button status (returns true for pressed and false for unpressed). Example:

```blocks
if (sensors.isButtonPressed(DigitalPin.P0)) {
    basic.showIcon(IconNames.Yes)
} else {
    basic.showIcon(IconNames.No)
}
```

### Set Sensors Status (on/off)

Turn on/off a LED. Example:

```blocks
input.onButtonPressed(Button.A, () => {
    sensors.turnOnOffLed(DigitalPin.P0, OperationStatus.on)
})
input.onButtonPressed(Button.B, () => {
    sensors.turnOnOffLed(DigitalPin.P0, OperationStatus.off)
})
```

### Get Sensors Value

Read sensors, like soil moisture, potentiometer, light level and sound sensors. Example:

```blocks
basic.forever(() => {
    if (sensors.getMoistureValue(InitialPins.P0, MoistureSensorRange.dry)) {
        basic.showString("Dry Soil")
    }
})
```

### Joystick

Executes a code when a joystic position is detected. Example:

```blocks
sensors.joystickDirection(InitialPins.P0, InitialPins.P1, JoystickPosition.up, () => {
    basic.showString("Up!")
})
```

## License

MIT

## Supported targets

* for PXT/microbit


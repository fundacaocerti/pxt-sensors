/*
 * Copyright (C) 2018 Fundação CERTI
 */
enum AudioOutputPins {
    //% block="internal"
    P8 = 8,
    P0 = 0,
    P1 = 1,
    P2 = 2,
    P3 = 3,
    P4 = 4,
    P5 = 5,
    P6 = 6,
    P7 = 7,
    P9 = 9,
    P10 = 10,
    P11 = 11,
    P12 = 12,
    P13 = 13,
    P14 = 14,
    P15 = 15,
    P16 = 16,
    P19 = 19,
    P20 = 20
}

enum OperationStatus {
    //% block="turn on"
    turnOn = 1,
    //% block="turn off"
    turnOff = 0
}

enum InitialPins {
    P0 = 0,
    P1 = 1,
    P2 = 2
}

enum ServoDirection {
    //% block="clockwise"
    clockwise,
    //% block="counterclockwise"
    counterclockwise
}

enum PotentiometerReturnType {
    //% block="angle"
    angle,
    //% block="number"
    number
}

enum LightSensorRange {
    //% block="very clear"
    veryClear,
    //% block="clear"
    clear,
    //% block="shadow"
    shadow,
    //% block="dark"
    dark,
    //% block="very dark"
    veryDark
}

enum MoistureSensorRange {
    //% block="dry"
    dry,
    //% block="wet"
    wet,
    //% block="saturated"
    saturated
}

enum JoystickPosition {
    //% block="none"
    none,
    //% block="up"
    up,
    //% block="down"
    down,
    //% block="right"
    right,
    //% block="left"
    left,
    //% block="up-right"
    upRight,
    //% block="down-right"
    downRight,
    //% block="up-left"
    upLeft,
    //% block="down-left"
    downLeft
}

enum SoundSensorRange {
    //% block="low"
    low,
    //% block="medium"
    medium,
    //% block="high"
    high
}

enum SensorsGroveGesture {
    //% block=none
    None = 0,
    //% block=right
    Right = 1,
    //% block=left
    Left = 2,
    //% block=up
    Up = 3,
    //% block=down
    Down = 4,
    //% block=forward
    Forward = 5,
    //% block=backward
    Backward = 6,
    //% block=clockwise
    Clockwise = 7,
    //% block=anticlockwise
    Anticlockwise = 8,
    //% block=wave
    Wave = 9
}

//% color=#f19f03 icon="\uf1e6"
namespace sensors {

    //Neopixel blocks

    /**
     * Set the brightness of the Neopixel LED strip to a value between 0 and 50.
     * @param brightness a measure of LED brightness (0-50), eg: 50
     * @param strip a NeoPixel strip
     */
    //% blockId="sensors_set_leds_brightness"
    //% block="%x=variables_get|set LED strip brightness to %brightness"
    //% brightness.max=50, brightness.min=0
    //% weight=100 blockGap=8
    export function setLedsBrightness(strip: neopixel.Strip, brightness: number): void {
        if (brightness > 50) {
            strip.setBrightness(50);
        } else if (brightness < 0) {
            strip.setBrightness(0);
        } else {
            strip.setBrightness(brightness);
        }
    }

    /**
     * Gets the brightness value being used in the Neopixel LED strip.
     * @param strip a NeoPixel strip
     */
    //% blockId="sensors_get_leds_brightness"
    //% block="%x=variables_get|get LED strip brightness"
    //% weight=99 blockGap=25
    export function getLedsBrightness(strip: neopixel.Strip): number {
        return strip.brightness;
    }

    //Grove blocks

    /**
     * Contains the code that will be executed when a gesture is detected.
     * @param gesture type of gesture to detect
     * @param handler code to run
     */
    //% blockId="sensors_gesture_create_event"
    //% block="on Gesture|%gesture"
    //% weight=90 blockGap=8
    export function onGesture(gesture: SensorsGroveGesture, handler: Action) {
        grove.onGesture(convertSensorGesture(gesture), handler);
    }

    /**
     * Measure distances in cm.
     * @param pin signal pin of ultrasonic range module
     */
    //% blockId="sensors_ultrasonic_centimeters"
    //% block="distance sensor on pin|%pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.width="400"
    //% weight=89 blockGap=8
    export function measureInCentimeters(pin: DigitalPin): number {
        return grove.measureInCentimeters(pin);
    }

    /**
     * Create Grove 4-Digit Display in the selected pins.
     * @param clkPin value of CLK pin number
     * @param dataPin value of data pin number, eg:DigitalPin.P1
     */
    //% blockId="sensors_create_4d_display"
    //% block="4-Digit Display on pins|%clkPin|and|%dataPin"
    //% clkPin.fieldEditor="gridpicker" clkPin.fieldOptions.columns=4
    //% dataPin.fieldEditor="gridpicker" dataPin.fieldOptions.columns=4
    //% clkPin.fieldOptions.width="400"
    //% dataPin.fieldOptions.width="400"
    //% weight=88 blockGap=8
    export function create4dDisplay(clkPin: DigitalPin, dataPin: DigitalPin): grove.TM1637 {
        return grove.createDisplay(clkPin, dataPin);
    }

    /**
     * Show a number in the 4-digit display.
     * @param tm1637 a Grove driver
     * @param dispData value of number
     */
    //% blockId="sensors_show_number_4d_display"
    //% block="%x=variables_get|show number on display %dispData"
    //% weight=87 blockGap=8
    export function showNumber4dDisplay(tm1637: grove.TM1637, dispData: number): void {
        tm1637.show(dispData);
    }

    /**
     * Sets the brightness of the 4-digit display to a value between 0 and 7.
     * @param tm1637 a Grove driver
     * @param level value of brightness level
     */
    //% blockId="sensors_set_brightness_4d_display"
    //% block="%x=variables_get| set display brightness to %level"
    //% level.min=0 level.max=7
    //% weight=86 blockGap=25
    export function setBrightness4dDisplay(tm1637: grove.TM1637, level: number): void {
        if (level >= 7) {
            level = 7;
        }
        if (level <= 0) {
            level = 0;
        }
        tm1637.set(level);
    }

    //Servo blocks

    /**
     * Triggers the servo motor in the selected direction and speed (0 to 100%).
     * @param direction turning direction
     * @param value speed value from 0 to 100%, eg: 100
     */
    //% blockId="sensors_continuous_servo_write_pin_13"
    //% block="continuous servo motor on pin 13 rotate | %direction| with speed %value| %"
    //% value.min=0 value.max=100
    //% weight=80 blockGap=8
    export function continuousServoWritePin13(direction: ServoDirection, value: number): void {
        if (value != 0) {
            pins.servoWritePin(AnalogPin.P13, servoMotorController(value, direction));
        } else {
            pins.servoWritePin(AnalogPin.P13, 90);
            pins.digitalReadPin(DigitalPin.P13);
            pins.pulseIn(DigitalPin.P13, PulseValue.Low);
        }
    }

    /**
     * Triggers the servo motor in the selected direction and speed (0 to 100%).
     * @param direction turning direction
     * @param value speed value from 0 to 100%, eg: 100
     */
    //% blockId="sensors_continuous_servo_write_pin_14"
    //% block="continuous servo motor on pin 14 rotate | %direction| with speed %value| %"
    //% value.min=0 value.max=100
    //% weight=79 blockGap=8
    export function continuousServoWritePin14(direction: ServoDirection, value: number): void {
        if (value != 0) {
            pins.servoWritePin(AnalogPin.P14, servoMotorController(value, direction));
        } else {
            pins.servoWritePin(AnalogPin.P14, 90);
            pins.digitalReadPin(DigitalPin.P14);
            pins.pulseIn(DigitalPin.P14, PulseValue.Low);
        }
    }

    /**
     * Triggers the servo motor in the selected direction and speed (0 to 100%).
     * @param direction turning direction
     * @param value speed value from 0 to 100%, eg: 100
     */
    //% blockId="sensors_continuous_servo_write_pin_15"
    //% block="continuous servo motor on pin 15 rotate | %direction| with speed %value| %"
    //% value.min=0 value.max=100
    //% weight=78 blockGap=8
    export function continuousServoWritePin15(direction: ServoDirection, value: number): void {
        if (value != 0) {
            pins.servoWritePin(AnalogPin.P15, servoMotorController(value, direction));
        } else {
            pins.servoWritePin(AnalogPin.P15, 90);
            pins.digitalReadPin(DigitalPin.P15);
            pins.pulseIn(DigitalPin.P15, PulseValue.Low);
        }
    }

    /**
     * Rotates the servo motor to the selected angle (between 0 and 180).
     * @param angle angle value
     */
    //% blockId="sensors_servo_write_pin_13"
    //% block="rotate servo motor on pin 13 to angle %angle"
    //% angle.min=0 angle.max=180
    //% weight=77 blockGap=8
    export function servoWritePin13(angle: number): void {
        if (angle <= 0) {
            angle = 0;
        }
        if (angle > 180) {
            angle = 180;
        }
        pins.servoWritePin(AnalogPin.P13, angle);
    }

    /**
     * Rotates the servo motor to the selected angle (between 0 and 180).
     * @param angle angle value
     */
    //% blockId="sensors_servo_write_pin_14"
    //% block="rotate servo motor on pin 14 to angle %angle"
    //% angle.min=0 angle.max=180
    //% weight=76 blockGap=8
    export function servoWritePin14(angle: number): void {
        if (angle <= 0) {
            angle = 0;
        }
        if (angle > 180) {
            angle = 180;
        }
        pins.servoWritePin(AnalogPin.P14, angle);
    }

    /**
     * Rotates the servo motor to the selected angle (between 0 and 180).
     * @param angle angle value
     */
    //% blockId="sensors_servo_write_pin_15"
    //% block="rotate servo motor on pin 15 to angle %angle"
    //% angle.min=0 angle.max=180
    //% weight=75 blockGap=25
    export function servoWritePin15(angle: number): void {
        if (angle <= 0) {
            angle = 0;
        }
        if (angle > 180) {
            angle = 180;
        }
        pins.servoWritePin(AnalogPin.P15, angle);
    }

    //Turn on/off blocks

    /**
     * Turns a LED on/off.
     * @param pin pin to read and write on
     * @param status status of the LED (turn on/turn off)
     */
    //% blockId="sensors_turn_on_off_led"
    //% block="%status| LED on pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.width="400"
    //% weight=70 blockGap=8
    //% advanced=true
    export function turnOnOffLed(status: OperationStatus, pin: DigitalPin): void {
        pins.digitalReadPin(pin);
        pins.setPull(pin, PinPullMode.PullUp)
        pins.digitalWritePin(pin, status);
    }

    /**
     * Turn on/off the audio output.
     * @param status received value (turn on/turn off)
     * @param pin pin to read from
     */
    //% blockId="sensors_turn_on_off_audio_output"
    //% block="%status| audio output on pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.width="400"
    //% weight=69 blockGap=8
    //% advanced=true
    export function turnOnOffAudioOutput(status: OperationStatus, pin: AudioOutputPins): void {
        const analogPin = pinConverterAnalog(pin);
        const digitalPin = pinConverterDigital(pin);
        if (status == 1) {
            pins.analogSetPitchPin(analogPin);
        }
        if (status == 0) {
            music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.OnceInBackground);
            pins.digitalReadPin(digitalPin);
            pins.setPull(digitalPin, PinPullMode.PullDown);
        }
    }

    //Is sensor on/off blocks

    /**
     * Returns the state of the crash sensor, true for pressed and false for not pressed.
     * @param pin pin to read from
     */
    //% blockId="sensors_is_crash_sensor_pressed"
    //% block="crash sensor on pin %pin| is pressed"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.width="400"
    //% weight=68 blockGap=8
    //% advanced=true
    export function isCrashSensorPressed(pin: DigitalPin): boolean {
        let crashSensor = isSensorOn(pin);
        return isOnOffCrashSensor(crashSensor);
    }

    /**
     * Returns the state of the button, true for pressed and false for not pressed.
     * @param pin pin to read from
     */
    //% blockId="sensors_is_button_pressed"
    //% block="button on pin %pin| is pressed"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.width="400"
    //% weight=68 blockGap=8
    //% advanced=true
    export function isButtonPressed(pin: DigitalPin): boolean {
        return isSensorOn(pin);
    }

    /**
     * Returns true if the sensor is triggered.
     * @param pin pin to read from
     */
    //% blockId="sensors_is_touch_sensor_on"
    //% block="touch sensor on pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.width="400"
    //% weight=67 blockGap=8
    //% advanced=true
    export function isTouchSensorOn(pin: DigitalPin): boolean {
        return isSensorOn(pin);
    }

    /**
     * Returns true if the sensor is triggered.
     * @param pin pin to read from
     */
    //% blockId="sensors_is_motion_sensor_on"
    //% block="motion sensor on pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.width="400"
    //% weight=66 blockGap=8
    //% advanced=true
    export function isMotionSensorOn(pin: DigitalPin): boolean {
        return isSensorOn(pin);
    }

    /**
     * Returns the state of line follower, true for inside the line and false for outside.
     * @param pin pin to read from
     */
    //% blockId="sensors_is_line_follower_on"
    //% block="line follower on pin %pin"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=4
    //% pin.fieldOptions.width="400"
    //% weight=65 blockGap=25
    //% advanced=true
    export function isLineFollowerOn(pin: DigitalPin): boolean {
        //Invert the logic because the sensor is on when it is outside the line
        return !isSensorOn(pin);
    }

    //Other blocks

    /**
     * Gets the soil moisture value and returns true if it is in the range selected by the user.
     * @param pin pin to read from (P0/P1/P2)
     * @param range the selected range (dry/saturated/wet)
     */
    //% blockId="sensors_get_moisture_value"
    //% block="moisture on pin %pin| is %range |?"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=1
    //% pin.fieldOptions.width="100"
    //% weight=60 blockGap=8
    //% advanced=true
    export function getMoistureValue(pin: InitialPins, range: MoistureSensorRange): boolean {
        const analogPin = pinConverterAnalog(pin);
        return moistureValueToRange(pins.analogReadPin(analogPin)) == range;
    }

    /**
     * Gets the light level on the sensor and returns true if it is in the range selected by the user.
     * @param pin pin to read from (P0/P1/P2)
     * @param range the selected range (very clear/clear/shadow/dark/very dark)
     */
    //% blockId="sensors_get_light_value"
    //% block="light level on pin %pin| is %range |?"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=1
    //% pin.fieldOptions.width="100"
    //% weight=59 blockGap=8
    //% advanced=true
    export function getLightValue(pin: InitialPins, range: LightSensorRange): boolean {
        const analogPin = pinConverterAnalog(pin);
        return lightValueToRange(pins.analogReadPin(analogPin)) == range;
    }

    /**
     * Read value of sound sensor and return if it is in the range selected by the user.
     * @param pin pin to read from (P0/P1/P2)
     * @param range the selected range (low/medium/high)
     */
    //% blockId="sensors_sound_sensor_range"
    //% block="sound on pin %pin| is %range |?"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=1
    //% pin.fieldOptions.width="100"
    //% weight=58 blockGap=8
    //% advanced=true
    export function soundSensorRange(pin: InitialPins, range: SoundSensorRange): boolean {
        const analogPin = pinConverterAnalog(pin);
        let highestValue = pins.analogReadPin(analogPin);
        let i = 100;
        while(i >= 0) {
            let value = pins.analogReadPin(analogPin);
            if(highestValue < value) {
                highestValue = value;
            }
            i--;
        }
        return soundValueToRange(highestValue) == range;
    }

    /**
     * Gets the potentiometer value in angle (between 0 and 300) or number (between 0 and 1023).
     * @param pin pin to read from (P0/P1/P2)
     * @param type the type that should read (angle/number)
     */
    //% blockId="sensors_get_potentiometer_value"
    //% block="potentiometer on pin %pin| in %type"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=1
    //% pin.fieldOptions.width="100"
    //% weight=57 blockGap=8
    //% advanced=true
    export function getPotentiometerValue(pin: InitialPins, type: PotentiometerReturnType): number {
        const analogPin = pinConverterAnalog(pin);
        if (type === PotentiometerReturnType.angle) {
            return pins.map(
                pins.analogReadPin(analogPin),
                0,
                1023,
                0,
                300
                )
        } else {
           return pins.analogReadPin(analogPin);
        }
    }

    /**
     * Gets the temperature in the sensor in degrees Celsius, with optional adjustment to increase accuracy.
     * @param pin pin to read from (P0/P1/P2)
     * @param offset the offset in degrees Celsius to adjust the sensor
     */
    //% blockId="sensors_get_temperature"
    //% block="temperature on pin %pin| with offset %offset"
    //% pin.fieldEditor="gridpicker" pin.fieldOptions.columns=1
    //% pin.fieldOptions.width="100"
    //% weight=56 blockGap=8
    //% advanced=true
    export function getTemperatureC(pin: InitialPins, offset: number): number {
        const analogPin = pinConverterAnalog(pin);
        return getTempInDegreesCelsius(pins.analogReadPin(analogPin), offset);
    }

    const directionEventId = 2998;
    /**
    * Contains the code that will be executed when a joystick position is detected.
    * @param pinX pin regarding the X axis
    * @param pinY pin regarding the Y axis, eg: InitialPins.P1
    * @param direction position of joystick
    * @param handler code to run
    */
    //% blockId="sensors_joystick_direction"
    //% block="when joystick in pins %pinX| and %pinY| is %direction"
    //% pinX.fieldEditor="gridpicker" pinX.fieldOptions.columns=1
    //% pinY.fieldEditor="gridpicker" pinY.fieldOptions.columns=1
    //% pinX.fieldOptions.width="100"
    //% pinY.fieldOptions.width="100"
    //% weight=55 blockGap=8
    //% advanced=true
    export function joystickDirection(pinX: InitialPins, pinY: InitialPins, direction: JoystickPosition, handler: Action) {
        control.onEvent(directionEventId, direction, handler);
        const analogPinX = pinConverterAnalog(pinX);
        const analogPinY = pinConverterAnalog(pinY);
        control.inBackground(() => {
            while(true) {
                let x = pins.analogReadPin(analogPinX);
                let y = pins.analogReadPin(analogPinY);
                const direction = convertJoystick(x, y);
                control.raiseEvent(directionEventId, direction);
                basic.pause(175);
                control.waitMicros(15000);
            }
        })
    }

    /**
     * Converts a number (between 0 and 1023) to a joystick direction coordinate
     */
    function convertJoystick(x: number, y: number): JoystickPosition{
        if (y < 400 && x < 400) {
            return JoystickPosition.downLeft;
        } else if(y < 400 && x > 624) {
            return JoystickPosition.downRight;
        } else if(y > 624 && x < 400) {
            return JoystickPosition.upLeft;
        } else if(y > 624 && x > 624) {
            return JoystickPosition.upRight;
        } else if((y > 400 && y < 624) && x < 400) {
            return JoystickPosition.left;
        } else if((y >= 400 && y <= 624) && x > 624) {
            return JoystickPosition.right;
        } else if(y < 400 && (x >= 400 && x <= 624)) {
            return JoystickPosition.down;
        } else if(y > 624 && (x >= 400 && x <= 624)) {
            return JoystickPosition.up;
        } else {
            return JoystickPosition.none;
        }
    }

    /**
     * Converts number to DigitalPin
     */
    function pinConverterDigital(pin: number): DigitalPin {
        switch(pin) {
            case 0: return DigitalPin.P0;
            case 1: return DigitalPin.P1;
            case 2: return DigitalPin.P2;
            case 3: return DigitalPin.P3;
            case 4: return DigitalPin.P4;
            case 5: return DigitalPin.P5;
            case 6: return DigitalPin.P6;
            case 7: return DigitalPin.P7;
            case 8: return DigitalPin.P8;
            case 9: return DigitalPin.P9;
            case 10: return DigitalPin.P10;
            case 11: return DigitalPin.P11;
            case 12: return DigitalPin.P12;
            case 13: return DigitalPin.P13;
            case 14: return DigitalPin.P14;
            case 15: return DigitalPin.P15;
            case 16: return DigitalPin.P16;
            case 19: return DigitalPin.P19;
            case 20: return DigitalPin.P20;
            default: return DigitalPin.P16; // pin 16 is not in use on the shield
        }
    }

    /**
     * Converts number to AnalogPin
     */
    function pinConverterAnalog(pin: number): AnalogPin {
        switch(pin) {
            case 0: return AnalogPin.P0;
            case 1: return AnalogPin.P1;
            case 2: return AnalogPin.P2;
            case 3: return AnalogPin.P3;
            case 4: return AnalogPin.P4;
            case 5: return AnalogPin.P5;
            case 6: return AnalogPin.P6;
            case 7: return AnalogPin.P7;
            case 8: return AnalogPin.P8;
            case 9: return AnalogPin.P9;
            case 10: return AnalogPin.P10;
            case 11: return AnalogPin.P11;
            case 12: return AnalogPin.P12;
            case 13: return AnalogPin.P13;
            case 14: return AnalogPin.P14;
            case 15: return AnalogPin.P15;
            case 16: return AnalogPin.P16;
            case 19: return AnalogPin.P19;
            case 20: return AnalogPin.P20;
            default: return AnalogPin.P16; // pin 16 is not in use on the shield
        }
    }

    /**
     * Converts SensorsGroveGesture to GroveGesture
     */
    function convertSensorGesture(sensorsGesture: number): GroveGesture {
        switch(sensorsGesture) {
            case 0: return GroveGesture.None;
            case 1: return GroveGesture.Right;
            case 2: return GroveGesture.Left;
            case 3: return GroveGesture.Up;
            case 4: return GroveGesture.Down;
            case 5: return GroveGesture.Forward;
            case 6: return GroveGesture.Backward;
            case 7: return GroveGesture.Clockwise;
            case 8: return GroveGesture.Anticlockwise;
            case 9: return GroveGesture.Wave;
            default: return GroveGesture.None;
        }
    }

    /**
     * Converts number from 0-100 to speed ranges
     */
    function speedRanges(value: number): number {
        if (value < 15) return 3;
        if (value >= 15 && value < 30) return 5;
        if (value >= 30 && value < 45) return 10;
        if (value >= 45 && value < 60) return 15;
        if (value >= 60 && value < 80) return 20;
        return 100;
    }

    /**
    * Converts number from 0-950 to moisture sensor ranges
    */
    function moistureValueToRange(value: number): MoistureSensorRange {
        if (value >= 0 && value <= 300) return MoistureSensorRange.dry;
        if (value > 300 && value <= 600) return MoistureSensorRange.wet;
        if (value > 600 && value <= 1023) return MoistureSensorRange.saturated;
        return null;
    }

    /**
     * Return if sensor is on
     */
    function isSensorOn(pin: DigitalPin): boolean {
        const readPin = pins.digitalReadPin(pin);
        pins.setPull(pin, PinPullMode.PullNone);
        return readPin == 0 ? false : true;
    }

    /**
     * The crash sensor is active-low (0 = pressed, 1 = not pressed), while on simulator it is active-high
     * Micro:bit implementation is in sensors.cpp
     */
    //% shim=sensors::isOnOffCrashSensor
    function isOnOffCrashSensor(value: boolean): boolean {
        // Fake function for simulator
        return value;
    }

    /**
     * Function used for simulator get temperature in degrees Celsius, actual implementation is in sensors.cpp
     */
    //% shim=sensors::getTempInDegreesCelsius
    function getTempInDegreesCelsius(value: number, offset: number): number {
        // Fake function for simulator
        return value;
    }

    /**
     * Converts number from 0-1023 to light sensor range
     */
    function lightValueToRange(value: number): LightSensorRange {
        if (value >= 0 && value <= 102) return LightSensorRange.veryClear;
        if (value > 102 && value <= 409) return LightSensorRange.clear;
        if (value > 409 && value <= 613) return LightSensorRange.shadow;
        if (value > 613 && value <= 920) return LightSensorRange.dark;
        if (value > 920 && value <= 1023) return LightSensorRange.veryDark;
        return null;
    }

    /**
     * Converts number from 0-1023 to sound sensor range
     */
    function soundValueToRange(value: number): SoundSensorRange {
        if (value >= 0 && value <= 114) return SoundSensorRange.low;
        else if (value <= 265) return SoundSensorRange.medium;
        else if (value <= 1023) return SoundSensorRange.high;
        return null;
    }

    /**
     * Function that converts the steering parameters (right / left) and speed (0 to 100) into a value in degrees that is understood by the continuous servo motor
     */
    function servoMotorController(value: number, direction: ServoDirection): number {
        if (value > 100) {
            value = 100;
        }
        if (value < 0) {
            value = 0;
        }
        if (direction == ServoDirection.clockwise) {
            direction = -1;
        } else {
            direction = 1;
        }
        let range = speedRanges(value);
        value = ((range * 90) / 100);
        value = 90 + (value * direction);
        return speedServoMotor(value, direction);
    }

    /**
     * Function used for simulator servomotor continuos, actual implementation is in sensors.cpp
     */
    //% shim=sensors::speedServoMotor
    function speedServoMotor(value: number, direction: number): number {
        //"180 * direction" is the equivalent of the first complete rotation
        //"360" is the value equivalent to one rotation
        //"3"   is the equivalent of the number of turns
        return ((180 * direction) + 360 * 3) * direction;
    }
}

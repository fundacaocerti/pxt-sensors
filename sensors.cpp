/*
 * Copyright (C) 2018 Fundação CERTI
 */

#include "pxt.h"

using namespace pxt;

namespace sensors {

  //%
  uint32_t getTempInDegreesCelsius(int value, int offset){
    return (((value * 3200 / 1023) - 500) / 10) + offset;
  }

  //%
  uint32_t speedServoMotor(int value, int direction) {
    return (uint32_t) value;
  }

  //%
  bool isOnOffCrashSensor(bool value) {
    // Invert the return of the crash sensor on micro:bit because it is active-low
    return !value;
  }
}
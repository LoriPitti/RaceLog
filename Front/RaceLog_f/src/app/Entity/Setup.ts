export interface Setup {
  carName: string;
  basicSetup: BasicSetup;
  advancedSetup: AdvancedSetup;
  trackBopType: number;
}

export interface BasicSetup {
  tyres: {
    tyreCompound: number;
    tyrePressure: number[];
  };
  alignment: {
    camber: number[];
    toe: number[];
    staticCamber: number[];
    toeOutLinear: number[];
    casterLF: number;
    casterRF: number;
    steerRatio: number;
  };
  electronics: {
    tC1: number;
    tC2: number;
    abs: number;
    eCUMap: number;
    fuelMix: number;
    telemetryLaps: number;
  };
  strategy: {
    fuel: number;
    nPitStops: number;
    tyreSet: number;
    frontBrakePadCompound: number;
    rearBrakePadCompound: number;
    pitStrategy: PitStrategy[];
    fuelPerLap: number;
  };
}

export interface PitStrategy {
  fuelToAdd: number;
  tyres: {
    tyreCompound: number;
    tyrePressure: number[];
  };
  tyreSet: number;
  frontBrakePadCompound: number;
  rearBrakePadCompound: number;
}

export interface AdvancedSetup {
  mechanicalBalance: {
    aRBFront: number;
    aRBRear: number;
    wheelRate: number[];
    bumpStopRateUp: number[];
    bumpStopRateDn: number[];
    bumpStopWindow: number[];
    brakeTorque: number;
    brakeBias: number;
  };
  dampers: {
    bumpSlow: number[];
    bumpFast: number[];
    reboundSlow: number[];
    reboundFast: number[];
  };
  aeroBalance: {
    rideHeight: number[];
    rodLength: number[];
    splitter: number;
    rearWing: number;
    brakeDuct: number[];
  };
  drivetrain: {
    preload: number;
  };
}

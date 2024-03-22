import { Injectable } from '@angular/core';
import {AdvancedSetup, BasicSetup} from "../Entity/Setup";

@Injectable(
)
export class SetupService {
  private setup:Setup;

  constructor() {
    this.setup=  {
      carName: 'Nome_auto',
      basicSetup: {
        tyres: {
          tyreCompound: 0,
          tyrePressure: [0,0,0,0], // Esempio di valori predefiniti
        },
        alignment: {
          camber: [], // Esempio di valori predefiniti
          toe: [], // Esempio di valori predefiniti
          staticCamber: [0, 0], // Esempio di valori predefiniti
          toeOutLinear: [0, 0], // Esempio di valori predefiniti
          casterLF: 0, // Esempio di valore predefinito
          casterRF: 0, // Esempio di valore predefinito
          steerRatio: 0, // Esempio di valore predefinito
        },
        electronics: {
          tC1: 0, // Esempio di valore predefinito
          tC2: 0, // Esempio di valore predefinito
          abs: 0, // Esempio di valore predefinito
          eCUMap: 0, // Esempio di valore predefinito
          fuelMix: 0, // Esempio di valore predefinito
          telemetryLaps: 0, // Esempio di valore predefinito
        },
        strategy: {
          fuel: 0, // Esempio di valore predefinito
          nPitStops: 0, // Esempio di valore predefinito
          tyreSet: 0, // Esempio di valore predefinito
          frontBrakePadCompound: 0, // Esempio di valore predefinito
          rearBrakePadCompound: 0, // Esempio di valore predefinito
          pitStrategy: [], // Esempio di valore predefinito
          fuelPerLap: 0, // Esempio di valore predefinito
        },
      },
      advancedSetup: {
        mechanicalBalance: {
          aRBFront: 0, // Esempio di valore predefinito
          aRBRear: 0, // Esempio di valore predefinito
          wheelRate: [0, 0], // Esempio di valori predefiniti
          bumpStopRateUp: [0, 0], // Esempio di valori predefiniti
          bumpStopRateDn: [0, 0], // Esempio di valori predefiniti
          bumpStopWindow: [0, 0], // Esempio di valori predefiniti
          brakeTorque: 0, // Esempio di valore predefinito
          brakeBias: 0, // Esempio di valore predefinito
        },
        dampers: {
          bumpSlow: [0, 0], // Esempio di valori predefiniti
          bumpFast: [0, 0], // Esempio di valori predefiniti
          reboundSlow: [0, 0], // Esempio di valori predefiniti
          reboundFast: [0, 0], // Esempio di valori predefiniti
        },
        aeroBalance: {
          rideHeight: [0, 0], // Esempio di valori predefiniti
          rodLength: [0, 0], // Esempio di valori predefiniti
          splitter: 0, // Esempio di valore predefinito
          rearWing: 0, // Esempio di valore predefinito
          brakeDuct: [0, 0], // Esempio di valori predefiniti
        },
        drivetrain: {
          preload: 0, // Esempio di valore predefinitocd race
        },
      },
      trackBopType: 0, // Esempio di valore predefinito
    };
  }
  setSetup(s:Setup){
    this.setup = s;
    console.log("SETTED--->"+this.setup.basicSetup.tyres.tyrePressure[1])


  }
  getSetup(){
    console.log("GETTED--->"+this.setup.basicSetup.tyres.tyrePressure[1])
    return this.setup;

  }
}

export interface Setup {
  carName: string;
  basicSetup: BasicSetup;
  advancedSetup: AdvancedSetup;
  trackBopType: number;
}

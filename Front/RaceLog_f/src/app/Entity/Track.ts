export class Track {
  constructor(
    private name: string,
    private country: string,
    private imgBack: Uint8Array,
    private imgFront: Uint8Array,
    private tLength: number,
    private cornerL: number,
    private cornerR: number
  ) {}

  // Getter per il nome
  get getName(): string {
    return this.name;
  }

  // Getter per il paese
  get getCountry(): string {
    return this.country;
  }

  // Getter per l'immagine posteriore
  get getImgBack(): Uint8Array {
    return this.imgBack;
  }

  // Getter per l'immagine frontale
  get getImgFront(): Uint8Array {
    return this.imgFront;
  }

  // Getter per la lunghezza del tracciato
  get getTLength(): number {
    return this.tLength;
  }

  // Getter per il numero di curve a sinistra
  get getCornerL(): number {
    return this.cornerL;
  }

  // Getter per il numero di curve a destra
  get getCornerR(): number {
    return this.cornerR;
  }
}

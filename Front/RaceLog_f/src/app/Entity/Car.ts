export class Car{
  constructor(private name:string, private brand:string, private imgBack: Blob,
              private imgFront: Blob,  private year:number) {
  }
  // Getter for name property
  public getName(): string {
    return this.name;
  }

  // Getter for brand property
  public getBrand(): string {
    return this.brand;
  }

  // Getter for year property
  public getYear(): number {
    return this.year;
  }

  public getImgBack():Blob{
    return this.imgBack
  }
  public getImgFront():Blob{
    return this.imgFront
  }
}

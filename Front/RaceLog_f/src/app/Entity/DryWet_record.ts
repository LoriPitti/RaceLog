export class DryWet_record{
  constructor(private username:string, private track:string, private car:string, private time:string) {}
  public getUsername(): string {
    return this.username;
  }

  getTrack(): string {
    return this.track;
  }

  getCar(): string {
    return this.car;
  }

  getTime(): string {
    return this.time;
  }
}

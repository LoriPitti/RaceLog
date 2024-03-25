
export  class UserData{
constructor(private username:string, private name:string,
  private lastname:string,  private iconType:number ) {
}
get getUsername(): string {
  return this.username;
}



get getName(): string {
  return this.name;
}

get getLastname(): string {
  return this.lastname;
}

get getIconType(): number {
  return this.iconType;
}
}

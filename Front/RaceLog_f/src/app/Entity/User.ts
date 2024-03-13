export class User{
  constructor(private username:string, private password:string, private email:string, private name:string,
              private lastname:string,  private iconType:number ) {
  }
  get getUsername(): string {
    return this.username;
  }

  get getPassword(): string {
    return this.password;
  }

  get getEmail(): string {
    return this.email;
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

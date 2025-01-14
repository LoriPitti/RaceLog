export class User{
  constructor(private username:string, private password:string, private email:string, private name:string,
              private lastname:string,  private iconType:number, private userType: number, private token: string| null) {
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

  get getUserType(): number {
    return this.userType;
  }

  get getToken(): string | null {
    return this.token;
  }
}

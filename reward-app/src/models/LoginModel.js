export class LoginModel {
  constructor({ token, email, name }) {
    this.token = token;
    this.email = email;
    this.name = name;
  }
    
  static fromJson(json) {
    let login = new LoginModel(
        {
            token: json['token'],
            email: json['email'],
            name: json['name'],

        }
    );
    return login;
  }

}

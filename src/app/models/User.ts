class User {
    _id : string;
    name: string;
    surname: string;
    username: string;
    mail: string;
    picture: string;
    password: string;
    born: Date;
    is_admin: boolean;
    

    constructor(
      _id="",
      name="",
      surname="",
      username="",
      mail="",
      picture="",
      password="",
      born=new Date(),
      is_admin = false,
      
    )
     {
      this._id= _id,
      this.name = name;
      this.surname = surname;
      this.username = username;
      this.mail = mail;
      this.picture = picture;
      this.password = password;
      this.born = born;
      this.is_admin = is_admin;
    }
  }

  export { User };

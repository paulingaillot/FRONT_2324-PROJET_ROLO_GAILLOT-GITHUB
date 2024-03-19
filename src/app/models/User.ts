class User {
    name: string;
    surname: string;
    username: string;
    mail: string;
    picture: string | null;
    password: string;
    born: Date;
    is_admin: boolean;
    favorites: string[]; // assuming 'Event' is a string ID

    constructor(
      name="",
      surname="",
      username="",
      mail="",
      picture=null,
      password="",
      born=new Date(),
      is_admin = false,
      favorites = []
    )
     {
      this.name = name;
      this.surname = surname;
      this.username = username;
      this.mail = mail;
      this.picture = picture;
      this.password = password;
      this.born = born;
      this.is_admin = is_admin;
      this.favorites = favorites;
    }
  }

  export { User };

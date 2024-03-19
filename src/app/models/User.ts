class User {
    name: string;
    surname: string;
    username: string;
    mail: string;
    picture: Blob;
    password: string;
    born: Date;
    is_admin: boolean;
    favorites: string[]; // assuming 'Event' is a string ID
  
    constructor({
      name,
      surname,
      username,
      mail,
      picture,
      password,
      born,
      is_admin = false,
      favorites = []
    }: {
      name: string;
      surname: string;
      username: string;
      mail: string;
      picture: Blob;
      password: string;
      born: Date;
      is_admin?: boolean;
      favorites?: string[];
    }) {
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

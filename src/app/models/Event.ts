import { User } from "./User";

class Event {
    _id: String;
    name: string;
    image: Blob;
    theme: String;
    prix: number;
    date: Date;
    creator: User;

    constructor(_id:String,name:string, image:Blob, theme:string, prix:number, date:Date, creator:User) {
        this._id=_id;
        this.name=name;
        this.image=image;
        this.theme=theme;
        this.prix=prix;
        this.date=date;
        this.creator= creator;
        }

}

export { Event };

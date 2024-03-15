
class Event {
    _id: String;
    image: Blob;
    theme: String;
    prix: number;
    date: Date;

    constructor(_id:String, image:Blob, theme:string, prix:number, date:Date) {
        this._id=_id;
        this.image=image;
        this.theme=theme;
        this.prix=prix;
        this.date=date;
        }

}

export { Event };

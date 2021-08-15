export class Form {
    constructor(private id: String, private firstName: String, private lastName: String) {}

    public setId(id: String): void {
        this.id = id;
    }
}

import { AbstractControl } from "@angular/forms";

export class Question {

    constructor(private name: string, private label: String, private control: AbstractControl) {        
    }

    public getControl(): AbstractControl {
        return this.control;
    }

    public getName(): string {
        return this.name;
    }

    public getLabel(): String {
        return this.label;
    }
}

import { Injectable } from "@angular/core";

@Injectable()

export class PathService{
    path(): string{
        return "http://localhost:5174/user/api/";
    }
}

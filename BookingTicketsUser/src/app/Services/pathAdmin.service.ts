import { Injectable } from "@angular/core";

@Injectable()

export class PathAdminService{
    path(): string{
        return "http://localhost:5174/admin/api/";
    }
}
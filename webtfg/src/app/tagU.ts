import { UserU } from "./userU";
import { ObjectU } from "./objectU";

export class TagU extends ObjectU{
    tag_id ?:number;
    tag_code?:number;
    tag_description?:string;
    event_id?:number;
    event_description?:string;
    user_id?:number;
    user_description?:string;
    balance?:number;
 }

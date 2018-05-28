export class Password {
    protected hide:boolean = true;
    protected hideConf:boolean = true;
    change(){ this.hide = !this.hide; }
    protected pwd_confirmation:string;
    changeConf(){ this.hideConf = !this.hideConf; }
}

import { GeneralService } from "./general.service";
import { ConsSettings } from "./cons-settings";
import { ObjectU } from "./objectU";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ActivatedRoute } from "@angular/router";
import { Location, DatePipe } from "@angular/common";

export class Generalform {
    protected id_url:number = null;
    protected URL:string = "";
    protected object = {};
    protected object_id_name = "";
    protected loading:boolean = true;
    
    protected title:string;
    protected titleSubject: BehaviorSubject<string> = new BehaviorSubject<string>(this.title);
    protected objectSubject: BehaviorSubject<ObjectU> = new BehaviorSubject<ObjectU>(this.object);

    protected navLinks = [];
    protected activeLinkIndex = -1;
    protected index:number;

    protected regAlreadyExist:boolean = false;
    protected regAlrBehaviourSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.regAlreadyExist);

    //protected submitted:boolean = false;
    protected _data = new BehaviorSubject<boolean>(false);
    protected submitted:boolean;
    set data(value) {
        // set the latest value for _data BehaviorSubject
        this._data.next(value);
    };

    get data() {
        // get the latest value from _data BehaviorSubject
        return this._data.getValue();
    }
    
    constructor (protected generalService:GeneralService, protected route: ActivatedRoute, protected location: Location){ 
    }

    doIt(){
      this._data
            .subscribe(x => {
                this.submitted = x;
            });
      this.regAlrBehaviourSubject.subscribe(value => this.regAlreadyExist = value);
      this.titleSubject.subscribe(value => this.title = value);
      this.objectSubject.subscribe(value=> this.object = value);
      this.id_url = +this.route.snapshot.paramMap.get(this.object_id_name);
      this.route
        .queryParams
        .subscribe(params => {
          this.readParams(params);
        }
      );
      if (this.id_url>0) this.getObject();
      else this.getNewForm();
    }

    getNewForm(){}

    getObject(){}

    manageResponse(res){
      console.log(res);
      if (res[ConsSettings.Error] && res[ConsSettings.Code]==ConsSettings.CODE_REG_ALR_EXISTS) {
        let actualValue = this.regAlrBehaviourSubject.getValue();
        this.regAlrBehaviourSubject.next(!actualValue);
        this._data.next(false);
      }
      else {
        this._data.next(true);
      }
    }

    onEdit(event){
      this._data.next(false);
    }
    onSubmitChild(arr_submit){
      let object = arr_submit["object"];
      if (object!=undefined){
        let object_id_value = object[this.object_id_name];
        if (arr_submit["objIdValue"]!=null) object_id_value = arr_submit["objIdValue"];
        if (this.id_url>0) this.generalService.crud(ConsSettings.PUT, this.URL, object_id_value, object).subscribe(res => {
          this.manageResponse(res);
        });
        else this.generalService.crud(ConsSettings.POST, this.URL, undefined, object).subscribe(res => {
          this.manageResponse(res);
        });
      }
    }

    readParams(params){}
}

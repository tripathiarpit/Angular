import {Component, Input, OnInit} from '@angular/core';
import {AlertService} from '../../../utilities/alert/alert.service';
import {ConsoleLoggerService} from '../../../logger/console-logger.service';
import {Title} from '@angular/platform-browser';
import {Router} from '@angular/router';
import {LoaderService} from '../../../loader/loader.service';
import {RootService} from '../../../service/root-service/root.service';
import {ApplicationConstants} from '../../../models/ApplicationConstants';
import {Userservice} from '../../userservice';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidateUserType} from '../create-user.component';
import {ErrorCode} from '../../../models/ErrorCode';
import {selector} from 'rxjs/operator/publish';

@Component({
    selector: 'app-fill-user-details',
    templateUrl: './fill-user-details.component.html',
    styleUrls: ['./fill-user-details.component.css']
})
export class FillUserDetailsComponent implements OnInit {
    public pageTitle: string;
    public createUserForm: FormGroup;
    userTypeList: any;
    userType: string;
    countryList: any;

    constructor(private _titleService: Title,
                private _rootService: RootService,
                public router: Router,
                public userService: Userservice) {
        this._titleService.setTitle('Create User2');
        this.countryList = _rootService.countryList;
    }

    namePrefixList = [
        {value: 'select', viewValue: 'select'},
        {value: 'mr', viewValue: 'Mr.'},
        {value: 'ms', viewValue: 'Ms.'},
        {value: 'mrs', viewValue: 'Mrs.'}
    ];
    namePrefix = new FormControl('', [Validators.required, ValidateNamePrefix]);
    countryName = new FormControl('', [Validators.required, ValidateCountryName]);
    firstName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9 ,.\'-]+$')]);
    lastName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9 ,.\'-]+$')]);
    middleName = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern('^[a-zA-Z0-9 ,.\'-]+$')]);
    zipCode = new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(20), Validators.pattern('^[0-9]+$')]);
    email = new FormControl('', [Validators.required, Validators.email]);
    address1 = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(256), Validators.pattern('^[a-zA-Z0-9 ,.-]+$')]);
    address2 = new FormControl('', [Validators.minLength(2), Validators.maxLength(256), Validators.pattern('^[a-zA-Z0-9 ,.-]+$')]);
    address3 = new FormControl('', [Validators.minLength(2), Validators.maxLength(256), Validators.pattern('^[a-zA-Z0-9 ,.-]+$')]);
    phone = new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(20), Validators.pattern('^[0-9]+$')]);
    state = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(540), Validators.pattern('^[a-zA-Z ]+$')]);
    city = new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(540), Validators.pattern('^[a-zA-Z ]+$')]);
    suffixKey = new FormControl('', [Validators.minLength(3), Validators.maxLength(30)]);

    ngOnInit() {
        this.pageTitle = this._titleService.getTitle();
        this.userService.getUserTypeList().subscribe((userTypeList: any) => {
            this.userTypeList = userTypeList;
        });
        this.userService.getSelectedUser().subscribe((userType: any) => {
            for (const list of this.userTypeList) {
                if (list.userTypeId === userType) {
                    this.userType = list.userTypeDesc;
                }
            }
        });
        this.createUserForm = new FormGroup({
            namePrefix: this.namePrefix,
            countryName: this.countryName,
            firstName: this.firstName,
            middleName: this.middleName,
            lastName: this.lastName,
            zipCode: this.zipCode,
            email: this.email,
            address1: this.address1,
            address2: this.address2,
            address3: this.address3,
            phone: this.phone,
            state: this.state,
            city: this.city,
            suffixKey: this.suffixKey
        });
    }

    submit() {
        console.log('hi');
    }

}

function ValidateNamePrefix(control: AbstractControl) {
    if (control.value === 'select') {
        return {prefixError: true};
    }
    return null;
}

function ValidateCountryName(control: AbstractControl) {
    if (control.value === 'Select') {
        return {countryMandatory: true};
    }
    return null;
}

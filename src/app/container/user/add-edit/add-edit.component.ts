import { Component, OnInit, trigger, state, style, transition, animate, Input, ElementRef } from '@angular/core';
import { FormControl, FormGroup, FormControlName, Validators, FormBuilder, FormArray } from '@angular/forms';
import { AppApiHitService } from '../../../app-api-hit.service';
import { Subject } from 'rxjs/Subject';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Location } from '@angular/common';
import * as $ from 'jquery';
import { AuthService } from '../../../auth.service';
@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.css'],
  animations: [
    trigger('divState', [
      state('normal', style({
        backgroundColor: 'blue',
        transform: 'translateX(0)'
      })),
      state('highlited', style({ backgroundColor: 'pink', transform: 'translateX(100px)' })),
      transition('normal <=> highlited', animate(300))

    ])

  ]
})
export class AddEditComponent implements OnInit {
  state: string;
  userForm: FormGroup;
  genders = ["male", "female"];
  statusRequest: boolean = false;
  successMessage: string;
  errorMessage: string;
  errorText: any;
  userId: any;
  imagePath: any;
  otherimagePath= new Array();
  flage = false;
  imageObject: any;
  @Input() fileinput: ElementRef;
get formData() { return <FormArray>this.userForm.get('other_images'); }
  constructor(private apiService: AppApiHitService, private route: ActivatedRoute,
    private location: Location, private fb: FormBuilder, private auth: AuthService) { }
  onBack() {

    this.location.back();
  }
  ngOnInit() {


    this.route.params.subscribe((params: Params) => {
      if (typeof params['id'] !== 'undefined') {
        this.userId = +params['id'];
        var data = {
          'id': this.userId,
          'token': localStorage.getItem('token'),
          'email_data': localStorage.getItem('email_data'),

        }

        this.apiService.onPostUserDataAndGet("http://localhost/prectice_api/api/user/edit", JSON.stringify(data)).subscribe((response) => {

          if (response.status == 200) {
            var res = response.json();
            if (res.status == "true") {
              this.userForm.patchValue(

                {
                  'first_name': res.data.first_name,
                  'last_name': res.data.last_name,
                  'email': res.data.email,
                  'company': res.data.company,
                  'website': res.data.website,
                  'gender': res.data.gender,
                  'id': res.data.id,
                }
              );
              (res.data.gender) == 'male' ? this.state = 'normal' : this.state = 'highlited';
            } else {

              $('html, body').animate({ scrollTop: $('.navbar').offset().top }, 'slow');
              this.errorMessage = res.error;
              if (res.auth_error) {
                this.auth.nonAuthRedirect(res.error);
              }

              setTimeout(() => {
                this.errorMessage = '';
              }, 2500);


            }
          }
        });

      }

    });

    this.userForm = new FormGroup({
      'first_name': new FormControl(null, Validators.required),
      'last_name': new FormControl(null, Validators.required),
      'company': new FormControl(null),
      'website': new FormControl(null, this.validateWebsiteUrl.bind(this)),
      'gender': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'id': new FormControl(null),
      'profile_image': new FormControl(null, Validators.required),
      'other_images': new FormArray([])
    });

  }

  validateWebsiteUrl(control: FormControl): { [s: string]: boolean } {
    if (control.value != null) {
      const website = control.value;
      var test = website.match("^[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU)$");
      if (test) {
        return null;
      } else {
        return { 'website_url': false }
      }
    } else {

      return null;
    }
  }

  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }


  onSubmit() {
    if (this.userForm.valid) {
      let data = this.formdataReturn();

      this.apiService.onPostUserDataAndGetwithoutHeader('http://localhost/prectice_api/api/user/add', data)
        .subscribe((response: any) => {
          console.log(response);
          if (response.status == '200') {
            var res = response.json();
            if (res.status == 'true') {
              $('html, body').animate({ scrollTop: $('.navbar').offset().top }, 'slow');
              this.statusRequest = true;
              this.successMessage = res.data;
              setTimeout(() => {
                this.successMessage = '';
              }, 2500);
            } else {
              $('html, body').animate({ scrollTop: $('.navbar').offset().top }, 'slow');
              this.errorMessage = res.error;
              if (res.auth_error) {
                this.auth.nonAuthRedirect(res.error);
              }

              setTimeout(() => {
                this.errorMessage = '';
              }, 2500);
            }
          }
        },
        (error) => {
          console.log(error);
        }
        );

      //console.log(this.userForm);
    } else {
      this.validateAllFormFields(this.userForm); //{7}
    }

  }
  reserFormData() {

    this.userForm.reset();
    this.state = '';

  }

  onImageChange(event: any) {
    //console.log(event.target.result);
    //console.log(this.userForm.get('profile_image'));

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      this.imageObject = event.target.files[0];
      console.log(this.imageObject);
      reader.onload = (event: any) => {
        this.imagePath = event.target.result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }

  }
  onOtherImageChange(event: any, i) {
    //console.log(event.target.result);
    //console.log(this.userForm.get('profile_image'));

    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      this.imageObject = event.target.files[0];
      console.log(this.imageObject);
      reader.onload = (event: any) => {
        this.otherimagePath.push(event.target.result);
      }

      reader.readAsDataURL(event.target.files[0]);
    }

  }
  ongenderChnage(event: any) {
    event == 'male' ? this.state = 'normal' : this.state = 'highlited';
    //console.log(this.userForm);

  }
  formdataReturn() {
    let formData = new FormData();
    formData.append('first_name', this.userForm.get('first_name').value);
    formData.append('last_name', this.userForm.get('last_name').value);
    formData.append('company', this.userForm.get('company').value);
    formData.append('website', this.userForm.get('website').value);
    formData.append('gender', this.userForm.get('gender').value);
    formData.append('email', this.userForm.get('email').value);
    formData.append('password', this.userForm.get('password').value);
    formData.append('profile_image', this.imageObject, this.imageObject.name);
    formData.append('token', localStorage.getItem('token'));
    formData.append('email_data', localStorage.getItem('email_data'));



    return formData;
  }


  onAddMoreImages() {

    const control = new FormControl(null, Validators.required);
    (<FormArray>this.userForm.get('other_images')).push(control);

  }

  onRemoveOtherImage(otherImages) {
    console.log(otherImages);
    (<FormArray>this.userForm.get('other_images')).removeAt(otherImages);
    this.otherimagePath.splice(otherImages,1);
  }
}

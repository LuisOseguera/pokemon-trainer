import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { AppState } from '../../../core/services/app-state';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-form',
  imports: [CommonModule, ReactiveFormsModule, NgxMaskDirective],
  templateUrl: './profile-form.html',
  styleUrl: './profile-form.scss',
})
export class ProfileForm {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private appState: AppState,
    private router: Router
  ) {
    this.form = this.fb.group({
      // Set the group fields with their validators (if it's required).
      name: ['', Validators.required],
      birthDate: ['', Validators.required],
      hobby: [''],
      photo: ['', Validators.required],
      dui: [''],
      isAdult: [false],
      minorId: [''],
    });
  }

  // Create or edit adult status:
  updateAdultStatus() {
    const age = this.getAge(this.form.value.birthDate);
    this.form.patchValue({ isAdult: age >= 18 });
    const duiControl = this.form.get('dui');
    if (duiControl) {
      if (age >= 18) {
        duiControl.setValidators([
          Validators.required,
          Validators.pattern(/^\d{13}$/),
        ]);
      } else {
        duiControl.clearValidators();
      }
      duiControl.updateValueAndValidity();
    }
  }

  // Get age by birthdate:
  getAge(birthDate: string): number {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }

  submit() {
    if (this.form.valid) {
      this.appState.setProfileData(this.form.value);
      this.router.navigate(['/pokemon-team']);
    }
  }

  // Set photo to "base64" for showing in profile information:
  onPhotoSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.form.patchValue({ photo: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  }
}

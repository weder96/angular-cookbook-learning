import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReleaseLog } from 'src/app/classes/release-log';

import { ReleaseFormComponent } from './release-form.component';

describe('ReleaseFormComponent', () => {
  let component: ReleaseFormComponent;
  let fixture: ComponentFixture<ReleaseFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReleaseFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReleaseFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should submit a new release log with the correct input values', () => {
    const app = component.apps[2];
    const version = '2.2.2';
    const expectedReleaseLog = new ReleaseLog(app, version);
    spyOn(component.newReleaseLog, 'emit');
    component.releaseForm.setValue({ app, version });
    component.formSubmit(component.releaseForm);
    expect(component.newReleaseLog.emit).toHaveBeenCalledWith(
      expectedReleaseLog
    );
  });

  it("should disable the submit button when we don't have an app selected", () => {
    const submitButton = fixture.nativeElement.querySelector(
      'button[type="submit"]'
    );
    spyOn(component.newReleaseLog, 'emit');
    const app = '';
    const version = '2.2.2';
    component.releaseForm.setValue({ app, version });
    submitButton.click();
    fixture.detectChanges();
    expect(submitButton.hasAttribute('disabled')).toBe(true);
    expect(component.newReleaseLog.emit).not.toHaveBeenCalled();
  });
});

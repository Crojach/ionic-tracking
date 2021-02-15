import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivityTrackingPage } from './activity-tracking.page';

describe('ActivityTrackingPage', () => {
  let component: ActivityTrackingPage;
  let fixture: ComponentFixture<ActivityTrackingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityTrackingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityTrackingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

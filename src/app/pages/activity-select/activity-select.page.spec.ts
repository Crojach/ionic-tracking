import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivitySelectPage } from './activity-select.page';

describe('ActivitySelectPage', () => {
  let component: ActivitySelectPage;
  let fixture: ComponentFixture<ActivitySelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitySelectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivitySelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

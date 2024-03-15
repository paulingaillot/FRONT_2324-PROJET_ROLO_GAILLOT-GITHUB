import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectLoginComponent } from './connect-login.component';

describe('ConnectLoginComponent', () => {
  let component: ConnectLoginComponent;
  let fixture: ComponentFixture<ConnectLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectLoginComponent]
    });
    fixture = TestBed.createComponent(ConnectLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

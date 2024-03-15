import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectRegisterComponent } from './connect-register.component';

describe('ConnectRegisterComponent', () => {
  let component: ConnectRegisterComponent;
  let fixture: ComponentFixture<ConnectRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConnectRegisterComponent]
    });
    fixture = TestBed.createComponent(ConnectRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

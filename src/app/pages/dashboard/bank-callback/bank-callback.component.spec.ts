import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankCallbackComponent } from './bank-callback.component';

describe('BankCallbackComponent', () => {
  let component: BankCallbackComponent;
  let fixture: ComponentFixture<BankCallbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankCallbackComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankCallbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

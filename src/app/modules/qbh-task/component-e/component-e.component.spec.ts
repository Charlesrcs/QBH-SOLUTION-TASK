import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentEComponent } from './component-e.component';

describe('ComponentEComponent', () => {
  let component: ComponentEComponent;
  let fixture: ComponentFixture<ComponentEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComponentEComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponentEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

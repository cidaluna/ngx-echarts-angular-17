import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminTableComponent } from './admin-table.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AdminTableComponent', () => {
  let component: AdminTableComponent;
  let fixture: ComponentFixture<AdminTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTableComponent],
      providers: [
        provideHttpClient(),          // obrigatório
        provideHttpClientTesting()    // mock
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

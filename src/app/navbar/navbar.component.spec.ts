import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { provideHttpClient, provideHttpClientTesting } from '@angular/common/http/testing';
import { MenuService } from '../../services/menu.service';
import { SharedService } from '../../services/shared.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { LoaderService } from '../../services/loader.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UtilityService } from '../../services/utility.service';
import { LegacyComponentService } from '../../services/legacy-component.service';
import { of } from 'rxjs';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let menuService: jasmine.SpyObj<MenuService>;
  let sharedService: jasmine.SpyObj<SharedService>;
  let sessionStorageService: jasmine.SpyObj<SessionStorageService>;
  let loaderService: jasmine.SpyObj<LoaderService>;
  let router: jasmine.SpyObj<Router>;
  let cookieService: jasmine.SpyObj<CookieService>;
  let utilityService: jasmine.SpyObj<UtilityService>;
  let legacyComponentService: jasmine.SpyObj<LegacyComponentService>;

  beforeEach(async () => {
    const menuServiceSpy = jasmine.createSpyObj('MenuService', ['getMenus']);
    const sharedServiceSpy = jasmine.createSpyObj('SharedService', ['updateInstMenu$']);
    const sessionStorageServiceSpy = jasmine.createSpyObj('SessionStorageService', ['get', 'set']);
    const loaderServiceSpy = jasmine.createSpyObj('LoaderService', ['showLoader', 'hideLoader']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']);
    const cookieServiceSpy = jasmine.createSpyObj('CookieService', ['set']);
    const utilityServiceSpy = jasmine.createSpyObj('UtilityService', ['openSnackBar']);
    const legacyComponentServiceSpy = jasmine.createSpyObj('LegacyComponentService', ['message$']);

    await TestBed.configureTestingModule({
      providers: [
        NavBarComponent,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MenuService, useValue: menuServiceSpy },
        { provide: SharedService, useValue: sharedServiceSpy },
        { provide: SessionStorageService, useValue: sessionStorageServiceSpy },
        { provide: LoaderService, useValue: loaderServiceSpy },
        { provide: Router, useValue: routerSpy },
        { provide: CookieService, useValue: cookieServiceSpy },
        { provide: UtilityService, useValue: utilityServiceSpy },
        { provide: LegacyComponentService, useValue: legacyComponentServiceSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;

    menuService = TestBed.inject(MenuService) as jasmine.SpyObj<MenuService>;
    sharedService = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;
    sessionStorageService = TestBed.inject(SessionStorageService) as jasmine.SpyObj<SessionStorageService>;
    loaderService = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    utilityService = TestBed.inject(UtilityService) as jasmine.SpyObj<UtilityService>;
    legacyComponentService = TestBed.inject(LegacyComponentService) as jasmine.SpyObj<LegacyComponentService>;

    // Mock observables
    sharedService.updateInstMenu$ = of([]);
    legacyComponentService.message$ = of();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Add more test cases here to cover all methods and scenarios
});

import { ComponentFixture, TestBed, fakeAsync, flush, tick } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { MenuService } from '../../services/menu.service';
import { SharedService } from '../../services/shared.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { LoaderService } from '../../services/loader.service';
import { CookieService } from 'ngx-cookie-service';
import { UtilityService } from '../../services/utility.service';
import { LegacyComponentService } from '../../services/legacy-component.service';
import { Router } from '@angular/router';
import { of, Subject, Subscription, throwError } from 'rxjs';
import { MenuKeys, MenuResponse, MenuItem } from '../../models/common/menu-model';
import { SessionKeys } from '../../models/common/login-model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  let menuService: jasmine.SpyObj<MenuService>;
  let sharedService: jasmine.SpyObj<SharedService>;
  let sessionStorageService: jasmine.SpyObj<SessionStorageService>;
  let loaderService: jasmine.SpyObj<LoaderService>;
  let cookieService: jasmine.SpyObj<CookieService>;
  let utilityService: jasmine.SpyObj<UtilityService>;
  let router: jasmine.SpyObj<Router>;
  let legacyComponentService: jasmine.SpyObj<LegacyComponentService>;

  const mockMenuResponse: MenuResponse = {
    [MenuKeys.LANGUAGE]: [
      { lanCode: 'en', url: 'string', languageName: 'English' }
    ],
    [MenuKeys.INSTRUCTIONS]: [{ menuItemName: 'Sub', url: 'string', children: [] }],
    [MenuKeys.MADRAS]: { url: 'https://example.com' },
    [MenuKeys.REFERENTIAL]: { url: 'https://example.com' },
    [MenuKeys.DATASCOPES]: { url: 'https://example.com' },
    [MenuKeys.DATA_MAINTENANCE]: { url: 'https://example.com' },
    [MenuKeys.FOLLOW_UP]: { url: 'https://example.com' },
    [MenuKeys.DEVELOPMENT]: [{ menuItemName: 'Sub', url: 'string', children: [] }],
    [MenuKeys.ADMINISTRATION]: [{ menuItemName: 'Sub', url: 'string', children: [] }],
    [MenuKeys.GUIDELINES]: [{ menuItemName: 'Sub', url: 'string', children: [] }],
    [MenuKeys.POS]: { url: 'https://example.com' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: MenuService, useValue: jasmine.createSpyObj('MenuService', ['getMenus']) },
        { provide: SharedService, useValue: jasmine.createSpyObj('SharedService', ['userLogout'], { updateInstMenu$: of([]) }) },
        { provide: SessionStorageService, useValue: jasmine.createSpyObj('SessionStorageService', ['get', 'set']) },
        { provide: LoaderService, useValue: jasmine.createSpyObj('LoaderService', ['showLoader', 'hideLoader']) },
        { provide: CookieService, useValue: jasmine.createSpyObj('CookieService', ['set']) },
        { provide: UtilityService, useValue: jasmine.createSpyObj('UtilityService', ['openSnackBar']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']) },
        {
          provide: LegacyComponentService,
          useValue: jasmine.createSpyObj('LegacyComponentService', [], {
            message$: of(undefined),
            legacyUrl: new Subject()
          })
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;

    menuService = TestBed.inject(MenuService) as jasmine.SpyObj<MenuService>;
    sharedService = TestBed.inject(SharedService) as jasmine.SpyObj<SharedService>;
    sessionStorageService = TestBed.inject(SessionStorageService) as jasmine.SpyObj<SessionStorageService>;
    loaderService = TestBed.inject(LoaderService) as jasmine.SpyObj<LoaderService>;
    cookieService = TestBed.inject(CookieService) as jasmine.SpyObj<CookieService>;
    utilityService = TestBed.inject(UtilityService) as jasmine.SpyObj<UtilityService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    legacyComponentService = TestBed.inject(LegacyComponentService) as jasmine.SpyObj<LegacyComponentService>;

    component.currentMenu = [];
    component.data = {};
    component.menuStack = [];
    component.SelectedTitleStack = [];
    component.selectedIndices = [];
    component.subscription = new Subscription();
    component.selectedLanguage = '';
    component.activeIndex = -1;
    component.isDropdownOpen = false;
    component.selectedMenuTitle = 'Main Menu';

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMenuData on init', fakeAsync(() => {
    menuService.getMenus.and.returnValue(of(mockMenuResponse));
    sessionStorageService.get.and.returnValue('en');
    component.ngOnInit();
    tick();
    expect(menuService.getMenus).toHaveBeenCalled();
    flush();
  }));

  it('should handle getMenuData error', fakeAsync(() => {
    menuService.getMenus.and.returnValue(throwError(() => new Error('error')));
    component.getMenuData();
    tick();
    expect(utilityService.openSnackBar).toHaveBeenCalled();
    flush();
  }));

  it('should return correct menu key', () => {
    const result = component.getMenuKey(MenuKeys.INSTRUCTIONS);
    expect(result).toBe(MenuKeys.INSTRUCTIONS);
  });

  it('should unsubscribe on destroy', () => {
    const spy = spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });

  it('should open and close main menu', () => {
    component.data[MenuKeys.LANGUAGE] = [{ lanCode: 'en', url: 'string', languageName: 'English' }];
    component.openMainMenu(MenuKeys.LANGUAGE, {} as any);
    expect(component.isDropdownOpen).toBeTrue();
    component.closeDropdown();
    expect(component.isDropdownOpen).toBeFalse();
  });

  it('should open submenu', () => {
    const child: MenuItem = { menuItemName: 'Child', url: 'string', children: [] };
    const parent: MenuItem = { menuItemName: 'Parent', url: 'string', children: [child] };
    component.currentMenu = [parent];
    component.openSubmenu(parent, 0);
    expect(component.menuStack.length).toBe(1);
    expect(component.SelectedTitleStack.length).toBe(1);
    expect(component.selectedIndices.length).toBe(1);
  });

  it('should reset menu', () => {
    component.resetMenu();
    expect(component.selectedMenuTitle).toBe('Main Menu');
    expect(component.menuStack.length).toBe(0);
    expect(component.SelectedTitleStack.length).toBe(0);
    expect(component.selectedIndices.length).toBe(0);
  });

  it('should go back in menu stack', () => {
    const prevMenu: MenuItem[] = [{ menuItemName: 'Prev', url: 'string', }];
    component.menuStack = [prevMenu];
    component.SelectedTitleStack = ['Main'];
    component.selectedIndices = [0];
    component.goBack();
    expect(component.currentMenu).toEqual(prevMenu);
  });

  it('should set language', () => {
    component.data[MenuKeys.LANGUAGE] = [{ lanCode: 'en', url: 'string', languageName: 'English' }];
    sessionStorageService.get.and.returnValue('John');
    spyOn(component, 'closeDropdown');
    spyOn(component, 'resetMenu');
    component.setLanguage('en');
    expect(component.selectedLanguage).toBe('English');
    expect(component.closeDropdown).toHaveBeenCalled();
    expect(component.resetMenu).toHaveBeenCalled();
  });

  it('should handle global keyboard escape', () => {
    component.isDropdownOpen = true;
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    spyOn(component, 'closeDropdown');
    component.handleGlobalKeyboard(event);
    expect(component.closeDropdown).toHaveBeenCalled();
  });

  it('should navigate with keyboard events', () => {
    component.currentMenu = [{ menuItemName: 'Test', url: 'string', }];
    component.isDropdownOpen = true;
    component.activeIndex = -1;
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    component.navigate(event);
    expect(component.activeIndex).toBe(0);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getMenuData on init', () => {
    menuService.getMenus.and.returnValue(of({} as MenuResponse));
    component.ngOnInit();
    expect(menuService.getMenus).toHaveBeenCalled();
  });

  it('should handle getMenuData error', () => {
    menuService.getMenus.and.returnValue(throwError(() => new Error('error')));
    component.ngOnInit();
    expect(utilityService.openSnackBar).toHaveBeenCalled();
  });

  it('should set language and reload page', () => {
    spyOn(window.location, 'reload');
    const lang = 'fr';
    component.setLanguage(lang);
    expect(cookieService.set).toHaveBeenCalled();
    expect(window.location.reload).toHaveBeenCalled();
  });

  it('should handle global keyboard Escape key', () => {
    const mockEvent = new KeyboardEvent('keydown', { key: 'Escape' });
    component.isDropdownOpen = true;
    component.handleGlobalKeyboard(mockEvent);
    expect(component.isDropdownOpen).toBeFalse();
  });


  it('should open submenu', () => {
    const menu = { children: [{}], menuItemName: 'Test' } as any;
    component.openSubmenu(menu, 0);
    expect(component.menuStack.length).toBe(1);
    expect(component.selectedMenuTitle).toBe('Test');
  });

  it('should reset menu', () => {
    component.resetMenu();
    expect(component.menuStack.length).toBe(0);
    expect(component.SelectedTitleStack.length).toBe(0);
  });

  it('should go back in menu stack', () => {
    component.menuStack.push([{menuItemName: 'Test', url: 'string'}]);
    component.SelectedTitleStack.push('Prev');
    component.goBack();
    expect(component.menuStack.length).toBe(0);
    expect(component.SelectedTitleStack.length).toBe(0);
  });

  it('should unsubscribe on destroy', () => {
    const unsubSpy = spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(unsubSpy).toHaveBeenCalled();
  });
});

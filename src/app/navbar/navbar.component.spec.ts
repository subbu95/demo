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
import { of, Subject, throwError } from 'rxjs';
import { MenuKeys, MenuResponse, SubMenuItem, LanguageMenuItem, ExternalMenuItem, MenuItem } from '../../models/common/menu-model';
import { SessionKeys } from '../../models/common/login-model';

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

  const subMenuSubject = new Subject<SubMenuItem[]>();
  const legacyMessageSubject = new Subject<void>();

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
      providers: [
        { provide: MenuService, useValue: jasmine.createSpyObj('MenuService', ['getMenus']) },
        { provide: SharedService, useValue: jasmine.createSpyObj('SharedService', [], { updateInstMenu$: subMenuSubject.asObservable(), userLogout: () => {} }) },
        { provide: SessionStorageService, useValue: jasmine.createSpyObj('SessionStorageService', ['get', 'set']) },
        { provide: LoaderService, useValue: jasmine.createSpyObj('LoaderService', ['showLoader', 'hideLoader']) },
        { provide: CookieService, useValue: jasmine.createSpyObj('CookieService', ['set']) },
        { provide: UtilityService, useValue: jasmine.createSpyObj('UtilityService', ['openSnackBar']) },
        { provide: Router, useValue: jasmine.createSpyObj('Router', ['navigateByUrl', 'navigate']) },
        { provide: LegacyComponentService, useValue: jasmine.createSpyObj('LegacyComponentService', [], { message$: legacyMessageSubject.asObservable(), legacyUrl: new Subject() }) }
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

    expect(loaderService.showLoader).toHaveBeenCalled();
    expect(menuService.getMenus).toHaveBeenCalled();
    expect(sessionStorageService.get).toHaveBeenCalledWith(SessionKeys.LANGUAGE_CODE);
    expect(loaderService.hideLoader).toHaveBeenCalled();
    flush();
  }));

  it('should handle getMenuData error', fakeAsync(() => {
    const errorResponse = {
      error: {
        error: 'Error occurred'
      }
    };
    menuService.getMenus.and.returnValue(throwError(() => errorResponse));

    component.getMenuData();
    tick();

    expect(utilityService.openSnackBar).toHaveBeenCalled();
    flush();
  }));

  it('should return correct menu key', () => {
    const result = component.getMenuKey(MenuKeys.INSTRUCTIONS);
    expect(result).toBe(MenuKeys.INSTRUCTIONS);
  });

  it('should redirect to dashboard', () => {
    component.redirectToDashboard();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('should redirect to external (POS)', () => {
    const mockItem: ExternalMenuItem = { url: 'https://example.com' };
    component.data[MenuKeys.POS] = mockItem;

    spyOn(component, 'navigateFromMenu');
    component.redirectToExternal(MenuKeys.POS);
    expect(component.navigateFromMenu).toHaveBeenCalledWith(mockItem.url);
  });

  it('should redirect to external (others)', () => {
    const mockItem: SubMenuItem[] = [{ menuItemName: 'Sub', url: 'string', children: [] }];
    component.data[MenuKeys.ADMINISTRATION] = mockItem;

    component.redirectToExternal(MenuKeys.ADMINISTRATION);
    expect(window.location.href).toBe(mockItem[0].url);
  });

  it('should get language menu items', () => {
    const items: LanguageMenuItem[] = [{ lanCode: 'en', url: 'string', languageName: 'English' }];
    component.data[MenuKeys.LANGUAGE] = items;
    const result = component.getLanguageMenuItems(MenuKeys.LANGUAGE);
    expect(result).toEqual(items);
  });

  it('should set language', () => {
    const items: LanguageMenuItem[] = [{ lanCode: 'en', url: 'string', languageName: 'English' }];
    sessionStorageService.get.and.returnValue('john');
    component.data[MenuKeys.LANGUAGE] = items;

    spyOn(component, 'closeDropdown');
    spyOn(component, 'resetMenu');

    component.setLanguage('en');

    expect(component.selectedLanguage).toBe('English');
    expect(cookieService.set).toHaveBeenCalled();
    expect(component.closeDropdown).toHaveBeenCalled();
    expect(component.resetMenu).toHaveBeenCalled();
  });

  it('should open and close main menu', () => {
    const button = {} as any;
    component.data[MenuKeys.LANGUAGE] = [{ lanCode: 'en', url: 'string', languageName: 'English' }];
    component.openMainMenu(MenuKeys.LANGUAGE, button);
    expect(component.isDropdownOpen).toBeTrue();

    component.closeDropdown();
    expect(component.isDropdownOpen).toBeFalse();
  });

  it('should open submenu', () => {
    const child: MenuItem = { menuItemName: 'Sub', url: 'string', children: [] };
    const item: MenuItem = { menuItemName: 'Main', url: 'string', children: [child] };
    component.currentMenu = [item];

    component.openSubmenu(item, 0);
    expect(component.menuStack.length).toBe(1);
    expect(component.selectedIndices).toContain(0);
  });

  it('should go back in menu stack', () => {
    const prevMenu: MenuItem[] = [{ menuItemName: 'Previous', url: 'string', }];
    component.menuStack = [prevMenu];
    component.SelectedTitleStack = ['Main'];
    component.goBack();
    expect(component.currentMenu).toEqual(prevMenu);
  });

  it('should navigate with keyboard events', () => {
    component.currentMenu = [{ menuItemName: 'Test', url: 'string', }];
    component.isDropdownOpen = true;

    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    component.navigate(event);
    expect(component.activeIndex).toBe(0);
  });

  it('should reset menu', () => {
    component.resetMenu();
    expect(component.selectedMenuTitle).toBe('Main Menu');
  });

  it('should handle global keyboard escape', () => {
    spyOn(component, 'closeDropdown');
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    component.handleGlobalKeyboard(event);
    expect(component.closeDropdown).toHaveBeenCalled();
  });

  it('should navigate from menu with kawaURL', () => {
    const url = 'test.action';
    component.navigateFromMenu(url);
    expect(router.navigateByUrl).toHaveBeenCalled();
  });

  it('should navigate from menu with external URL', () => {
    spyOn(window, 'open');
    component.navigateFromMenu('https://nielsenenterprise.com/path');
    expect(window.open).toHaveBeenCalled();
  });

  it('should logout user', () => {
    spyOn(sharedService, 'userLogout');
    component.userLogout(new Event('click'));
    expect(loaderService.showLoader).toHaveBeenCalled();
    expect(sharedService.userLogout).toHaveBeenCalled();
    expect(loaderService.hideLoader).toHaveBeenCalled();
  });

  it('should unsubscribe on destroy', () => {
    spyOn(component.subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });
});

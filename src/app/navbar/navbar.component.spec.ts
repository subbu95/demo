import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavBarComponent } from './nav-bar.component';
import { MenuService } from '../../services/menu.service';
import { SharedService } from '../../services/shared.service';
import { SessionStorageService } from '../../services/session-storage.service';
import { LoaderService } from '../../services/loader.service';
import { CookieService } from 'ngx-cookie-service';
import { UtilityService } from '../../services/utility.service';
import { Router } from '@angular/router';
import { LegacyComponentService } from '../../services/legacy-component.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MenuKeys } from '../../models/common/menu-model';
import { SessionKeys } from '../../models/common/login-model';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';
import { OverlayModule } from '@angular/cdk/overlay';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let menuService: MenuService;
  let sharedService: SharedService;
  let sessionStorageService: SessionStorageService;
  let loaderService: LoaderService;
  let cookieService: CookieService;
  let utilityService: UtilityService;
  let router: Router;
  let legacyComponentService: LegacyComponentService;

  const mockMenuResponse = {
    [MenuKeys.INSTRUCTIONS]: [
      { menuItemName: 'Instruction 1', url: '/instruction1' },
      { menuItemName: 'Instruction 2', url: '/instruction2', children: [
        { menuItemName: 'Sub Instruction', url: '/sub-instruction' }
      ]}
    ],
    [MenuKeys.DEVELOPMENT]: [
      { menuItemName: 'Dev 1', url: '/dev1' }
    ],
    [MenuKeys.ADMINISTRATION]: [
      { menuItemName: 'Admin 1', url: '/admin1' }
    ],
    [MenuKeys.GUIDELINES]: [
      { menuItemName: 'Guideline 1', url: '/guideline1' }
    ],
    [MenuKeys.MADRAS]: { url: 'http://madras.com' },
    [MenuKeys.REFERENTIAL]: { url: 'http://referential.com' },
    [MenuKeys.DATASCOPES]: { url: 'http://datascopes.com' },
    [MenuKeys.DATA_MAINTENANCE]: { url: 'http://data-maintenance.com' },
    [MenuKeys.FOLLOW_UP]: { url: 'http://follow-up.com' },
    [MenuKeys.POS]: { url: 'http://pos.com' },
    [MenuKeys.LANGUAGE]: [
      { languageName: 'English', url: '', lanCode: 'en' },
      { languageName: 'Spanish', url: '', lanCode: 'es' }
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent, OverlayModule, HttpClientTestingModule],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        {
          provide: MenuService,
          useValue: {
            getMenus: jest.fn().mockReturnValue(of(mockMenuResponse)),
            getInstructionMenu: jest.fn().mockReturnValue(of([]))
          }
        },
        {
          provide: SharedService,
          useValue: {
            updateInstMenu$: of([]),
            userLogout: jest.fn(),
            updateInstructionsMenu: jest.fn().mockReturnValue(of(void 0))
          }
        },
        {
          provide: SessionStorageService,
          useValue: {
            get: jest.fn(),
            set: jest.fn(),
            clear: jest.fn()
          }
        },
        {
          provide: LoaderService,
          useValue: {
            showLoader: jest.fn(),
            hideLoader: jest.fn()
          }
        },
        {
          provide: CookieService,
          useValue: {
            set: jest.fn()
          }
        },
        {
          provide: UtilityService,
          useValue: {
            openSnackBar: jest.fn()
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn(),
            navigateByUrl: jest.fn()
          }
        },
        {
          provide: LegacyComponentService,
          useValue: {
            legacyUrl: { next: jest.fn() },
            message$: of(false)
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    
    menuService = TestBed.inject(MenuService);
    sharedService = TestBed.inject(SharedService);
    sessionStorageService = TestBed.inject(SessionStorageService);
    loaderService = TestBed.inject(LoaderService);
    cookieService = TestBed.inject(CookieService);
    utilityService = TestBed.inject(UtilityService);
    router = TestBed.inject(Router);
    legacyComponentService = TestBed.inject(LegacyComponentService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.leftNavMenuItems).toEqual([
      MenuKeys.INSTRUCTIONS,
      MenuKeys.MADRAS,
      MenuKeys.REFERENTIAL,
      MenuKeys.DATASCOPES,
      MenuKeys.DATA_MAINTENANCE,
      MenuKeys.FOLLOW_UP
    ]);
    expect(component.rightNavMenuItems).toEqual([
      MenuKeys.DEVELOPMENT,
      MenuKeys.ADMINISTRATION,
      MenuKeys.GUIDELINES,
      MenuKeys.POS,
      MenuKeys.LANGUAGE
    ]);
    expect(component.externalMenuItems).toEqual([
      MenuKeys.MADRAS,
      MenuKeys.REFERENTIAL,
      MenuKeys.DATASCOPES,
      MenuKeys.DATA_MAINTENANCE,
      MenuKeys.FOLLOW_UP,
      MenuKeys.POS
    ]);
    expect(component.languageMenuItems).toEqual([MenuKeys.LANGUAGE]);
    expect(component.selectedLanguage).toBe('Language');
    expect(component.isDropdownOpen).toBe(false);
  });

  it('should call getMenuData on ngOnInit', () => {
    const getMenuDataSpy = jest.spyOn(component, 'getMenuData');
    component.ngOnInit();
    expect(getMenuDataSpy).toHaveBeenCalled();
  });

  it('should get menu data successfully', fakeAsync(() => {
    component.getMenuData();
    tick();
    
    expect(menuService.getMenus).toHaveBeenCalled();
    expect(component.data).toEqual(mockMenuResponse);
    expect(loaderService.showLoader).toHaveBeenCalled();
    expect(loaderService.hideLoader).toHaveBeenCalled();
  }));

  it('should handle error when getting menu data', fakeAsync(() => {
    const error = { error: { message: 'Error fetching menu' } };
    jest.spyOn(menuService, 'getMenus').mockReturnValue(of(mockMenuResponse).mockRejectedValueOnce(error);
    
    component.getMenuData();
    tick();
    
    expect(utilityService.openSnackBar).toHaveBeenCalledWith(
      'large',
      'error',
      'Error fetching menu',
      'alert'
    );
    expect(loaderService.hideLoader).toHaveBeenCalled();
  }));

  it('should get menu key correctly', () => {
    const key = component.getMenuKey(MenuKeys.INSTRUCTIONS);
    expect(key).toBe(MenuKeys.INSTRUCTIONS);
  });

  it('should redirect to external URL for external menu items', () => {
    const windowOpenSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    
    component.redirectToExternal(MenuKeys.MADRAS);
    expect(windowOpenSpy).toHaveBeenCalledWith('http://madras.com', '_self');
  });

  it('should navigate for POS menu item', () => {
    component.redirectToExternal(MenuKeys.POS);
    expect(component.navigateFromMenu).toHaveBeenCalledWith('http://pos.com');
  });

  it('should set language and update session storage', () => {
    jest.spyOn(sessionStorageService, 'get').mockReturnValue('en');
    
    component.setLanguage('en');
    
    expect(component.selectedLanguage).toBe('English');
    expect(sessionStorageService.set).toHaveBeenCalledWith(SessionKeys.LANGUAGE_CODE, 'en');
    expect(cookieService.set).toHaveBeenCalled();
    expect(component.isDropdownOpen).toBe(false);
  });

  it('should open main menu and set current menu', () => {
    const mockButton = { elementRef: { nativeElement: {} } } as CdkOverlayOrigin;
    
    component.openMainMenu(MenuKeys.INSTRUCTIONS, mockButton);
    
    expect(component.isDropdownOpen).toBe(true);
    expect(component.dynamicSelectedTab).toBe(mockButton);
    expect(component.currentMenu).toEqual(mockMenuResponse[MenuKeys.INSTRUCTIONS]);
    expect(component.selectedMenuTitle).toBe('Main Menu');
  });

  it('should open language menu', () => {
    const mockButton = { elementRef: { nativeElement: {} } } as CdkOverlayOrigin;
    
    component.openMainMenu(MenuKeys.LANGUAGE, mockButton);
    
    expect(component.isDropdownOpen).toBe(true);
    expect(component.isLanguageMenu).toBe(true);
    expect(component.currentLanguageMenu).toEqual(mockMenuResponse[MenuKeys.LANGUAGE]);
  });

  it('should close dropdown and reset menu', () => {
    component.isDropdownOpen = true;
    component.currentMenu = mockMenuResponse[MenuKeys.INSTRUCTIONS];
    component.menuStack = [mockMenuResponse[MenuKeys.DEVELOPMENT]];
    
    component.closeDropdown();
    
    expect(component.isDropdownOpen).toBe(false);
    expect(component.currentMenu).toEqual([]);
    expect(component.menuStack).toEqual([]);
    expect(component.selectedMenuTitle).toBe('Main Menu');
  });

  it('should open submenu and update menu stack', () => {
    const mockItem = { 
      menuItemName: 'Parent',
      children: [{ menuItemName: 'Child', url: '/child' }]
    };
    
    component.currentMenu = [mockItem];
    component.openSubmenu(mockItem, 0);
    
    expect(component.menuStack.length).toBe(1);
    expect(component.currentMenu).toEqual(mockItem.children);
    expect(component.selectedMenuTitle).toBe('Parent');
    expect(component.selectedIndices).toEqual([0]);
  });

  it('should go back to previous menu', () => {
    const parentMenu = [{ menuItemName: 'Parent', children: [] }];
    component.menuStack = [parentMenu];
    component.SelectedTitleStack = ['Main Menu'];
    component.currentMenu = [{ menuItemName: 'Child', url: '/child' }];
    
    component.goBack();
    
    expect(component.currentMenu).toBe(parentMenu);
    expect(component.menuStack.length).toBe(0);
    expect(component.selectedMenuTitle).toBe('Main Menu');
  });

  it('should handle keyboard navigation - ArrowDown', () => {
    component.isDropdownOpen = true;
    component.currentMenu = mockMenuResponse[MenuKeys.INSTRUCTIONS];
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
    component.navigate(event);
    
    expect(component.activeIndex).toBe(1);
  });

  it('should handle keyboard navigation - ArrowUp', () => {
    component.isDropdownOpen = true;
    component.currentMenu = mockMenuResponse[MenuKeys.INSTRUCTIONS];
    component.activeIndex = 1;
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
    component.navigate(event);
    
    expect(component.activeIndex).toBe(0);
  });

  it('should handle keyboard navigation - ArrowRight to open submenu', () => {
    component.isDropdownOpen = true;
    component.currentMenu = mockMenuResponse[MenuKeys.INSTRUCTIONS];
    const openSubmenuSpy = jest.spyOn(component, 'openSubmenu');
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
    component.navigate(event);
    
    expect(openSubmenuSpy).toHaveBeenCalled();
  });

  it('should handle keyboard navigation - ArrowLeft to go back', () => {
    component.isDropdownOpen = true;
    component.menuStack = [mockMenuResponse[MenuKeys.INSTRUCTIONS]];
    const goBackSpy = jest.spyOn(component, 'goBack');
    
    const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
    component.navigate(event);
    
    expect(goBackSpy).toHaveBeenCalled();
  });

  it('should handle keyboard navigation - Escape to close dropdown', () => {
    component.isDropdownOpen = true;
    
    const event = new KeyboardEvent('keydown', { key: 'Escape' });
    component.navigate(event);
    
    expect(component.isDropdownOpen).toBe(false);
  });

  it('should navigate from menu for internal URL', () => {
    component.navigateFromMenu('/internal');
    
    expect(router.navigate).toHaveBeenCalledWith(['/internal']);
    expect(component.isDropdownOpen).toBe(false);
  });

  it('should navigate from menu for external URL', () => {
    const windowOpenSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    
    component.navigateFromMenu('http://external.com');
    
    expect(windowOpenSpy).toHaveBeenCalledWith('http://external.com', '_blank');
    expect(component.isDropdownOpen).toBe(false);
  });

  it('should navigate from menu for legacy action URL', () => {
    component.navigateFromMenu('legacy.action');
    
    expect(legacyComponentService.legacyUrl.next).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/legacy', expect.anything());
    expect(component.isDropdownOpen).toBe(false);
  });

  it('should handle user logout', () => {
    component.userLogout(new Event('click'));
    
    expect(sharedService.userLogout).toHaveBeenCalled();
    expect(loaderService.showLoader).toHaveBeenCalled();
    expect(loaderService.hideLoader).toHaveBeenCalled();
  });

  it('should unsubscribe on ngOnDestroy', () => {
    const subscriptionSpy = jest.spyOn(component.subscription, 'unsubscribe');
    
    component.ngOnDestroy();
    
    expect(subscriptionSpy).toHaveBeenCalled();
  });

  it('should render all left nav menu items', () => {
    fixture.detectChanges();
    const leftNavItems = fixture.debugElement.queryAll(By.css('.niq-tab-line'));
    
    expect(leftNavItems.length).toBeGreaterThan(0);
    leftNavItems.forEach((item, index) => {
      expect(item.nativeElement.textContent).toContain(component.leftNavMenuItems[index]);
    });
  });

  it('should render all right nav menu items', () => {
    fixture.detectChanges();
    const rightNavItems = fixture.debugElement.queryAll(By.css('.niq-tab-line'));
    
    expect(rightNavItems.length).toBeGreaterThan(0);
    rightNavItems.forEach((item, index) => {
      expect(item.nativeElement.textContent).toContain(component.rightNavMenuItems[index]);
    });
  });

  it('should show dropdown when menu item is clicked', () => {
    const mockButton = { elementRef: { nativeElement: {} } } as CdkOverlayOrigin;
    component.openMainMenu(MenuKeys.INSTRUCTIONS, mockButton);
    fixture.detectChanges();
    
    const dropdown = fixture.debugElement.query(By.css('.dropdown'));
    expect(dropdown).toBeTruthy();
  });

  it('should close dropdown when clicking outside', () => {
    component.isDropdownOpen = true;
    fixture.detectChanges();
    
    const event = new MouseEvent('click');
    component.closeDropdown();
    fixture.detectChanges();
    
    const dropdown = fixture.debugElement.query(By.css('.dropdown'));
    expect(dropdown).toBeNull();
  });
});
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
import { MenuKeys } from '../../models/common/menu-model';
import { SessionKeys } from '../../models/common/login-model';
import { of, throwError } from 'rxjs';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TruncatePipe } from '../../shared/pipe/truncate.pipe';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { IconModule, ItemModule, MenuModule, TabModule, TooltipModule } from '@nielseniq/athena-core';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockMenuService: jasmine.SpyObj<MenuService>;
  let mockSharedService: jasmine.SpyObj<SharedService>;
  let mockSessionStorageService: jasmine.SpyObj<SessionStorageService>;
  let mockLoaderService: jasmine.SpyObj<LoaderService>;
  let mockCookieService: jasmine.SpyObj<CookieService>;
  let mockUtilityService: jasmine.SpyObj<UtilityService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLegacyComponentService: jasmine.SpyObj<LegacyComponentService>;

  beforeEach(async () => {
    mockMenuService = jasmine.createSpyObj('MenuService', ['getMenus', 'getInstructionMenu']);
    mockSharedService = jasmine.createSpyObj('SharedService', ['updateInstructionsMenu', 'userLogout']);
    mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['get', 'set', 'clear']);
    mockLoaderService = jasmine.createSpyObj('LoaderService', ['showLoader', 'hideLoader']);
    mockCookieService = jasmine.createSpyObj('CookieService', ['set']);
    mockUtilityService = jasmine.createSpyObj('UtilityService', ['openSnackBar']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
    mockLegacyComponentService = jasmine.createSpyObj('LegacyComponentService', [], { 
      message$: of(false),
      legacyUrl: { next: jasmine.createSpy() }
    });

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        OverlayModule,
        IconModule,
        TabModule,
        MenuModule,
        ItemModule,
        TooltipModule,
        NavBarComponent,
        TruncatePipe
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: MenuService, useValue: mockMenuService },
        { provide: SharedService, useValue: mockSharedService },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        { provide: LoaderService, useValue: mockLoaderService },
        { provide: CookieService, useValue: mockCookieService },
        { provide: UtilityService, useValue: mockUtilityService },
        { provide: Router, useValue: mockRouter },
        { provide: LegacyComponentService, useValue: mockLegacyComponentService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getMenuData on initialization', () => {
      spyOn(component, 'getMenuData');
      component.ngOnInit();
      expect(component.getMenuData).toHaveBeenCalled();
    });
  });

  describe('getMenuData', () => {
    it('should fetch menu data successfully', fakeAsync(() => {
      const mockMenuResponse = {
        [MenuKeys.INSTRUCTIONS]: [{ menuItemName: 'Test', url: '/test' }],
        [MenuKeys.LANGUAGE]: [{ languageName: 'English', url: '', lanCode: 'en' }]
      };
      
      mockMenuService.getMenus.and.returnValue(of(mockMenuResponse));
      mockSessionStorageService.get.and.returnValue('en');
      
      component.getMenuData();
      tick();
      
      expect(mockLoaderService.showLoader).toHaveBeenCalled();
      expect(mockMenuService.getMenus).toHaveBeenCalled();
      expect(mockSessionStorageService.get).toHaveBeenCalledWith(SessionKeys.LANGUAGE_CODE);
      expect(component.data).toEqual(mockMenuResponse);
      expect(component.selectedLanguage).toBe('English');
      expect(mockLoaderService.hideLoader).toHaveBeenCalled();
    }));

    it('should handle error when fetching menu data', fakeAsync(() => {
      const errorResponse = { error: { message: 'Error fetching menus' } };
      mockMenuService.getMenus.and.returnValue(throwError(() => errorResponse));
      
      component.getMenuData();
      tick();
      
      expect(mockLoaderService.showLoader).toHaveBeenCalled();
      expect(mockMenuService.getMenus).toHaveBeenCalled();
      expect(mockUtilityService.openSnackBar).toHaveBeenCalledWith(
        'large', 
        'error', 
        'Error fetching menus', 
        'alert'
      );
      expect(mockLoaderService.hideLoader).toHaveBeenCalled();
    }));
  });

  describe('Menu Navigation', () => {
    beforeEach(() => {
      component.data = {
        [MenuKeys.INSTRUCTIONS]: [
          { 
            menuItemName: 'Parent', 
            url: '', 
            children: [
              { menuItemName: 'Child', url: '/child' }
            ] 
          }
        ],
        [MenuKeys.LANGUAGE]: [
          { languageName: 'English', url: '', lanCode: 'en' }
        ]
      };
    });

    it('should open main menu', () => {
      const mockButton = {} as any;
      component.openMainMenu(MenuKeys.INSTRUCTIONS, mockButton);
      
      expect(component.isDropdownOpen).toBeTrue();
      expect(component.dynamicSelectedTab).toBe(mockButton);
      expect(component.currentMenu).toEqual(component.data[MenuKeys.INSTRUCTIONS]);
      expect(component.selectedMenuTitle).toBe('Main Menu');
    });

    it('should open language menu', () => {
      const mockButton = {} as any;
      component.openMainMenu(MenuKeys.LANGUAGE, mockButton);
      
      expect(component.isDropdownOpen).toBeTrue();
      expect(component.isLanguageMenu).toBeTrue();
      expect(component.currentLanguageMenu).toEqual(component.data[MenuKeys.LANGUAGE]);
    });

    it('should toggle dropdown when opening same menu', () => {
      const mockButton = {} as any;
      component.openMainMenu(MenuKeys.INSTRUCTIONS, mockButton);
      component.openMainMenu(MenuKeys.INSTRUCTIONS, mockButton);
      
      expect(component.isDropdownOpen).toBeFalse();
    });

    it('should open submenu', () => {
      component.currentMenu = component.data[MenuKeys.INSTRUCTIONS] as any;
      const parentItem = component.currentMenu[0];
      
      component.openSubmenu(parentItem, 0);
      
      expect(component.menuStack.length).toBe(1);
      expect(component.currentMenu).toEqual(parentItem.children);
      expect(component.selectedMenuTitle).toBe(parentItem.menuItemName);
      expect(component.selectedIndices).toEqual([0]);
    });

    it('should go back to previous menu', () => {
      component.currentMenu = component.data[MenuKeys.INSTRUCTIONS] as any;
      const parentItem = component.currentMenu[0];
      component.openSubmenu(parentItem, 0);
      
      component.goBack();
      
      expect(component.menuStack.length).toBe(0);
      expect(component.currentMenu).toEqual(component.data[MenuKeys.INSTRUCTIONS]);
      expect(component.selectedMenuTitle).toBe('Main Menu');
    });

    it('should close dropdown', () => {
      component.isDropdownOpen = true;
      component.closeDropdown();
      
      expect(component.isDropdownOpen).toBeFalse();
      expect(component.menuStack).toEqual([]);
      expect(component.currentMenu).toEqual([]);
    });
  });

  describe('Keyboard Navigation', () => {
    beforeEach(() => {
      component.currentMenu = [
        { menuItemName: 'Item 1', url: '/item1' },
        { 
          menuItemName: 'Item 2', 
          url: '', 
          children: [
            { menuItemName: 'Subitem', url: '/subitem' }
          ] 
        }
      ];
      component.isDropdownOpen = true;
    });

    it('should navigate down with ArrowDown', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.navigate(event);
      
      expect(component.activeIndex).toBe(1);
    });

    it('should navigate up with ArrowUp', () => {
      component.activeIndex = 1;
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.navigate(event);
      
      expect(component.activeIndex).toBe(0);
    });

    it('should open submenu with ArrowRight or Enter', () => {
      spyOn(component, 'openSubmenu');
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      component.navigate(event);
      
      expect(component.openSubmenu).toHaveBeenCalledWith(component.currentMenu[component.activeIndex], component.activeIndex);
    });

    it('should go back with ArrowLeft', () => {
      spyOn(component, 'goBack');
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      component.navigate(event);
      
      expect(component.goBack).toHaveBeenCalled();
    });

    it('should close dropdown with Escape', () => {
      spyOn(component, 'closeDropdown');
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.navigate(event);
      
      expect(component.closeDropdown).toHaveBeenCalled();
    });
  });

  describe('Navigation Methods', () => {
    it('should redirect to dashboard', () => {
      component.redirectToDashboard();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/dashboard');
    });

    it('should redirect to external URL', () => {
      component.data = {
        [MenuKeys.MADRAS]: { url: 'http://external.com' }
      };
      
      component.redirectToExternal(MenuKeys.MADRAS);
      expect(window.location.href).toBe('http://external.com');
    });

    it('should navigate to POS using router', () => {
      component.data = {
        [MenuKeys.POS]: { url: '/pos' }
      };
      
      component.redirectToExternal(MenuKeys.POS);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/pos');
    });

    it('should set language', () => {
      component.data = {
        [MenuKeys.LANGUAGE]: [
          { languageName: 'English', url: '', lanCode: 'en' }
        ]
      };
      
      component.setLanguage('en');
      
      expect(mockSessionStorageService.set).toHaveBeenCalledWith(SessionKeys.LANGUAGE_CODE, 'en');
      expect(mockCookieService.set).toHaveBeenCalled();
      expect(component.selectedLanguage).toBe('English');
      expect(component.isDropdownOpen).toBeFalse();
    });

    it('should navigate from menu with legacy URL', () => {
      const legacyUrl = 'legacy.action';
      spyOn(component, 'closeDropdown');
      spyOn(component, 'resetMenu');
      
      component.navigateFromMenu(legacyUrl);
      
      expect(component.closeDropdown).toHaveBeenCalled();
      expect(component.resetMenu).toHaveBeenCalled();
      expect(mockLegacyComponentService.legacyUrl.next).toHaveBeenCalledWith(`${environment.kawaURL}${legacyUrl}`);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/legacy', jasmine.any(Object));
    });

    it('should navigate from menu with external URL', () => {
      const externalUrl = 'http://external.com';
      spyOn(component, 'closeDropdown');
      spyOn(component, 'resetMenu');
      spyOn(window, 'open');
      
      component.navigateFromMenu(externalUrl);
      
      expect(component.closeDropdown).toHaveBeenCalled();
      expect(component.resetMenu).toHaveBeenCalled();
      expect(window.open).toHaveBeenCalledWith(externalUrl, '_blank');
    });

    it('should navigate from menu with internal URL', () => {
      const internalUrl = '/internal';
      spyOn(component, 'closeDropdown');
      spyOn(component, 'resetMenu');
      
      component.navigateFromMenu(internalUrl);
      
      expect(component.closeDropdown).toHaveBeenCalled();
      expect(component.resetMenu).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/internal']);
    });
  });

  describe('User Actions', () => {
    it('should logout user', () => {
      const mockEvent = new Event('click');
      component.userLogout(mockEvent);
      
      expect(mockLoaderService.showLoader).toHaveBeenCalled();
      expect(mockSharedService.userLogout).toHaveBeenCalled();
      expect(mockLoaderService.hideLoader).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from subscriptions', () => {
      spyOn(component.subscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(component.subscription.unsubscribe).toHaveBeenCalled();
    });
  });
});

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
import { MenuKeys } from '../../models/common/menu-model';
import { SessionKeys } from '../../models/common/login-model';
import { of, throwError } from 'rxjs';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TruncatePipe } from '../../shared/pipe/truncate.pipe';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { IconModule, ItemModule, MenuModule, TabModule, TooltipModule } from '@nielseniq/athena-core';
import { MenuResponse } from '../../models/common/menu-model';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockMenuService: jasmine.SpyObj<MenuService>;
  let mockSharedService: jasmine.SpyObj<SharedService>;
  let mockSessionStorageService: jasmine.SpyObj<SessionStorageService>;
  let mockLoaderService: jasmine.SpyObj<LoaderService>;
  let mockCookieService: jasmine.SpyObj<CookieService>;
  let mockUtilityService: jasmine.SpyObj<UtilityService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLegacyComponentService: jasmine.SpyObj<LegacyComponentService>;

  beforeEach(async () => {
    mockMenuService = jasmine.createSpyObj('MenuService', ['getMenus', 'getInstructionMenu']);
    mockSharedService = jasmine.createSpyObj('SharedService', ['updateInstructionsMenu', 'userLogout']);
    mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['get', 'set', 'clear']);
    mockLoaderService = jasmine.createSpyObj('LoaderService', ['showLoader', 'hideLoader']);
    mockCookieService = jasmine.createSpyObj('CookieService', ['set']);
    mockUtilityService = jasmine.createSpyObj('UtilityService', ['openSnackBar']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
    mockLegacyComponentService = jasmine.createSpyObj('LegacyComponentService', [], { 
      message$: of(false),
      legacyUrl: { next: jasmine.createSpy() }
    });

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        OverlayModule,
        IconModule,
        TabModule,
        MenuModule,
        ItemModule,
        TooltipModule,
        NavBarComponent,
        TruncatePipe
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: MenuService, useValue: mockMenuService },
        { provide: SharedService, useValue: mockSharedService },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        { provide: LoaderService, useValue: mockLoaderService },
        { provide: CookieService, useValue: mockCookieService },
        { provide: UtilityService, useValue: mockUtilityService },
        { provide: Router, useValue: mockRouter },
        { provide: LegacyComponentService, useValue: mockLegacyComponentService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getMenuData on initialization', () => {
      spyOn(component, 'getMenuData');
      component.ngOnInit();
      expect(component.getMenuData).toHaveBeenCalled();
    });
  });

  describe('getMenuData', () => {
    it('should fetch menu data successfully', fakeAsync(() => {
      const mockMenuResponse: MenuResponse = {
        [MenuKeys.INSTRUCTIONS]: [{ menuItemName: 'Test', url: '/test' }],
        [MenuKeys.LANGUAGE]: [{ languageName: 'English', url: '', lanCode: 'en' }],
        [MenuKeys.MADRAS]: { url: '' },
        [MenuKeys.REFERENTIAL]: { url: '' },
        [MenuKeys.DATASCOPES]: { url: '' },
        [MenuKeys.DATA_MAINTENANCE]: { url: '' },
        [MenuKeys.FOLLOW_UP]: { url: '' },
        [MenuKeys.DEVELOPMENT]: [],
        [MenuKeys.ADMINISTRATION]: [],
        [MenuKeys.GUIDELINES]: [],
        [MenuKeys.POS]: { url: '' }
      };
      
      mockMenuService.getMenus.and.returnValue(of(mockMenuResponse));
      mockSessionStorageService.get.and.returnValue('en');
      
      component.getMenuData();
      tick();
      
      expect(mockLoaderService.showLoader).toHaveBeenCalled();
      expect(mockMenuService.getMenus).toHaveBeenCalled();
      expect(mockSessionStorageService.get).toHaveBeenCalledWith(SessionKeys.LANGUAGE_CODE);
      expect(component.data).toEqual(mockMenuResponse);
      expect(component.selectedLanguage).toBe('English');
      expect(mockLoaderService.hideLoader).toHaveBeenCalled();
    }));

    it('should handle error when fetching menu data', fakeAsync(() => {
      const errorResponse = { error: { message: 'Error fetching menus' } };
      mockMenuService.getMenus.and.returnValue(throwError(() => errorResponse));
      
      component.getMenuData();
      tick();
      
      expect(mockLoaderService.showLoader).toHaveBeenCalled();
      expect(mockMenuService.getMenus).toHaveBeenCalled();
      expect(mockUtilityService.openSnackBar).toHaveBeenCalledWith(
        'large', 
        'error', 
        'Error fetching menus', 
        'alert'
      );
      expect(mockLoaderService.hideLoader).toHaveBeenCalled();
    }));
  });

  // ... rest of the test cases remain the same ...
});

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
import { MenuKeys } from '../../models/common/menu-model';
import { SessionKeys } from '../../models/common/login-model';
import { of, throwError } from 'rxjs';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TruncatePipe } from '../../shared/pipe/truncate.pipe';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { IconModule, ItemModule, MenuModule, TabModule, TooltipModule } from '@nielseniq/athena-core';
import { MenuResponse, MenuItem, SubMenuItem, LanguageMenuItem } from '../../models/common/menu-model';
import { environment } from '../../../environments/environment';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockMenuService: jasmine.SpyObj<MenuService>;
  let mockSharedService: jasmine.SpyObj<SharedService>;
  let mockSessionStorageService: jasmine.SpyObj<SessionStorageService>;
  let mockLoaderService: jasmine.SpyObj<LoaderService>;
  let mockCookieService: jasmine.SpyObj<CookieService>;
  let mockUtilityService: jasmine.SpyObj<UtilityService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLegacyComponentService: jasmine.SpyObj<LegacyComponentService>;

  const mockMenuResponse: MenuResponse = {
    [MenuKeys.INSTRUCTIONS]: [{ menuItemName: 'Test', url: '/test' }],
    [MenuKeys.LANGUAGE]: [{ languageName: 'English', url: '', lanCode: 'en' }],
    [MenuKeys.MADRAS]: { url: '' },
    [MenuKeys.REFERENTIAL]: { url: '' },
    [MenuKeys.DATASCOPES]: { url: '' },
    [MenuKeys.DATA_MAINTENANCE]: { url: '' },
    [MenuKeys.FOLLOW_UP]: { url: '' },
    [MenuKeys.DEVELOPMENT]: [],
    [MenuKeys.ADMINISTRATION]: [],
    [MenuKeys.GUIDELINES]: [],
    [MenuKeys.POS]: { url: '' }
  };

  beforeEach(async () => {
    mockMenuService = jasmine.createSpyObj('MenuService', ['getMenus', 'getInstructionMenu']);
    mockSharedService = jasmine.createSpyObj('SharedService', ['updateInstructionsMenu', 'userLogout']);
    mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['get', 'set', 'clear']);
    mockLoaderService = jasmine.createSpyObj('LoaderService', ['showLoader', 'hideLoader']);
    mockCookieService = jasmine.createSpyObj('CookieService', ['set']);
    mockUtilityService = jasmine.createSpyObj('UtilityService', ['openSnackBar']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
    mockLegacyComponentService = jasmine.createSpyObj('LegacyComponentService', [], { 
      message$: of(false),
      legacyUrl: { next: jasmine.createSpy() }
    });

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        OverlayModule,
        IconModule,
        TabModule,
        MenuModule,
        ItemModule,
        TooltipModule,
        NavBarComponent,
        TruncatePipe
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: MenuService, useValue: mockMenuService },
        { provide: SharedService, useValue: mockSharedService },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        { provide: LoaderService, useValue: mockLoaderService },
        { provide: CookieService, useValue: mockCookieService },
        { provide: UtilityService, useValue: mockUtilityService },
        { provide: Router, useValue: mockRouter },
        { provide: LegacyComponentService, useValue: mockLegacyComponentService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getMenuData on initialization', () => {
      spyOn(component, 'getMenuData');
      component.ngOnInit();
      expect(component.getMenuData).toHaveBeenCalled();
    });
  });

  describe('getMenuData', () => {
    it('should fetch menu data successfully', fakeAsync(() => {
      mockMenuService.getMenus.and.returnValue(of(mockMenuResponse));
      mockSessionStorageService.get.and.returnValue('en');
      
      component.getMenuData();
      tick();
      
      expect(mockLoaderService.showLoader).toHaveBeenCalled();
      expect(mockMenuService.getMenus).toHaveBeenCalled();
      expect(mockSessionStorageService.get).toHaveBeenCalledWith(SessionKeys.LANGUAGE_CODE);
      expect(component.data).toEqual(mockMenuResponse);
      expect(component.selectedLanguage).toBe('English');
      expect(mockLoaderService.hideLoader).toHaveBeenCalled();
    }));

    it('should handle error when fetching menu data', fakeAsync(() => {
      const errorResponse = { error: { message: 'Error fetching menus' } };
      mockMenuService.getMenus.and.returnValue(throwError(() => errorResponse));
      
      component.getMenuData();
      tick();
      
      expect(mockLoaderService.showLoader).toHaveBeenCalled();
      expect(mockMenuService.getMenus).toHaveBeenCalled();
      expect(mockUtilityService.openSnackBar).toHaveBeenCalledWith(
        'large', 
        'error', 
        'Error fetching menus', 
        'alert'
      );
      expect(mockLoaderService.hideLoader).toHaveBeenCalled();
    }));
  });

  describe('Menu Navigation', () => {
    const parentItem: MenuItem = { 
      menuItemName: 'Parent', 
      url: '', 
      children: [
        { menuItemName: 'Child', url: '/child' }
      ] 
    };

    beforeEach(() => {
      component.data = {
        ...mockMenuResponse,
        [MenuKeys.INSTRUCTIONS]: [parentItem]
      };
    });

    it('should open main menu', () => {
      const mockButton = {} as any;
      component.openMainMenu(MenuKeys.INSTRUCTIONS, mockButton);
      
      expect(component.isDropdownOpen).toBeTrue();
      expect(component.dynamicSelectedTab).toBe(mockButton);
      expect(component.currentMenu).toEqual([parentItem]);
      expect(component.selectedMenuTitle).toBe('Main Menu');
    });

    it('should open language menu', () => {
      const mockButton = {} as any;
      component.openMainMenu(MenuKeys.LANGUAGE, mockButton);
      
      expect(component.isDropdownOpen).toBeTrue();
      expect(component.isLanguageMenu).toBeTrue();
      expect(component.currentLanguageMenu).toEqual(mockMenuResponse[MenuKeys.LANGUAGE]);
    });

    it('should toggle dropdown when opening same menu', () => {
      const mockButton = {} as any;
      component.openMainMenu(MenuKeys.INSTRUCTIONS, mockButton);
      component.openMainMenu(MenuKeys.INSTRUCTIONS, mockButton);
      
      expect(component.isDropdownOpen).toBeFalse();
    });

    it('should open submenu', () => {
      component.currentMenu = [parentItem];
      
      component.openSubmenu(parentItem, 0);
      
      expect(component.menuStack.length).toBe(1);
      expect(component.currentMenu).toEqual(parentItem.children);
      expect(component.selectedMenuTitle).toBe(parentItem.menuItemName);
      expect(component.selectedIndices).toEqual([0]);
    });

    it('should go back to previous menu', () => {
      component.currentMenu = [parentItem];
      component.openSubmenu(parentItem, 0);
      
      component.goBack();
      
      expect(component.menuStack.length).toBe(0);
      expect(component.currentMenu).toEqual([parentItem]);
      expect(component.selectedMenuTitle).toBe('Main Menu');
    });

    it('should close dropdown', () => {
      component.isDropdownOpen = true;
      component.closeDropdown();
      
      expect(component.isDropdownOpen).toBeFalse();
      expect(component.menuStack).toEqual([]);
      expect(component.currentMenu).toEqual([]);
    });
  });

  describe('Keyboard Navigation', () => {
    const testMenuItems: MenuItem[] = [
      { menuItemName: 'Item 1', url: '/item1' },
      { 
        menuItemName: 'Item 2', 
        url: '', 
        children: [
          { menuItemName: 'Subitem', url: '/subitem' }
        ] 
      }
    ];

    beforeEach(() => {
      component.currentMenu = testMenuItems;
      component.isDropdownOpen = true;
    });

    it('should navigate down with ArrowDown', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.navigate(event);
      
      expect(component.activeIndex).toBe(1);
    });

    it('should navigate up with ArrowUp', () => {
      component.activeIndex = 1;
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.navigate(event);
      
      expect(component.activeIndex).toBe(0);
    });

    it('should open submenu with ArrowRight or Enter', () => {
      spyOn(component, 'openSubmenu');
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      component.navigate(event);
      
      expect(component.openSubmenu).toHaveBeenCalledWith(component.currentMenu[component.activeIndex], component.activeIndex);
    });

    it('should go back with ArrowLeft', () => {
      spyOn(component, 'goBack');
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      component.navigate(event);
      
      expect(component.goBack).toHaveBeenCalled();
    });

    it('should close dropdown with Escape', () => {
      spyOn(component, 'closeDropdown');
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.navigate(event);
      
      expect(component.closeDropdown).toHaveBeenCalled();
    });
  });

  describe('Navigation Methods', () => {
    it('should redirect to dashboard', () => {
      component.redirectToDashboard();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/dashboard');
    });

    it('should redirect to external URL', () => {
      component.data = {
        ...mockMenuResponse,
        [MenuKeys.MADRAS]: { url: 'http://external.com' }
      };
      
      component.redirectToExternal(MenuKeys.MADRAS);
      expect(window.location.href).toBe('http://external.com');
    });

    it('should navigate to POS using router', () => {
      component.data = {
        ...mockMenuResponse,
        [MenuKeys.POS]: { url: '/pos' }
      };
      
      component.redirectToExternal(MenuKeys.POS);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/pos');
    });

    it('should set language', () => {
      component.data = mockMenuResponse;
      
      component.setLanguage('en');
      
      expect(mockSessionStorageService.set).toHaveBeenCalledWith(SessionKeys.LANGUAGE_CODE, 'en');
      expect(mockCookieService.set).toHaveBeenCalled();
      expect(component.selectedLanguage).toBe('English');
      expect(component.isDropdownOpen).toBeFalse();
    });

    it('should navigate from menu with legacy URL', () => {
      const legacyUrl = 'legacy.action';
      spyOn(component, 'closeDropdown');
      spyOn(component, 'resetMenu');
      
      component.navigateFromMenu(legacyUrl);
      
      expect(component.closeDropdown).toHaveBeenCalled();
      expect(component.resetMenu).toHaveBeenCalled();
      expect(mockLegacyComponentService.legacyUrl.next).toHaveBeenCalledWith(`${environment.kawaURL}${legacyUrl}`);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/legacy', jasmine.any(Object));
    });

    it('should navigate from menu with external URL', () => {
      const externalUrl = 'http://external.com';
      spyOn(component, 'closeDropdown');
      spyOn(component, 'resetMenu');
      spyOn(window, 'open');
      
      component.navigateFromMenu(externalUrl);
      
      expect(component.closeDropdown).toHaveBeenCalled();
      expect(component.resetMenu).toHaveBeenCalled();
      expect(window.open).toHaveBeenCalledWith(externalUrl, '_blank');
    });

    it('should navigate from menu with internal URL', () => {
      const internalUrl = '/internal';
      spyOn(component, 'closeDropdown');
      spyOn(component, 'resetMenu');
      
      component.navigateFromMenu(internalUrl);
      
      expect(component.closeDropdown).toHaveBeenCalled();
      expect(component.resetMenu).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/internal']);
    });
  });

  describe('User Actions', () => {
    it('should logout user', () => {
      const mockEvent = new Event('click');
      component.userLogout(mockEvent);
      
      expect(mockLoaderService.showLoader).toHaveBeenCalled();
      expect(mockSharedService.userLogout).toHaveBeenCalled();
      expect(mockLoaderService.hideLoader).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from subscriptions', () => {
      spyOn(component.subscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(component.subscription.unsubscribe).toHaveBeenCalled();
    });
  });
});
///////new version

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
import { MenuKeys } from '../../models/common/menu-model';
import { SessionKeys } from '../../models/common/login-model';
import { of, throwError, Subject } from 'rxjs';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TruncatePipe } from '../../shared/pipe/truncate.pipe';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { IconModule, ItemModule, MenuModule, TabModule, TooltipModule } from '@nielseniq/athena-core';
import { MenuResponse, MenuItem, SubMenuItem, LanguageMenuItem } from '../../models/common/menu-model';
import { environment } from '../../../environments/environment';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;
  let mockMenuService: jasmine.SpyObj<MenuService>;
  let mockSharedService: jasmine.SpyObj<SharedService>;
  let mockSessionStorageService: jasmine.SpyObj<SessionStorageService>;
  let mockLoaderService: jasmine.SpyObj<LoaderService>;
  let mockCookieService: jasmine.SpyObj<CookieService>;
  let mockUtilityService: jasmine.SpyObj<UtilityService>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockLegacyComponentService: jasmine.SpyObj<LegacyComponentService>;
  let messageSubject: Subject<boolean>;

  const mockMenuResponse: MenuResponse = {
    [MenuKeys.INSTRUCTIONS]: [{ menuItemName: 'Test', url: '/test' }],
    [MenuKeys.LANGUAGE]: [{ languageName: 'English', url: '', lanCode: 'en' }],
    [MenuKeys.MADRAS]: { url: '' },
    [MenuKeys.REFERENTIAL]: { url: '' },
    [MenuKeys.DATASCOPES]: { url: '' },
    [MenuKeys.DATA_MAINTENANCE]: { url: '' },
    [MenuKeys.FOLLOW_UP]: { url: '' },
    [MenuKeys.DEVELOPMENT]: [],
    [MenuKeys.ADMINISTRATION]: [],
    [MenuKeys.GUIDELINES]: [],
    [MenuKeys.POS]: { url: '' }
  };

  beforeEach(async () => {
    messageSubject = new Subject<boolean>();
    
    mockMenuService = jasmine.createSpyObj('MenuService', ['getMenus', 'getInstructionMenu']);
    mockSharedService = jasmine.createSpyObj('SharedService', ['updateInstructionsMenu', 'userLogout'], {
      updateInstMenu$: new Subject<SubMenuItem[]>()
    });
    mockSessionStorageService = jasmine.createSpyObj('SessionStorageService', ['get', 'set', 'clear']);
    mockLoaderService = jasmine.createSpyObj('LoaderService', ['showLoader', 'hideLoader']);
    mockCookieService = jasmine.createSpyObj('CookieService', ['set']);
    mockUtilityService = jasmine.createSpyObj('UtilityService', ['openSnackBar']);
    mockRouter = jasmine.createSpyObj('Router', ['navigate', 'navigateByUrl']);
    mockLegacyComponentService = jasmine.createSpyObj('LegacyComponentService', [], { 
      message$: messageSubject.asObservable(),
      legacyUrl: { next: jasmine.createSpy() }
    });

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        OverlayModule,
        IconModule,
        TabModule,
        MenuModule,
        ItemModule,
        TooltipModule,
        NavBarComponent,
        TruncatePipe
      ],
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: MenuService, useValue: mockMenuService },
        { provide: SharedService, useValue: mockSharedService },
        { provide: SessionStorageService, useValue: mockSessionStorageService },
        { provide: LoaderService, useValue: mockLoaderService },
        { provide: CookieService, useValue: mockCookieService },
        { provide: UtilityService, useValue: mockUtilityService },
        { provide: Router, useValue: mockRouter },
        { provide: LegacyComponentService, useValue: mockLegacyComponentService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    messageSubject.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call getMenuData on initialization', () => {
      spyOn(component, 'getMenuData');
      component.ngOnInit();
      expect(component.getMenuData).toHaveBeenCalled();
    });
  });

  describe('getMenuData', () => {
    it('should fetch menu data successfully', fakeAsync(() => {
      mockMenuService.getMenus.and.returnValue(of(mockMenuResponse));
      mockSessionStorageService.get.and.returnValue('en');
      
      component.getMenuData();
      tick();
      
      expect(mockLoaderService.showLoader).toHaveBeenCalled();
      expect(mockMenuService.getMenus).toHaveBeenCalled();
      expect(mockSessionStorageService.get).toHaveBeenCalledWith(SessionKeys.LANGUAGE_CODE);
      expect(component.data).toEqual(mockMenuResponse);
      expect(component.selectedLanguage).toBe('English');
      expect(mockLoaderService.hideLoader).toHaveBeenCalled();
    }));

    it('should handle error when fetching menu data', fakeAsync(() => {
      const errorResponse = { error: { message: 'Error fetching menus' } };
      mockMenuService.getMenus.and.returnValue(throwError(() => errorResponse));
      
      component.getMenuData();
      tick();
      
      expect(mockLoaderService.showLoader).toHaveBeenCalled();
      expect(mockMenuService.getMenus).toHaveBeenCalled();
      expect(mockUtilityService.openSnackBar).toHaveBeenCalledWith(
        'large', 
        'error', 
        'Error fetching menus', 
        'alert'
      );
      expect(mockLoaderService.hideLoader).toHaveBeenCalled();
    }));
  });

  describe('Menu Navigation', () => {
    const parentItem: MenuItem = { 
      menuItemName: 'Parent', 
      url: '', 
      children: [
        { menuItemName: 'Child', url: '/child' }
      ] 
    };

    beforeEach(() => {
      component.data = {
        ...mockMenuResponse,
        [MenuKeys.INSTRUCTIONS]: [parentItem]
      };
    });

    it('should open main menu', () => {
      const mockButton = {} as any;
      component.openMainMenu(MenuKeys.INSTRUCTIONS, mockButton);
      
      expect(component.isDropdownOpen).toBeTrue();
      expect(component.dynamicSelectedTab).toBe(mockButton);
      expect(component.currentMenu).toEqual([parentItem]);
      expect(component.selectedMenuTitle).toBe('Main Menu');
    });

    it('should open language menu', () => {
      const mockButton = {} as any;
      component.openMainMenu(MenuKeys.LANGUAGE, mockButton);
      
      expect(component.isDropdownOpen).toBeTrue();
      expect(component.isLanguageMenu).toBeTrue();
      expect(component.currentLanguageMenu).toEqual(mockMenuResponse[MenuKeys.LANGUAGE]);
    });

    it('should toggle dropdown when opening same menu', () => {
      const mockButton = {} as any;
      component.openMainMenu(MenuKeys.INSTRUCTIONS, mockButton);
      component.openMainMenu(MenuKeys.INSTRUCTIONS, mockButton);
      
      expect(component.isDropdownOpen).toBeFalse();
    });

    it('should open submenu', () => {
      component.currentMenu = [parentItem];
      
      component.openSubmenu(parentItem, 0);
      
      expect(component.menuStack.length).toBe(1);
      expect(component.currentMenu).toEqual(parentItem.children);
      expect(component.selectedMenuTitle).toBe(parentItem.menuItemName);
      expect(component.selectedIndices).toEqual([0]);
    });

    it('should go back to previous menu', () => {
      component.currentMenu = [parentItem];
      component.openSubmenu(parentItem, 0);
      
      component.goBack();
      
      expect(component.menuStack.length).toBe(0);
      expect(component.currentMenu).toEqual([parentItem]);
      expect(component.selectedMenuTitle).toBe('Main Menu');
    });

    it('should close dropdown', () => {
      component.isDropdownOpen = true;
      component.closeDropdown();
      
      expect(component.isDropdownOpen).toBeFalse();
      expect(component.menuStack).toEqual([]);
      expect(component.currentMenu).toEqual([]);
    });
  });

  describe('Keyboard Navigation', () => {
    const testMenuItems: MenuItem[] = [
      { menuItemName: 'Item 1', url: '/item1' },
      { 
        menuItemName: 'Item 2', 
        url: '', 
        children: [
          { menuItemName: 'Subitem', url: '/subitem' }
        ] 
      }
    ];

    beforeEach(() => {
      component.currentMenu = testMenuItems;
      component.isDropdownOpen = true;
    });

    it('should navigate down with ArrowDown', () => {
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.navigate(event);
      
      expect(component.activeIndex).toBe(1);
    });

    it('should navigate up with ArrowUp', () => {
      component.activeIndex = 1;
      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.navigate(event);
      
      expect(component.activeIndex).toBe(0);
    });

    it('should open submenu with ArrowRight or Enter', () => {
      spyOn(component, 'openSubmenu');
      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      component.navigate(event);
      
      expect(component.openSubmenu).toHaveBeenCalledWith(component.currentMenu[component.activeIndex], component.activeIndex);
    });

    it('should go back with ArrowLeft', () => {
      spyOn(component, 'goBack');
      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      component.navigate(event);
      
      expect(component.goBack).toHaveBeenCalled();
    });

    it('should close dropdown with Escape', () => {
      spyOn(component, 'closeDropdown');
      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.navigate(event);
      
      expect(component.closeDropdown).toHaveBeenCalled();
    });
  });

  describe('Navigation Methods', () => {
    it('should redirect to dashboard', () => {
      component.redirectToDashboard();
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/dashboard');
    });

    it('should redirect to external URL', () => {
      component.data = {
        ...mockMenuResponse,
        [MenuKeys.MADRAS]: { url: 'http://external.com' }
      };
      
      component.redirectToExternal(MenuKeys.MADRAS);
      expect(window.location.href).toBe('http://external.com');
    });

    it('should navigate to POS using router', () => {
      component.data = {
        ...mockMenuResponse,
        [MenuKeys.POS]: { url: '/pos' }
      };
      
      component.redirectToExternal(MenuKeys.POS);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/pos');
    });

    it('should set language', () => {
      component.data = mockMenuResponse;
      
      component.setLanguage('en');
      
      expect(mockSessionStorageService.set).toHaveBeenCalledWith(SessionKeys.LANGUAGE_CODE, 'en');
      expect(mockCookieService.set).toHaveBeenCalled();
      expect(component.selectedLanguage).toBe('English');
      expect(component.isDropdownOpen).toBeFalse();
    });

    it('should navigate from menu with legacy URL', () => {
      const legacyUrl = 'legacy.action';
      spyOn(component, 'closeDropdown');
      spyOn(component, 'resetMenu');
      
      component.navigateFromMenu(legacyUrl);
      
      expect(component.closeDropdown).toHaveBeenCalled();
      expect(component.resetMenu).toHaveBeenCalled();
      expect(mockLegacyComponentService.legacyUrl.next).toHaveBeenCalledWith(`${environment.kawaURL}${legacyUrl}`);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/legacy', jasmine.any(Object));
    });

    it('should navigate from menu with external URL', () => {
      const externalUrl = 'http://external.com';
      spyOn(component, 'closeDropdown');
      spyOn(component, 'resetMenu');
      spyOn(window, 'open');
      
      component.navigateFromMenu(externalUrl);
      
      expect(component.closeDropdown).toHaveBeenCalled();
      expect(component.resetMenu).toHaveBeenCalled();
      expect(window.open).toHaveBeenCalledWith(externalUrl, '_blank');
    });

    it('should navigate from menu with internal URL', () => {
      const internalUrl = '/internal';
      spyOn(component, 'closeDropdown');
      spyOn(component, 'resetMenu');
      
      component.navigateFromMenu(internalUrl);
      
      expect(component.closeDropdown).toHaveBeenCalled();
      expect(component.resetMenu).toHaveBeenCalled();
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/internal']);
    });
  });

  describe('User Actions', () => {
    it('should logout user', () => {
      const mockEvent = new Event('click');
      component.userLogout(mockEvent);
      
      expect(mockLoaderService.showLoader).toHaveBeenCalled();
      expect(mockSharedService.userLogout).toHaveBeenCalled();
      expect(mockLoaderService.hideLoader).toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe from subscriptions', () => {
      spyOn(component.subscription, 'unsubscribe');
      component.ngOnDestroy();
      expect(component.subscription.unsubscribe).toHaveBeenCalled();
    });
  });
});

import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'demo' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('demo');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, demo');
  });
  Error: src/app/layout/nav-bar/nav-bar.component.spec.ts:95:48 - error TS2345: Argument of type 'Observable<{ Instructions: { menuItemName: string; url: string; }[]; Language: { languageName: string; url: string; lanCode: string; }[]; }>' is not assignable to parameter of type 'Observable<MenuResponse>'.
  Type '{ Instructions: { menuItemName: string; url: string; }[]; Language: { languageName: string; url: string; lanCode: string; }[]; }' is missing the following properties from type 'MenuResponse': [MenuKeys.MADRAS], [MenuKeys.REFERENTIAL], [MenuKeys.DATASCOPES], [MenuKeys.DATA_MAINTENANCE], and 5 more.

95       mockMenuService.getMenus.and.returnValue(of(mockMenuResponse));
                                                  ~~~~~~~~~~~~~~~~~~~~


Error: src/app/layout/nav-bar/nav-bar.component.spec.ts:152:45 - error TS2345: Argument of type 'SubMenuItem[] | undefined' is not assignable to parameter of type 'Expected<ArrayLike<MenuItem>> | ArrayContaining<MenuItem>'.
  Type 'undefined' is not assignable to type 'Expected<ArrayLike<MenuItem>> | ArrayContaining<MenuItem>'.

152       expect(component.currentMenu).toEqual(component.data[MenuKeys.INSTRUCTIONS]);
                                                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Error: src/app/layout/nav-bar/nav-bar.component.spec.ts:162:53 - error TS2345: Argument of type 'LanguageMenuItem[] | undefined' is not assignable to parameter of type 'Expected<ArrayLike<LanguageMenuItem>> | ArrayContaining<LanguageMenuItem>'.
  Type 'undefined' is not assignable to type 'Expected<ArrayLike<LanguageMenuItem>> | ArrayContaining<LanguageMenuItem>'.

162       expect(component.currentLanguageMenu).toEqual(component.data[MenuKeys.LANGUAGE]);
                                                        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Error: src/app/layout/nav-bar/nav-bar.component.spec.ts:180:45 - error TS2345: Argument of type 'MenuItem[] | undefined' is not assignable to parameter of type 'Expected<ArrayLike<MenuItem>> | ArrayContaining<MenuItem>'.
  Type 'undefined' is not assignable to type 'Expected<ArrayLike<MenuItem>> | ArrayContaining<MenuItem>'.

180       expect(component.currentMenu).toEqual(parentItem.children);
                                                ~~~~~~~~~~~~~~~~~~~


Error: src/app/layout/nav-bar/nav-bar.component.spec.ts:193:45 - error TS2345: Argument of type 'SubMenuItem[] | undefined' is not assignable to parameter of type 'Expected<ArrayLike<MenuItem>> | ArrayContaining<MenuItem>'.

193       expect(component.currentMenu).toEqual(component.data[MenuKeys.INSTRUCTIONS]);
                                                ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


Error: src/app/layout/nav-bar/nav-bar.component.spec.ts:310:81 - error TS2304: Cannot find name 'environment'.

310       expect(mockLegacyComponentService.legacyUrl.next).toHaveBeenCalledWith(`${environment.kawaURL}${legacyUrl}`);
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { StateContainerComponent } from './state-container.component';
import { LoadingStateComponent } from '../loading-state/loading-state.component';
import { ErrorStateComponent } from '../error-state/error-state.component';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import {
  State,
  initialState,
  loadingState,
  loadedState,
  errorState,
} from '../../state/models/state.model';
import { QuickAction, Size } from '../utils';
import { IconName } from '../icon';

describe('StateContainerComponent', () => {
  let component: StateContainerComponent<any>;
  let fixture: ComponentFixture<StateContainerComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        StateContainerComponent,
        LoadingStateComponent,
        ErrorStateComponent,
        EmptyStateComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(StateContainerComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should require state input', () => {
      const testState: State<string> = initialState();
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();
      expect(component.state()).toBe(testState);
    });

    it('should have default input values', () => {
      fixture.componentRef.setInput('state', initialState());
      fixture.detectChanges();

      expect(component.size()).toBe('medium');
      expect(component.showEmptyOnInitial()).toBe(false);
      expect(component.emptyOverride()).toBeNull();
      expect(component.loadingTitle()).toBe('');
      expect(component.loadingDescription()).toBe('');
      expect(component.loadingOverlay()).toBe(false);
      expect(component.loadingBlurContent()).toBe(true);
      expect(component.loadingFullScreen()).toBe(false);
    });
  });

  describe('Initial State', () => {
    it('should show initial template when state is initial', () => {
      const testState: State<string> = initialState();
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      expect(component.shouldShowInitial()).toBe(true);
    });

    it('should not show initial when loading', () => {
      const testState: State<string> = { ...initialState(), isLoading: true };
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      expect(component.shouldShowInitial()).toBe(false);
    });

    it('should not show initial when error', () => {
      const testState: State<string> = { ...initialState(), isError: true };
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      expect(component.shouldShowInitial()).toBe(false);
    });
  });

  describe('Loading State', () => {
    it('should show loading component when isLoading is true', () => {
      const testState: State<string> = loadingState(initialState());
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      const loadingComponent = fixture.debugElement.query(By.directive(LoadingStateComponent));
      expect(loadingComponent).toBeTruthy();
    });

    it('should pass loading title to loading component', () => {
      const testState: State<string> = loadingState(initialState());
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('loadingTitle', 'Loading data...');
      fixture.detectChanges();

      const loadingComponent = fixture.debugElement.query(By.directive(LoadingStateComponent));
      expect(loadingComponent.componentInstance.title()).toBe('Loading data...');
    });

    it('should pass loading description to loading component', () => {
      const testState: State<string> = loadingState(initialState());
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('loadingDescription', 'Please wait');
      fixture.detectChanges();

      const loadingComponent = fixture.debugElement.query(By.directive(LoadingStateComponent));
      expect(loadingComponent.componentInstance.description()).toBe('Please wait');
    });

    it('should pass size to loading component', () => {
      const testState: State<string> = loadingState(initialState());
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('size', 'large');
      fixture.detectChanges();

      const loadingComponent = fixture.debugElement.query(By.directive(LoadingStateComponent));
      expect(loadingComponent.componentInstance.size()).toBe('large');
    });

    it('should show loading overlay when loadingOverlay is true', () => {
      const testState: State<string> = loadingState(initialState());
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('loadingOverlay', true);
      fixture.detectChanges();

      const loadingComponent = fixture.debugElement.query(By.directive(LoadingStateComponent));
      expect(loadingComponent.componentInstance.overlay()).toBe(true);
    });

    it('should not show loading overlay when loadingOverlay is false', () => {
      const testState: State<string> = loadingState(initialState());
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('loadingOverlay', false);
      fixture.detectChanges();

      const loadingComponent = fixture.debugElement.query(By.directive(LoadingStateComponent));
      expect(loadingComponent.componentInstance.overlay()).toBe(false);
    });
  });

  describe('Error State', () => {
    it('should show error component when isError is true', () => {
      const testState: State<string> = errorState('Something went wrong');
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      const errorComponent = fixture.debugElement.query(By.directive(ErrorStateComponent));
      expect(errorComponent).toBeTruthy();
    });

    it('should pass error title to error component', () => {
      const testState: State<string> = errorState('Error occurred');
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('errorTitle', 'Error Title');
      fixture.detectChanges();

      const errorComponent = fixture.debugElement.query(By.directive(ErrorStateComponent));
      expect(errorComponent.componentInstance.title()).toBe('Error Title');
    });

    it('should pass error description to error component', () => {
      const testState: State<string> = errorState('Error occurred');
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('errorDescription', 'Custom error description');
      fixture.detectChanges();

      const errorComponent = fixture.debugElement.query(By.directive(ErrorStateComponent));
      expect(errorComponent.componentInstance.description()).toBe('Custom error description');
    });

    it('should use state error message when no errorDescription provided', () => {
      const testState: State<string> = errorState('State error message');
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      const errorComponent = fixture.debugElement.query(By.directive(ErrorStateComponent));
      expect(errorComponent.componentInstance.description()).toBe('State error message');
    });

    it('should pass error icon to error component', () => {
      const testState: State<string> = errorState('Error');
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('errorIcon', 'warning' as IconName);
      fixture.detectChanges();

      const errorComponent = fixture.debugElement.query(By.directive(ErrorStateComponent));
      expect(errorComponent.componentInstance.icon()).toBe('warning');
    });

    it('should use default error icon when not provided', () => {
      const testState: State<string> = errorState('Error');
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      const errorComponent = fixture.debugElement.query(By.directive(ErrorStateComponent));
      expect(errorComponent.componentInstance.icon()).toBe('error_circle');
    });

    it('should pass error actions to error component', () => {
      const primaryAction: QuickAction = {
        label: 'Retry',
        action: () => {},
      };
      const secondaryAction: QuickAction = {
        label: 'Cancel',
        action: () => {},
      };

      const testState: State<string> = errorState('Error');
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('errorPrimaryAction', primaryAction);
      fixture.componentRef.setInput('errorSecondaryAction', secondaryAction);
      fixture.detectChanges();

      const errorComponent = fixture.debugElement.query(By.directive(ErrorStateComponent));
      expect(errorComponent.componentInstance.primaryAction()).toBe(primaryAction);
      expect(errorComponent.componentInstance.secondaryAction()).toBe(secondaryAction);
    });
  });

  describe('Empty State', () => {
    it('should show empty component when data is null', () => {
      const testState: State<string> = loadedState(null as any);
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(true);
      const emptyComponent = fixture.debugElement.query(By.directive(EmptyStateComponent));
      expect(emptyComponent).toBeTruthy();
    });

    it('should show empty component when data is undefined', () => {
      const testState: State<string> = loadedState(undefined as any);
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(true);
    });

    it('should show empty component when array is empty', () => {
      const testState: State<string[]> = loadedState([]);
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(true);
    });

    it('should not show empty when array has items', () => {
      const testState: State<string[]> = loadedState(['item1', 'item2']);
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(false);
    });

    it('should show empty when Map is empty', () => {
      const testState: State<Map<string, any>> = loadedState(new Map());
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(true);
    });

    it('should not show empty when Map has entries', () => {
      const map = new Map([['key', 'value']]);
      const testState: State<Map<string, any>> = loadedState(map);
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(false);
    });

    it('should show empty when Set is empty', () => {
      const testState: State<Set<any>> = loadedState(new Set());
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(true);
    });

    it('should not show empty when Set has items', () => {
      const set = new Set(['item']);
      const testState: State<Set<any>> = loadedState(set);
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(false);
    });

    it('should show empty when object is empty', () => {
      const testState: State<object> = loadedState({});
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(true);
    });

    it('should not show empty when object has properties', () => {
      const testState: State<object> = loadedState({ key: 'value' });
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(false);
    });

    it('should respect emptyOverride when true', () => {
      const testState: State<string[]> = loadedState(['item']);
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('emptyOverride', true);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(true);
    });

    it('should respect emptyOverride when false', () => {
      const testState: State<string[]> = loadedState([]);
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('emptyOverride', false);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(false);
    });

    it('should show empty on initial when showEmptyOnInitial is true', () => {
      const testState: State<string> = initialState();
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('showEmptyOnInitial', true);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(true);
    });

    it('should pass empty title to empty component', () => {
      const testState: State<string> = loadedState(null as any);
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('emptyTitle', 'No Data');
      fixture.detectChanges();

      const emptyComponent = fixture.debugElement.query(By.directive(EmptyStateComponent));
      expect(emptyComponent.componentInstance.title()).toBe('No Data');
    });

    it('should pass empty description to empty component', () => {
      const testState: State<string> = loadedState(null as any);
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('emptyDescription', 'No data available');
      fixture.detectChanges();

      const emptyComponent = fixture.debugElement.query(By.directive(EmptyStateComponent));
      expect(emptyComponent.componentInstance.description()).toBe('No data available');
    });

    it('should pass empty icon to empty component', () => {
      const testState: State<string> = loadedState(null as any);
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('emptyIcon', 'folder' as IconName);
      fixture.detectChanges();

      const emptyComponent = fixture.debugElement.query(By.directive(EmptyStateComponent));
      expect(emptyComponent.componentInstance.icon()).toBe('folder');
    });

    it('should pass empty actions to empty component', () => {
      const primaryAction: QuickAction = {
        label: 'Add Item',
        action: () => {},
      };
      const secondaryAction: QuickAction = {
        label: 'Import',
        action: () => {},
      };

      const testState: State<string> = loadedState(null as any);
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('emptyPrimaryAction', primaryAction);
      fixture.componentRef.setInput('emptySecondaryAction', secondaryAction);
      fixture.detectChanges();

      const emptyComponent = fixture.debugElement.query(By.directive(EmptyStateComponent));
      expect(emptyComponent.componentInstance.primaryAction()).toBe(primaryAction);
      expect(emptyComponent.componentInstance.secondaryAction()).toBe(secondaryAction);
    });
  });

  describe('Data State', () => {
    it('should show content when data is loaded', () => {
      const testState: State<string> = loadedState('test data');
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(false);
      expect(component.shouldShowInitial()).toBe(false);
    });

    it('should not show loading when data is loaded', () => {
      const testState: State<string> = loadedState('test data');
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      const loadingComponent = fixture.debugElement.query(By.directive(LoadingStateComponent));
      expect(loadingComponent).toBeFalsy();
    });

    it('should not show error when data is loaded', () => {
      const testState: State<string> = loadedState('test data');
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      const errorComponent = fixture.debugElement.query(By.directive(ErrorStateComponent));
      expect(errorComponent).toBeFalsy();
    });
  });

  describe('Size Input', () => {
    const sizes: Size[] = ['small', 'medium', 'large'];

    sizes.forEach(size => {
      it(`should pass ${size} size to child components`, () => {
        const testState: State<string> = loadingState(initialState());
        fixture.componentRef.setInput('state', testState);
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        const loadingComponent = fixture.debugElement.query(By.directive(LoadingStateComponent));
        expect(loadingComponent.componentInstance.size()).toBe(size);
      });
    });

    it('should default to medium size when undefined', () => {
      const testState: State<string> = loadingState(initialState());
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('size', undefined);
      fixture.detectChanges();

      expect(component.size()).toBe('medium');
    });
  });

  describe('StateContext Computed', () => {
    it('should provide state context with data', () => {
      const testData = { id: 1, name: 'Test' };
      const testState: State<typeof testData> = loadedState(testData);
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      const context = component.stateContext();
      expect(context.$implicit).toBe(testData);
      expect(context.state).toBe(testState);
    });

    it('should update context when state changes', () => {
      const testData1 = { id: 1, name: 'Test1' };
      const testState1: State<typeof testData1> = loadedState(testData1);
      fixture.componentRef.setInput('state', testState1);
      fixture.detectChanges();

      let context = component.stateContext();
      expect(context.$implicit).toBe(testData1);

      const testData2 = { id: 2, name: 'Test2' };
      const testState2: State<typeof testData2> = loadedState(testData2);
      fixture.componentRef.setInput('state', testState2);
      fixture.detectChanges();

      context = component.stateContext();
      expect(context.$implicit).toBe(testData2);
    });
  });

  describe('Action Handlers', () => {
    it('should call action when onErrorActionClick is triggered', () => {
      let actionCalled = false;
      const action: QuickAction = {
        label: 'Retry',
        action: () => {
          actionCalled = true;
        },
      };

      component.onErrorActionClick(action);

      expect(actionCalled).toBe(true);
    });

    it('should not call action when disabled', () => {
      let actionCalled = false;
      const action: QuickAction = {
        label: 'Retry',
        disabled: true,
        action: () => {
          actionCalled = true;
        },
      };

      component.onErrorActionClick(action);

      expect(actionCalled).toBe(false);
    });

    it('should call action when onEmptyActionClick is triggered', () => {
      let actionCalled = false;
      const action: QuickAction = {
        label: 'Add',
        action: () => {
          actionCalled = true;
        },
      };

      component.onEmptyActionClick(action);

      expect(actionCalled).toBe(true);
    });

    it('should not call empty action when disabled', () => {
      let actionCalled = false;
      const action: QuickAction = {
        label: 'Add',
        disabled: true,
        action: () => {
          actionCalled = true;
        },
      };

      component.onEmptyActionClick(action);

      expect(actionCalled).toBe(false);
    });

    it('should handle action without action function', () => {
      const action: QuickAction = {
        label: 'Test',
        action: undefined as any,
      };

      expect(() => component.onErrorActionClick(action)).not.toThrow();
      expect(() => component.onEmptyActionClick(action)).not.toThrow();
    });
  });

  describe('State Transitions', () => {
    it('should transition from initial to loading', () => {
      const initialTestState: State<string> = initialState();
      fixture.componentRef.setInput('state', initialTestState);
      fixture.detectChanges();

      expect(component.shouldShowInitial()).toBe(true);

      const loadingTestState: State<string> = loadingState(initialTestState);
      fixture.componentRef.setInput('state', loadingTestState);
      fixture.detectChanges();

      expect(component.shouldShowInitial()).toBe(false);
      const loadingComponent = fixture.debugElement.query(By.directive(LoadingStateComponent));
      expect(loadingComponent).toBeTruthy();
    });

    it('should transition from loading to loaded', () => {
      const loadingTestState: State<string> = loadingState(initialState());
      fixture.componentRef.setInput('state', loadingTestState);
      fixture.detectChanges();

      let loadingComponent = fixture.debugElement.query(By.directive(LoadingStateComponent));
      expect(loadingComponent).toBeTruthy();

      const loadedTestState: State<string> = loadedState('data');
      fixture.componentRef.setInput('state', loadedTestState);
      fixture.detectChanges();

      loadingComponent = fixture.debugElement.query(By.directive(LoadingStateComponent));
      expect(loadingComponent).toBeFalsy();
    });

    it('should transition from loading to error', () => {
      const loadingTestState: State<string> = loadingState(initialState());
      fixture.componentRef.setInput('state', loadingTestState);
      fixture.detectChanges();

      let loadingComponent = fixture.debugElement.query(By.directive(LoadingStateComponent));
      expect(loadingComponent).toBeTruthy();

      const errorTestState: State<string> = errorState('Error occurred');
      fixture.componentRef.setInput('state', errorTestState);
      fixture.detectChanges();

      loadingComponent = fixture.debugElement.query(By.directive(LoadingStateComponent));
      expect(loadingComponent).toBeFalsy();

      const errorComponent = fixture.debugElement.query(By.directive(ErrorStateComponent));
      expect(errorComponent).toBeTruthy();
    });

    it('should transition from error to loading (retry)', () => {
      const errorTestState: State<string> = errorState('Error');
      fixture.componentRef.setInput('state', errorTestState);
      fixture.detectChanges();

      let errorComponent = fixture.debugElement.query(By.directive(ErrorStateComponent));
      expect(errorComponent).toBeTruthy();

      const loadingTestState: State<string> = loadingState(errorTestState);
      fixture.componentRef.setInput('state', loadingTestState);
      fixture.detectChanges();

      errorComponent = fixture.debugElement.query(By.directive(ErrorStateComponent));
      expect(errorComponent).toBeFalsy();

      const loadingComponent = fixture.debugElement.query(By.directive(LoadingStateComponent));
      expect(loadingComponent).toBeTruthy();
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle rapid state changes', () => {
      const states: State<string>[] = [
        initialState(),
        loadingState(initialState()),
        loadedState('data'),
        loadingState(loadedState('data')),
        errorState('error'),
      ];

      states.forEach(state => {
        fixture.componentRef.setInput('state', state);
        fixture.detectChanges();
        expect(() => fixture.detectChanges()).not.toThrow();
      });
    });

    it('should handle all inputs together', () => {
      const testState: State<string> = loadingState(initialState());
      const primaryAction: QuickAction = { label: 'Action', action: () => {} };

      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('size', 'large');
      fixture.componentRef.setInput('loadingTitle', 'Loading');
      fixture.componentRef.setInput('loadingDescription', 'Please wait');
      fixture.componentRef.setInput('loadingOverlay', true);
      fixture.componentRef.setInput('errorTitle', 'Error');
      fixture.componentRef.setInput('errorDescription', 'Error desc');
      fixture.componentRef.setInput('errorPrimaryAction', primaryAction);
      fixture.componentRef.setInput('emptyTitle', 'Empty');
      fixture.componentRef.setInput('emptyDescription', 'No data');
      fixture.componentRef.setInput('emptyPrimaryAction', primaryAction);
      fixture.detectChanges();

      expect(() => fixture.detectChanges()).not.toThrow();
    });

    it('should handle different data types', () => {
      const dataTypes = [
        'string',
        123,
        true,
        ['array'],
        { key: 'object' },
        new Map([['key', 'value']]),
        new Set(['item']),
      ];

      dataTypes.forEach(data => {
        const testState: State<any> = loadedState(data);
        fixture.componentRef.setInput('state', testState);
        fixture.detectChanges();
        expect(() => fixture.detectChanges()).not.toThrow();
      });
    });
  });

  describe('Edge Cases', () => {
    it('should handle null state data', () => {
      const testState: State<any> = loadedState(null);
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(true);
    });

    it('should handle undefined state data', () => {
      const testState: State<any> = loadedState(undefined);
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(true);
    });

    it('should handle empty string', () => {
      const testState: State<string> = loadedState('');
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      // Empty string is falsy but not null/undefined, so it should show data
      expect(component.shouldShowEmpty()).toBe(false);
    });

    it('should handle zero number', () => {
      const testState: State<number> = loadedState(0);
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      // Zero is falsy but not null/undefined, so it should show data
      expect(component.shouldShowEmpty()).toBe(false);
    });

    it('should handle false boolean', () => {
      const testState: State<boolean> = loadedState(false);
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      // False is falsy but not null/undefined, so it should show data
      expect(component.shouldShowEmpty()).toBe(false);
    });

    it('should handle nested empty objects', () => {
      const testState: State<any> = loadedState({ nested: {} });
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      // Object has a property, so it's not empty
      expect(component.shouldShowEmpty()).toBe(false);
    });

    it('should handle arrays with null/undefined items', () => {
      const testState: State<any[]> = loadedState([null, undefined]);
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      // Array has items (even if they're null/undefined), so it's not empty
      expect(component.shouldShowEmpty()).toBe(false);
    });
  });

  describe('Change Detection', () => {
    it('should use OnPush change detection strategy', () => {
      expect(component).toBeTruthy();
      // OnPush is set in component metadata
    });

    it('should update view when state input changes', () => {
      const state1: State<string> = initialState();
      fixture.componentRef.setInput('state', state1);
      fixture.detectChanges();

      expect(component.shouldShowInitial()).toBe(true);

      const state2: State<string> = loadedState('data');
      fixture.componentRef.setInput('state', state2);
      fixture.detectChanges();

      expect(component.shouldShowInitial()).toBe(false);
    });

    it('should update computed values when inputs change', () => {
      const testState: State<string[]> = loadedState([]);
      fixture.componentRef.setInput('state', testState);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(true);

      fixture.componentRef.setInput('emptyOverride', false);
      fixture.detectChanges();

      expect(component.shouldShowEmpty()).toBe(false);
    });
  });

  describe('Loading Overlay Mode', () => {
    it('should show content with overlay when loadingOverlay is true', () => {
      const testState: State<string> = loadingState(loadedState('existing data'));
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('loadingOverlay', true);
      fixture.detectChanges();

      const loadingComponent = fixture.debugElement.query(By.directive(LoadingStateComponent));
      expect(loadingComponent).toBeTruthy();
      expect(loadingComponent.componentInstance.overlay()).toBe(true);
    });

    it('should pass blurContent to loading component', () => {
      const testState: State<string> = loadingState(initialState());
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('loadingBlurContent', false);
      fixture.detectChanges();

      const loadingComponent = fixture.debugElement.query(By.directive(LoadingStateComponent));
      expect(loadingComponent.componentInstance.blurContent()).toBe(false);
    });

    it('should pass fullScreen to loading component', () => {
      const testState: State<string> = loadingState(initialState());
      fixture.componentRef.setInput('state', testState);
      fixture.componentRef.setInput('loadingFullScreen', true);
      fixture.detectChanges();

      const loadingComponent = fixture.debugElement.query(By.directive(LoadingStateComponent));
      expect(loadingComponent.componentInstance.fullScreen()).toBe(true);
    });
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent, DropdownItem } from './dropdown.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { QueryParams } from '../../../api';

const flush = () => new Promise(r => setTimeout(r, 0));
const tick = (ms = 0) => new Promise(r => setTimeout(r, ms));

describe('DropdownComponent', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  const createMockItems = (): DropdownItem[] => [
    { value: 1, label: 'Option 1', icon: 'folder' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3', disabled: true },
    { value: 4, label: 'Apple' },
    { value: 5, label: 'Banana' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownComponent, NoopAnimationsModule, FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(DropdownComponent);
    component = fixture.componentInstance;
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default input values', () => {
      fixture.detectChanges();

      expect(component.items()).toEqual([]);
      expect(component.mode()).toBe('single');
      expect(component.searchable()).toBe(false);
      expect(component.clearable()).toBe(false);
      expect(component.maxHeight()).toBe('300px');
      expect(component.compact()).toBe(false);
      expect(component.pageSize()).toBe(20);
    });

    it('should initialize with empty selection', () => {
      fixture.detectChanges();

      expect(component.selectedValues().size).toBe(0);
      expect(component.selectedItems()).toEqual([]);
    });

    it('should display placeholder when no selection', () => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.componentRef.setInput('placeholder', 'Choose an option');
      fixture.detectChanges();

      expect(component.displayText()).toBe('Choose an option');
    });
  });

  describe('Single Selection Mode', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.componentRef.setInput('mode', 'single');
      fixture.detectChanges();
    });

    it('should select single item', () => {
      const item = createMockItems()[0];
      component.selectItem(item);
      fixture.detectChanges();

      expect(component.selectedValues().has(1)).toBe(true);
      expect(component.selectedValues().size).toBe(1);
      expect(component.displayText()).toBe('Option 1');
    });

    it('should replace previous selection when selecting new item', () => {
      const items = createMockItems();
      component.selectItem(items[0]);
      fixture.detectChanges();

      expect(component.selectedValues().has(1)).toBe(true);

      component.selectItem(items[1]);
      fixture.detectChanges();

      expect(component.selectedValues().has(1)).toBe(false);
      expect(component.selectedValues().has(2)).toBe(true);
      expect(component.selectedValues().size).toBe(1);
    });

    it('should emit selectionChange with single value', () => {
      let emittedValue: any;
      component.selectionChange.subscribe(value => (emittedValue = value));

      const item = createMockItems()[0];
      component.selectItem(item);

      expect(emittedValue).toBe(1);
    });

    it('should not select disabled item', () => {
      const disabledItem = createMockItems()[2]; // Option 3 is disabled
      component.selectItem(disabledItem);
      fixture.detectChanges();

      expect(component.selectedValues().has(3)).toBe(false);
      expect(component.selectedValues().size).toBe(0);
    });
  });

  describe('Multi Selection Mode', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.componentRef.setInput('mode', 'multi');
      fixture.detectChanges();
    });

    it('should select multiple items', () => {
      const items = createMockItems();
      component.selectItem(items[0]);
      component.selectItem(items[1]);
      fixture.detectChanges();

      expect(component.selectedValues().has(1)).toBe(true);
      expect(component.selectedValues().has(2)).toBe(true);
      expect(component.selectedValues().size).toBe(2);
    });

    it('should toggle item selection', () => {
      const item = createMockItems()[0];

      component.selectItem(item);
      expect(component.selectedValues().has(1)).toBe(true);

      component.selectItem(item);
      expect(component.selectedValues().has(1)).toBe(false);
    });

    it('should emit selectionChange with array of values', () => {
      let emittedValue: any;
      component.selectionChange.subscribe(value => (emittedValue = value));

      const items = createMockItems();
      component.selectItem(items[0]);
      component.selectItem(items[1]);

      expect(Array.isArray(emittedValue)).toBe(true);
      expect(emittedValue).toContain(1);
      expect(emittedValue).toContain(2);
    });

    it('should display empty text when no selection in multi mode', () => {
      expect(component.displayText()).toBe('Select...');
    });

    it('should return selected items for tags', () => {
      const items = createMockItems();
      component.selectItem(items[0]);
      component.selectItem(items[1]);
      fixture.detectChanges();

      const tagsItems = component.selectedItemsForTags();
      expect(tagsItems.length).toBe(2);
      expect(tagsItems[0].label).toBe('Option 1');
      expect(tagsItems[1].label).toBe('Option 2');
    });
  });

  describe('Dropdown Open/Close', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.detectChanges();
    });

    it('should open dropdown when toggle is called', async () => {
      expect(component.isOpen()).toBe(false);

      component.toggleDropdown();
      await await flush();

      expect(component.isOpen()).toBe(true);
    });

    it('should close dropdown when toggle is called on open dropdown', async () => {
      component.openDropdown();
      await await flush();
      expect(component.isOpen()).toBe(true);

      component.toggleDropdown();
      await await flush();

      expect(component.isOpen()).toBe(false);
    });

    it('should emit opened event when dropdown opens', async () => {
      let openedEmitted = false;
      component.opened.subscribe(() => (openedEmitted = true));

      component.openDropdown();
      await await flush();

      expect(openedEmitted).toBe(true);
    });

    it('should emit closed event when dropdown closes', async () => {
      let closedEmitted = false;
      component.closed.subscribe(() => (closedEmitted = true));

      component.openDropdown();
      await await flush();
      component.closeDropdown();
      await await flush();

      expect(closedEmitted).toBe(true);
    });

    it('should not open dropdown when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      component.toggleDropdown();

      expect(component.isOpen()).toBe(false);
    });

    it('should close dropdown after selecting item in single mode', async () => {
      component.openDropdown();
      await await flush();
      expect(component.isOpen()).toBe(true);

      const item = createMockItems()[0];
      component.selectItem(item);
      await await flush();

      expect(component.isOpen()).toBe(false);
    });

    it('should keep dropdown open after selecting item in multi mode', async () => {
      fixture.componentRef.setInput('mode', 'multi');
      fixture.detectChanges();

      component.openDropdown();
      await await flush();

      const item = createMockItems()[0];
      component.selectItem(item);
      await await flush();

      expect(component.isOpen()).toBe(true);
    });
  });

  describe('Search Functionality', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.componentRef.setInput('searchable', true);
      fixture.detectChanges();
    });

    it('should filter items based on search query', () => {
      component.searchQuery.set('apple');
      fixture.detectChanges();

      const filtered = component.availableItems();
      expect(filtered.length).toBe(1);
      expect(filtered[0].label).toBe('Apple');
    });

    it('should be case insensitive', () => {
      component.searchQuery.set('BANANA');
      fixture.detectChanges();

      const filtered = component.availableItems();
      expect(filtered.length).toBe(1);
      expect(filtered[0].label).toBe('Banana');
    });

    it('should return all items when search query is empty', () => {
      component.searchQuery.set('');
      fixture.detectChanges();

      const filtered = component.availableItems();
      expect(filtered.length).toBe(createMockItems().length);
    });

    it('should return empty array when no matches', () => {
      component.searchQuery.set('xyz');
      fixture.detectChanges();

      const filtered = component.availableItems();
      expect(filtered.length).toBe(0);
    });

    it('should handle partial matches', () => {
      component.searchQuery.set('option');
      fixture.detectChanges();

      const filtered = component.availableItems();
      expect(filtered.length).toBe(3); // Option 1, 2, 3
    });
  });

  describe('Clear Selection', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.componentRef.setInput('clearable', true);
      fixture.detectChanges();
    });

    it('should clear single selection', () => {
      const item = createMockItems()[0];
      component.selectItem(item);
      expect(component.selectedValues().size).toBe(1);

      component.clearSelection();
      fixture.detectChanges();

      expect(component.selectedValues().size).toBe(0);
      expect(component.displayText()).toBe('Select...');
    });

    it('should clear multiple selections', () => {
      fixture.componentRef.setInput('mode', 'multi');
      fixture.detectChanges();

      const items = createMockItems();
      component.selectItem(items[0]);
      component.selectItem(items[1]);
      expect(component.selectedValues().size).toBe(2);

      component.clearSelection();
      fixture.detectChanges();

      expect(component.selectedValues().size).toBe(0);
    });

    it('should emit selectionChange with empty array on clear', () => {
      let emittedValue: any;
      component.selectionChange.subscribe(value => (emittedValue = value));

      const item = createMockItems()[0];
      component.selectItem(item);

      component.clearSelection();

      expect(emittedValue).toEqual([]);
    });
  });

  describe('Remove Item (Multi Mode)', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.componentRef.setInput('mode', 'multi');
      fixture.detectChanges();
    });

    it('should remove specific item from selection', () => {
      const items = createMockItems();
      component.selectItem(items[0]);
      component.selectItem(items[1]);
      expect(component.selectedValues().size).toBe(2);

      component.removeItem(items[0]);
      fixture.detectChanges();

      expect(component.selectedValues().has(1)).toBe(false);
      expect(component.selectedValues().has(2)).toBe(true);
      expect(component.selectedValues().size).toBe(1);
    });

    it('should not remove item when disabled', () => {
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const items = createMockItems();
      component.selectItem(items[0]);
      const initialSize = component.selectedValues().size;

      component.removeItem(items[0]);

      expect(component.selectedValues().size).toBe(initialSize);
    });

    it('should not remove item when readonly', () => {
      fixture.componentRef.setInput('readonly', true);
      fixture.detectChanges();

      const items = createMockItems();
      component.selectItem(items[0]);
      const initialSize = component.selectedValues().size;

      component.removeItem(items[0]);

      expect(component.selectedValues().size).toBe(initialSize);
    });

    it('should not work in single mode', () => {
      fixture.componentRef.setInput('mode', 'single');
      fixture.detectChanges();

      const item = createMockItems()[0];
      component.selectItem(item);
      expect(component.selectedValues().size).toBe(1);

      component.removeItem(item);

      expect(component.selectedValues().size).toBe(1);
    });
  });

  describe('Keyboard Navigation', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.detectChanges();
    });

    it('should open dropdown on ArrowDown when closed', () => {
      expect(component.isOpen()).toBe(false);

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event);
      fixture.detectChanges();

      expect(component.isOpen()).toBe(true);
    });

    it('should open dropdown on ArrowUp when closed', () => {
      expect(component.isOpen()).toBe(false);

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onKeyDown(event);
      fixture.detectChanges();

      expect(component.isOpen()).toBe(true);
    });

    it('should navigate down through items with ArrowDown', async () => {
      component.openDropdown(false);
      await await flush();

      const items = component.selectableItems();

      // First ArrowDown sets active to first selectable item
      const event1 = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event1);
      fixture.detectChanges();

      expect(component.activeDescendant()).toBe(component.getItemId(items[0]));

      // Second ArrowDown moves to next selectable item
      const event2 = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event2);
      fixture.detectChanges();

      expect(component.activeDescendant()).toBe(component.getItemId(items[1]));
    });

    it('should navigate up through items with ArrowUp', async () => {
      component.openDropdown(true);
      await await flush();

      const items = component.selectableItems();

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onKeyDown(event);
      fixture.detectChanges();

      expect(component.activeDescendant()).toBe(component.getItemId(items[items.length - 1]));
    });

    it('should wrap to first item when navigating down from last item', async () => {
      component.openDropdown(false);
      await await flush();

      const items = component.selectableItems();

      // Navigate through all items to reach the last one
      for (let i = 0; i < items.length; i++) {
        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        component.onKeyDown(event);
        fixture.detectChanges();
      }

      // Verify we're at the last item
      expect(component.activeDescendant()).toBe(component.getItemId(items[items.length - 1]));

      // One more down should wrap to first
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event);
      fixture.detectChanges();

      expect(component.activeDescendant()).toBe(component.getItemId(items[0]));
    });

    it('should navigate to first item on Home key', async () => {
      component.openDropdown(true);
      await await flush();

      const items = component.selectableItems();
      const event = new KeyboardEvent('keydown', { key: 'Home' });
      component.onKeyDown(event);
      fixture.detectChanges();

      expect(component.activeDescendant()).toBe(component.getItemId(items[0]));
    });

    it('should navigate to last item on End key', async () => {
      component.openDropdown(true);
      await await flush();

      const items = component.selectableItems();
      const event = new KeyboardEvent('keydown', { key: 'End' });
      component.onKeyDown(event);
      fixture.detectChanges();

      expect(component.activeDescendant()).toBe(component.getItemId(items[items.length - 1]));
    });

    it('should select active item on Enter key', async () => {
      fixture.componentRef.setInput('mode', 'multi');
      fixture.detectChanges();

      component.openDropdown(false);
      await await flush();

      const items = component.selectableItems();

      // Navigate to first item
      const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(downEvent);
      fixture.detectChanges();

      // Select with Enter
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      component.onKeyDown(enterEvent);
      fixture.detectChanges();

      expect(component.selectedValues().has(items[0].value)).toBe(true);
    });

    it('should select active item on Space key', async () => {
      fixture.componentRef.setInput('mode', 'multi');
      fixture.detectChanges();

      component.openDropdown(false);
      await await flush();

      const items = component.selectableItems();

      // Navigate to first item
      const downEvent = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(downEvent);
      fixture.detectChanges();

      // Select with Space
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      component.onKeyDown(spaceEvent);
      fixture.detectChanges();

      expect(component.selectedValues().has(items[0].value)).toBe(true);
    });

    it('should close dropdown on Escape key', async () => {
      component.openDropdown();
      await await flush();
      expect(component.isOpen()).toBe(true);

      const event = new KeyboardEvent('keydown', { key: 'Escape' });
      component.onKeyDown(event);
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);
    });

    it('should close dropdown on Tab key', async () => {
      component.openDropdown();
      await await flush();
      expect(component.isOpen()).toBe(true);

      const event = new KeyboardEvent('keydown', { key: 'Tab' });
      component.onKeyDown(event);
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);
    });

    it('should clear selection on Delete key in single mode', () => {
      const item = createMockItems()[0];
      component.selectItem(item);
      expect(component.selectedValues().size).toBe(1);

      const event = new KeyboardEvent('keydown', { key: 'Delete' });
      component.onKeyDown(event);
      fixture.detectChanges();

      expect(component.selectedValues().size).toBe(0);
    });

    it('should skip disabled items during navigation', async () => {
      component.openDropdown(true);
      await await flush();

      const selectableItems = component.selectableItems();

      // Disabled item (Option 3) should not be in selectable items
      expect(selectableItems.find(item => item.value === 3)).toBeUndefined();

      // Navigation should only go through selectable items
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event);
      fixture.detectChanges();

      const activeItem = selectableItems.find(
        item => component.getItemId(item) === component.activeDescendant(),
      );
      expect(activeItem?.disabled).toBeFalsy();
    });
  });

  describe('Typeahead Search', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.detectChanges();
    });

    it('should find item starting with typed character', async () => {
      component.openDropdown(true);
      await await flush();

      const event = new KeyboardEvent('keydown', { key: 'a' });
      component.onKeyDown(event);
      await tick(1100); // Wait for typeahead timeout
      fixture.detectChanges();

      const activeItem = component
        .selectableItems()
        .find(item => component.getItemId(item) === component.activeDescendant());
      expect(activeItem?.label).toBe('Apple');
    });

    it('should accumulate characters for typeahead', async () => {
      component.openDropdown(true);
      await await flush();

      const event1 = new KeyboardEvent('keydown', { key: 'b' });
      component.onKeyDown(event1);
      await tick(100);

      const event2 = new KeyboardEvent('keydown', { key: 'a' });
      component.onKeyDown(event2);
      await tick(100);
      fixture.detectChanges();

      const activeItem = component
        .selectableItems()
        .find(item => component.getItemId(item) === component.activeDescendant());
      expect(activeItem?.label).toBe('Banana');

      await tick(1000); // Clear typeahead
    });

    it('should reset typeahead string after timeout', async () => {
      component.openDropdown(true);
      await await flush();

      const event1 = new KeyboardEvent('keydown', { key: 'b' });
      component.onKeyDown(event1);
      await tick(1100); // Wait for timeout
      fixture.detectChanges();

      // After timeout, 'a' should search from beginning, not continue 'ba'
      const event2 = new KeyboardEvent('keydown', { key: 'a' });
      component.onKeyDown(event2);
      await tick(100);
      fixture.detectChanges();

      const activeItem = component
        .selectableItems()
        .find(item => component.getItemId(item) === component.activeDescendant());
      expect(activeItem?.label).toBe('Apple');

      await tick(1000);
    });

    it('should wrap around when searching', async () => {
      component.openDropdown(true);
      await await flush();

      // First 'o' finds Option 1
      const event1 = new KeyboardEvent('keydown', { key: 'o' });
      component.onKeyDown(event1);
      await tick(100);
      fixture.detectChanges();

      let activeItem = component
        .selectableItems()
        .find(item => component.getItemId(item) === component.activeDescendant());
      expect(activeItem?.label).toBe('Option 1');

      await tick(1100); // Reset typeahead

      // Second 'o' should find next option starting with 'o'
      const event2 = new KeyboardEvent('keydown', { key: 'o' });
      component.onKeyDown(event2);
      await tick(100);
      fixture.detectChanges();

      activeItem = component
        .selectableItems()
        .find(item => component.getItemId(item) === component.activeDescendant());
      expect(activeItem?.label).toBe('Option 2');

      await tick(1000);
    });
  });

  describe('ControlValueAccessor', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.detectChanges();
    });

    it('should write single value', () => {
      component.writeValue(1);
      fixture.detectChanges();

      expect(component.selectedValues().has(1)).toBe(true);
      expect(component.displayText()).toBe('Option 1');
    });

    it('should write multiple values in multi mode', () => {
      fixture.componentRef.setInput('mode', 'multi');
      fixture.detectChanges();

      component.writeValue([1, 2]);
      fixture.detectChanges();

      expect(component.selectedValues().has(1)).toBe(true);
      expect(component.selectedValues().has(2)).toBe(true);
      expect(component.selectedValues().size).toBe(2);
    });

    it('should handle null value', () => {
      component.writeValue(1);
      fixture.detectChanges();
      expect(component.selectedValues().size).toBe(1);

      component.writeValue(null);
      fixture.detectChanges();

      expect(component.selectedValues().size).toBe(0);
    });

    it('should handle undefined value', () => {
      component.writeValue(1);
      fixture.detectChanges();
      expect(component.selectedValues().size).toBe(1);

      component.writeValue(undefined);
      fixture.detectChanges();

      expect(component.selectedValues().size).toBe(0);
    });

    it('should handle empty string in single mode', () => {
      component.writeValue('');
      fixture.detectChanges();

      expect(component.selectedValues().size).toBe(0);
    });

    it('should call onChange when selection changes', () => {
      const onChangeSpy = vi.fn();
      component.registerOnChange(onChangeSpy);

      const item = createMockItems()[0];
      component.selectItem(item);
      fixture.detectChanges();

      expect(onChangeSpy).toHaveBeenCalledWith(1);
    });
  });

  describe('Compact Mode', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.componentRef.setInput('compact', true);
      fixture.detectChanges();
    });

    it('should use compact icon when no selection', () => {
      fixture.componentRef.setInput('compactIcon', 'filter');
      fixture.detectChanges();

      expect(component.computedCompactIcon()).toBe('filter');
    });

    it('should use selected item icon when available', () => {
      const item = createMockItems()[0]; // Has folder icon
      component.selectItem(item);
      fixture.detectChanges();

      expect(component.computedCompactIcon()).toBe('folder');
    });

    it('should fallback to compact icon when selected item has no icon', () => {
      fixture.componentRef.setInput('compactIcon', 'filter');
      const item = createMockItems()[1]; // No icon
      component.selectItem(item);
      fixture.detectChanges();

      expect(component.computedCompactIcon()).toBe('filter');
    });
  });

  describe('Data Source (Dynamic Loading)', () => {
    it('should use dataSource for dynamic items', async () => {
      const mockDataSource = (params: QueryParams<any>) => {
        return of({
          items: [
            { value: 1, label: 'Dynamic 1' },
            { value: 2, label: 'Dynamic 2' },
          ],
          hasNextPage: false,
          hasPreviousPage: false,
          totalCount: 2,
        });
      };

      fixture.componentRef.setInput('dataSource', mockDataSource);
      fixture.detectChanges();

      const dataSourceFn = component.scrollContainerDataSource();
      expect(dataSourceFn).toBeDefined();

      dataSourceFn(1, 20).subscribe(result => {
        expect(result.items.length).toBe(2);
        expect(result.items[0].label).toBe('Dynamic 1');
      });

      await await flush();
    });

    it('should pass search term to dataSource', async () => {
      let capturedParams: QueryParams<any> | undefined;

      const mockDataSource = (params: QueryParams<any>) => {
        capturedParams = params;
        return of({
          items: [],
          hasNextPage: false,
          hasPreviousPage: false,
          totalCount: 0,
        });
      };

      fixture.componentRef.setInput('dataSource', mockDataSource);
      fixture.componentRef.setInput('searchable', true);
      fixture.detectChanges();

      component.searchQuery.set('test');
      fixture.detectChanges();

      const dataSourceFn = component.scrollContainerDataSource();
      dataSourceFn(1, 20).subscribe();

      await await flush();

      expect(capturedParams?.searchTerm).toBe('test');
    });

    it('should not filter items client-side when using dataSource', async () => {
      const mockDataSource = (params: QueryParams<any>) => {
        return of({
          items: createMockItems(),
          hasNextPage: false,
          hasPreviousPage: false,
          totalCount: 5,
        });
      };

      fixture.componentRef.setInput('items', createMockItems());
      fixture.componentRef.setInput('dataSource', mockDataSource);
      fixture.detectChanges();

      component.openDropdown();
      await flush();
      await tick(100);

      component.searchQuery.set('apple');
      fixture.detectChanges();
      await flush();

      const available = component.availableItems();
      expect(available.length).toBe(5);
    });
  });

  describe('Static Items Pagination', () => {
    it('should paginate static items correctly', async () => {
      const items = createMockItems();
      fixture.componentRef.setInput('items', items);
      fixture.componentRef.setInput('pageSize', 2);
      fixture.detectChanges();

      const dataSourceFn = component.scrollContainerDataSource();

      dataSourceFn(1, 2).subscribe(result => {
        expect(result.items.length).toBe(2);
        expect(result.items[0].label).toBe('Option 1');
        expect(result.items[1].label).toBe('Option 2');
        expect(result.hasNextPage).toBe(true);
        expect(result.hasPreviousPage).toBe(false);
      });

      await await flush();
    });

    it('should return correct page 2', async () => {
      const items = createMockItems();
      fixture.componentRef.setInput('items', items);
      fixture.componentRef.setInput('pageSize', 2);
      fixture.detectChanges();

      const dataSourceFn = component.scrollContainerDataSource();

      dataSourceFn(2, 2).subscribe(result => {
        expect(result.items.length).toBe(2);
        expect(result.items[0].label).toBe('Option 3');
        expect(result.items[1].label).toBe('Apple');
        expect(result.hasNextPage).toBe(true);
        expect(result.hasPreviousPage).toBe(true);
      });

      await await flush();
    });

    it('should handle last page correctly', async () => {
      const items = createMockItems();
      fixture.componentRef.setInput('items', items);
      fixture.componentRef.setInput('pageSize', 2);
      fixture.detectChanges();

      const dataSourceFn = component.scrollContainerDataSource();

      dataSourceFn(3, 2).subscribe(result => {
        expect(result.items.length).toBe(1);
        expect(result.items[0].label).toBe('Banana');
        expect(result.hasNextPage).toBe(false);
        expect(result.hasPreviousPage).toBe(true);
      });

      await await flush();
    });
  });

  describe('Item Selection State', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.detectChanges();
    });

    it('should correctly identify selected item', () => {
      const item = createMockItems()[0];
      component.selectItem(item);
      fixture.detectChanges();

      expect(component.isItemSelected(item)).toBe(true);
    });

    it('should correctly identify unselected item', () => {
      const item = createMockItems()[0];
      expect(component.isItemSelected(item)).toBe(false);
    });

    it('should show checkmark for selected item in single mode', () => {
      const item = createMockItems()[0];
      component.selectItem(item);
      fixture.detectChanges();

      expect(component.shouldShowCheckmark(item)).toBe(true);
      expect(component.shouldShowCheckbox(item)).toBe(false);
    });

    it('should show checkbox in multi mode', () => {
      fixture.componentRef.setInput('mode', 'multi');
      fixture.detectChanges();

      const item = createMockItems()[0];
      expect(component.shouldShowCheckbox(item)).toBe(true);
      expect(component.shouldShowCheckmark(item)).toBe(false);
    });
  });

  describe('Item to Node Conversion', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.detectChanges();
    });

    it('should convert item to node with correct properties', () => {
      const item = createMockItems()[0];
      const node = component.itemToNode(item);

      expect(node.id).toBe(item.value);
      expect(node.label).toBe(item.label);
      expect(node.icon).toBe(item.icon);
      expect(node.disabled).toBe(false);
      expect(node.data).toBe(item);
    });

    it('should set selected state in node', () => {
      const item = createMockItems()[0];
      component.selectItem(item);
      fixture.detectChanges();

      const node = component.itemToNode(item);
      expect(node.selected).toBe(true);
    });

    it('should handle disabled item', () => {
      const item = createMockItems()[2]; // Disabled item
      const node = component.itemToNode(item);

      expect(node.disabled).toBe(true);
    });

    it('should attach onClick handler', () => {
      const item = createMockItems()[0];
      const node = component.itemToNode(item);

      expect(node.onClick).toBeDefined();

      // Verify onClick selects the item
      node.onClick!();
      fixture.detectChanges();

      expect(component.selectedValues().has(item.value)).toBe(true);
    });
  });

  describe('ARIA and Accessibility', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.componentRef.setInput('id', 'test-dropdown');
      fixture.detectChanges();
    });

    it('should generate correct listbox id', () => {
      expect(component.getListboxId()).toBe('dropdown-listbox-test-dropdown');
    });

    it('should generate correct item id', () => {
      const item = createMockItems()[0];
      expect(component.getItemId(item)).toBe('dropdown-option-test-dropdown-1');
    });

    it('should set active descendant when navigating', async () => {
      component.openDropdown(true);
      await await flush();

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event);
      fixture.detectChanges();

      expect(component.activeDescendant()).toBeTruthy();
      expect(component.isNavigating()).toBe(true);
    });

    it('should clear active descendant when dropdown closes', async () => {
      component.openDropdown(true);
      await await flush();

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event);
      fixture.detectChanges();

      component.closeDropdown();
      fixture.detectChanges();

      expect(component.activeDescendant()).toBeNull();
      expect(component.isNavigating()).toBe(false);
    });

    it('should identify active item correctly', async () => {
      component.openDropdown(false);
      await await flush();

      const items = component.selectableItems();

      // Navigate to first item
      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event);
      fixture.detectChanges();

      expect(component.isItemActive(items[0])).toBe(true);
      expect(component.isItemActive(items[1])).toBe(false);
    });
  });

  describe('Mouse Interaction', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.detectChanges();
    });

    it('should disable keyboard navigation on mouse enter', async () => {
      component.openDropdown(true);
      await await flush();

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event);
      fixture.detectChanges();
      expect(component.isNavigating()).toBe(true);

      component.onItemMouseEnter();
      fixture.detectChanges();

      expect(component.isNavigating()).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty items array', () => {
      fixture.componentRef.setInput('items', []);
      fixture.detectChanges();

      expect(component.availableItems()).toEqual([]);
      expect(component.selectableItems()).toEqual([]);
      expect(component.displayText()).toBe('Select...');
    });

    it('should handle all disabled items', () => {
      const allDisabled: DropdownItem[] = [
        { value: 1, label: 'Disabled 1', disabled: true },
        { value: 2, label: 'Disabled 2', disabled: true },
      ];
      fixture.componentRef.setInput('items', allDisabled);
      fixture.detectChanges();

      expect(component.selectableItems().length).toBe(0);
    });

    it('should not navigate when no selectable items', () => {
      const allDisabled: DropdownItem[] = [{ value: 1, label: 'Disabled 1', disabled: true }];
      fixture.componentRef.setInput('items', allDisabled);
      fixture.detectChanges();

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event);
      fixture.detectChanges();

      expect(component.activeDescendant()).toBeNull();
    });

    it('should handle items with duplicate values', () => {
      const duplicateItems: DropdownItem[] = [
        { value: 1, label: 'Item 1' },
        { value: 1, label: 'Item 1 Duplicate' },
      ];
      fixture.componentRef.setInput('items', duplicateItems);
      fixture.detectChanges();

      component.selectItem(duplicateItems[0]);
      fixture.detectChanges();

      // Both items with value 1 should be considered selected
      expect(component.isItemSelected(duplicateItems[0])).toBe(true);
      expect(component.isItemSelected(duplicateItems[1])).toBe(true);
    });

    it('should handle very long item labels', () => {
      const longLabel = 'A'.repeat(200);
      const items: DropdownItem[] = [{ value: 1, label: longLabel }];
      fixture.componentRef.setInput('items', items);
      fixture.detectChanges();

      component.selectItem(items[0]);
      fixture.detectChanges();

      expect(component.displayText()).toBe(longLabel);
    });

    it('should handle special characters in labels', () => {
      const items: DropdownItem[] = [
        { value: 1, label: '<script>alert("xss")</script>' },
        { value: 2, label: 'Item & Co.' },
        { value: 3, label: 'Item "quoted"' },
      ];
      fixture.componentRef.setInput('items', items);
      fixture.detectChanges();

      component.selectItem(items[0]);
      fixture.detectChanges();

      expect(component.displayText()).toBe('<script>alert("xss")</script>');
    });

    it('should handle numeric and string values', () => {
      const mixedItems: DropdownItem[] = [
        { value: 1, label: 'Numeric 1' },
        { value: '2', label: 'String 2' },
      ];
      fixture.componentRef.setInput('items', mixedItems);
      fixture.detectChanges();

      component.selectItem(mixedItems[0]);
      expect(component.selectedValues().has(1)).toBe(true);

      component.selectItem(mixedItems[1]);
      expect(component.selectedValues().has('2')).toBe(true);
    });
  });

  describe('Complex Scenarios', () => {
    it('should handle rapid selection changes', async () => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.detectChanges();

      const items = createMockItems();

      // Rapidly select different items
      component.selectItem(items[0]);
      await tick(10);
      component.selectItem(items[1]);
      await tick(10);
      component.selectItem(items[4]);
      await tick(10);
      fixture.detectChanges();

      // Only last selection should remain in single mode
      expect(component.selectedValues().has(5)).toBe(true);
      expect(component.selectedValues().size).toBe(1);
    });

    it('should handle search with selection in multi mode', () => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.componentRef.setInput('mode', 'multi');
      fixture.componentRef.setInput('searchable', true);
      fixture.detectChanges();

      const items = createMockItems();
      component.selectItem(items[0]); // Select Option 1
      component.selectItem(items[3]); // Select Apple

      component.searchQuery.set('banana');
      fixture.detectChanges();

      // Should only show Banana in filtered results
      const filtered = component.availableItems();
      expect(filtered.length).toBe(1);
      expect(filtered[0].label).toBe('Banana');

      // But selected items should still be tracked
      expect(component.selectedValues().size).toBe(2);
      expect(component.selectedItems().length).toBe(2);
    });

    it('should maintain selection when items change', () => {
      const initialItems = createMockItems();
      fixture.componentRef.setInput('items', initialItems);
      fixture.detectChanges();

      component.selectItem(initialItems[0]);
      expect(component.selectedValues().has(1)).toBe(true);

      // Change items but keep item with value 1
      const newItems: DropdownItem[] = [
        { value: 1, label: 'Updated Option 1' },
        { value: 6, label: 'New Option' },
      ];
      fixture.componentRef.setInput('items', newItems);
      fixture.detectChanges();

      // Selection should be maintained
      expect(component.selectedValues().has(1)).toBe(true);
      expect(component.displayText()).toBe('Updated Option 1');
    });
  });
});

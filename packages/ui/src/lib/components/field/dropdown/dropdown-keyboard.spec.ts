import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DropdownComponent, DropdownItem } from './dropdown.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { QueryParams } from '../../../api';

const flush = () => new Promise(r => setTimeout(r, 0));
const tick = (ms = 0) => new Promise(r => setTimeout(r, ms));

describe('DropdownComponent - Keyboard Navigation', () => {
  let component: DropdownComponent;
  let fixture: ComponentFixture<DropdownComponent>;

  const createMockItems = (): DropdownItem[] => [
    { value: 1, label: 'Option 1' },
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

  describe('Basic Navigation', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.detectChanges();
    });

    it('should open dropdown and navigate to first item with ArrowDown', async () => {
      expect(component.isOpen()).toBe(false);

      const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
      component.onKeyDown(event);
      await flush();

      expect(component.isOpen()).toBe(true);
      const items = component.selectableItems();
      expect(component.activeDescendant()).toBe(component.getItemId(items[0]));
    });

    it('should open dropdown and navigate to last item with ArrowUp', async () => {
      expect(component.isOpen()).toBe(false);

      const event = new KeyboardEvent('keydown', { key: 'ArrowUp' });
      component.onKeyDown(event);
      await flush();

      expect(component.isOpen()).toBe(true);
      const items = component.selectableItems();
      expect(component.activeDescendant()).toBe(component.getItemId(items[items.length - 1]));
    });

    it('should navigate through all items sequentially', async () => {
      component.openDropdown(false);
      await flush();

      const items = component.selectableItems();

      for (let i = 0; i < items.length; i++) {
        const event = new KeyboardEvent('keydown', { key: 'ArrowDown' });
        component.onKeyDown(event);
        fixture.detectChanges();

        expect(component.activeDescendant()).toBe(component.getItemId(items[i]));
      }
    });

    it('should wrap around when navigating past last item', async () => {
      component.openDropdown(false);
      await flush();

      const items = component.selectableItems();

      // Navigate to last item
      for (let i = 0; i < items.length; i++) {
        component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        fixture.detectChanges();
      }

      expect(component.activeDescendant()).toBe(component.getItemId(items[items.length - 1]));

      // One more should wrap to first
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(component.activeDescendant()).toBe(component.getItemId(items[0]));
    });

    it('should wrap around when navigating before first item', async () => {
      component.openDropdown(false);
      await flush();

      const items = component.selectableItems();

      // Navigate to first item
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(component.activeDescendant()).toBe(component.getItemId(items[0]));

      // ArrowUp should wrap to last
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      fixture.detectChanges();

      expect(component.activeDescendant()).toBe(component.getItemId(items[items.length - 1]));
    });

    it('should skip disabled items during navigation', async () => {
      component.openDropdown(false);
      await flush();

      const items = component.selectableItems();

      // Verify disabled item (value 3) is not in selectable items
      expect(items.find(item => item.value === 3)).toBeUndefined();
      expect(items.length).toBe(4); // 5 total - 1 disabled

      // Navigate through all items - should never land on disabled
      for (let i = 0; i < items.length; i++) {
        component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        fixture.detectChanges();

        const activeItem = items.find(
          item => component.getItemId(item) === component.activeDescendant(),
        );
        expect(activeItem?.disabled).toBeFalsy();
      }
    });
  });

  describe('Jump Navigation', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.detectChanges();
    });

    it('should jump to first item with Home key', async () => {
      component.openDropdown(false);
      await flush();

      const items = component.selectableItems();

      // Navigate to middle
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      // Jump to first
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'Home' }));
      fixture.detectChanges();

      expect(component.activeDescendant()).toBe(component.getItemId(items[0]));
    });

    it('should jump to last item with End key', async () => {
      component.openDropdown(false);
      await flush();

      const items = component.selectableItems();

      // Navigate to first
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      // Jump to last
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'End' }));
      fixture.detectChanges();

      expect(component.activeDescendant()).toBe(component.getItemId(items[items.length - 1]));
    });

    it('should navigate by page with PageDown', async () => {
      // Create more items for paging
      const manyItems: DropdownItem[] = Array.from({ length: 30 }, (_, i) => ({
        value: i + 1,
        label: `Item ${i + 1}`,
      }));

      fixture.componentRef.setInput('items', manyItems);
      fixture.detectChanges();

      component.openDropdown(false);
      await flush();

      const items = component.selectableItems();

      // Navigate to first
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();
      expect(component.activeItemIndex()).toBe(0);

      // PageDown should jump ~10 items
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'PageDown' }));
      fixture.detectChanges();

      const newIndex = component.activeItemIndex();
      expect(newIndex).toBeGreaterThan(5);
      expect(newIndex).toBeLessThanOrEqual(10);
    });

    it('should navigate by page with PageUp', async () => {
      const manyItems: DropdownItem[] = Array.from({ length: 30 }, (_, i) => ({
        value: i + 1,
        label: `Item ${i + 1}`,
      }));

      fixture.componentRef.setInput('items', manyItems);
      fixture.detectChanges();

      component.openDropdown(false);
      await flush();

      // Navigate to middle
      for (let i = 0; i < 15; i++) {
        component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      }
      fixture.detectChanges();

      const beforeIndex = component.activeItemIndex();

      // PageUp should jump back ~10 items
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'PageUp' }));
      fixture.detectChanges();

      const afterIndex = component.activeItemIndex();
      expect(afterIndex).toBeLessThan(beforeIndex);
      expect(beforeIndex - afterIndex).toBeGreaterThanOrEqual(5);
    });
  });

  describe('Selection with Keyboard', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.detectChanges();
    });

    it('should select item with Enter in single mode', async () => {
      component.openDropdown(false);
      await flush();

      const items = component.selectableItems();

      // Navigate to second item
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      // Select with Enter
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
      fixture.detectChanges();
      await flush(); // Wait for setTimeout in closeDropdown

      expect(component.selectedValues().has(items[1].value)).toBe(true);
      expect(component.isOpen()).toBe(false); // Should close in single mode
    });

    it('should toggle selection with Space in multi mode', async () => {
      fixture.componentRef.setInput('mode', 'multi');
      fixture.detectChanges();

      component.openDropdown(false);
      await flush();

      const items = component.selectableItems();

      // Navigate and select first item
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      component.onKeyDown(new KeyboardEvent('keydown', { key: ' ' }));
      fixture.detectChanges();

      expect(component.selectedValues().has(items[0].value)).toBe(true);
      expect(component.isOpen()).toBe(true); // Should stay open in multi mode

      // Navigate and select second item
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      component.onKeyDown(new KeyboardEvent('keydown', { key: ' ' }));
      fixture.detectChanges();

      expect(component.selectedValues().has(items[1].value)).toBe(true);
      expect(component.selectedValues().size).toBe(2);
    });

    it('should clear selection with Delete in single mode', async () => {
      const item = createMockItems()[0];
      component.selectItem(item);
      fixture.detectChanges();

      expect(component.selectedValues().size).toBe(1);

      component.onKeyDown(new KeyboardEvent('keydown', { key: 'Delete' }));
      fixture.detectChanges();

      expect(component.selectedValues().size).toBe(0);
    });
  });

  describe('Typeahead Search', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.detectChanges();
    });

    it('should find item by typing first letter', async () => {
      component.openDropdown(false);
      await flush();

      const items = component.selectableItems();

      // Type 'a' to find Apple
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'a' }));
      await tick(100);
      fixture.detectChanges();

      const appleItem = items.find(item => item.label === 'Apple');
      expect(component.activeDescendant()).toBe(component.getItemId(appleItem!));
    });

    it('should find item by typing multiple letters quickly', async () => {
      component.openDropdown(false);
      await flush();

      const items = component.selectableItems();

      // Type 'ba' quickly to find Banana
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'b' }));
      await tick(100);
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'a' }));
      await tick(100);
      fixture.detectChanges();

      const bananaItem = items.find(item => item.label === 'Banana');
      expect(component.activeDescendant()).toBe(component.getItemId(bananaItem!));

      await tick(1000); // Clear typeahead
    });

    it('should reset typeahead after timeout', async () => {
      component.openDropdown(false);
      await flush();

      const items = component.selectableItems();

      // Type 'b'
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'b' }));
      await tick(100);
      fixture.detectChanges();

      const bananaItem = items.find(item => item.label === 'Banana');
      expect(component.activeDescendant()).toBe(component.getItemId(bananaItem!));

      // Wait for timeout
      await tick(1100);

      // Type 'a' - should search from beginning, not continue 'ba'
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'a' }));
      await tick(100);
      fixture.detectChanges();

      const appleItem = items.find(item => item.label === 'Apple');
      expect(component.activeDescendant()).toBe(component.getItemId(appleItem!));

      await tick(1000);
    });

    it('should cycle through items with same starting letter', async () => {
      component.openDropdown(false);
      await flush();

      const items = component.selectableItems();

      // Type 'o' to find first Option
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'o' }));
      await tick(100);
      fixture.detectChanges();

      const option1 = items.find(item => item.label === 'Option 1');
      expect(component.activeDescendant()).toBe(component.getItemId(option1!));

      await tick(1100); // Reset typeahead

      // Type 'o' again to find next Option
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'o' }));
      await tick(100);
      fixture.detectChanges();

      const option2 = items.find(item => item.label === 'Option 2');
      expect(component.activeDescendant()).toBe(component.getItemId(option2!));

      await tick(1000);
    });
  });

  describe('Keyboard Navigation with DataSource', () => {
    it('should navigate through items when dataSource is configured', async () => {
      const mockItems: DropdownItem[] = Array.from({ length: 10 }, (_, i) => ({
        value: i + 1,
        label: `Dynamic Item ${i + 1}`,
      }));

      const mockDataSource = (params: QueryParams<any>) => {
        return of({
          items: mockItems,
          hasNextPage: false,
          hasPreviousPage: false,
          totalCount: mockItems.length,
        });
      };

      // Items must be set even with dataSource
      fixture.componentRef.setInput('items', mockItems);
      fixture.componentRef.setInput('dataSource', mockDataSource);
      fixture.detectChanges();

      component.openDropdown(false);
      await flush();

      // Navigate through items
      for (let i = 0; i < 3; i++) {
        component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
        fixture.detectChanges();
      }

      expect(component.activeItemIndex()).toBe(2);
    });

    it('should handle empty results from dataSource', async () => {
      fixture.componentRef.setInput('items', []);
      fixture.componentRef.setInput('dataSource', () =>
        of({
          items: [],
          hasNextPage: false,
          hasPreviousPage: false,
          totalCount: 0,
        }),
      );
      fixture.detectChanges();

      component.openDropdown(false);
      await flush();

      // Try to navigate - should not crash
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(component.activeDescendant()).toBeNull();
    });
  });

  describe('Edge Cases', () => {
    it('should open dropdown with Home/End keys when closed', async () => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);

      // Home key opens dropdown and navigates to first item
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'Home' }));
      await flush();
      fixture.detectChanges();

      expect(component.isOpen()).toBe(true);
      const items = component.selectableItems();
      expect(component.activeDescendant()).toBe(component.getItemId(items[0]));
    });

    it('should not navigate when disabled', () => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);
      expect(component.activeDescendant()).toBeNull();
    });

    it('should handle navigation with only one selectable item', async () => {
      const singleItem: DropdownItem[] = [{ value: 1, label: 'Only Item' }];

      fixture.componentRef.setInput('items', singleItem);
      fixture.detectChanges();

      component.openDropdown(false);
      await flush();

      // Navigate down
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(component.activeItemIndex()).toBe(0);

      // Navigate down again - should wrap to same item
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      expect(component.activeItemIndex()).toBe(0);
    });

    it('should close dropdown on Escape and return focus', async () => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.detectChanges();

      component.openDropdown(false);
      await flush();

      expect(component.isOpen()).toBe(true);

      component.onKeyDown(new KeyboardEvent('keydown', { key: 'Escape' }));
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);
      expect(component.activeDescendant()).toBeNull();
    });

    it('should close dropdown on Tab without selecting', async () => {
      fixture.componentRef.setInput('items', createMockItems());
      fixture.detectChanges();

      component.openDropdown(false);
      await flush();

      // Navigate to an item
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();

      const initialSelection = component.selectedValues().size;

      // Press Tab
      component.onKeyDown(new KeyboardEvent('keydown', { key: 'Tab' }));
      fixture.detectChanges();

      expect(component.isOpen()).toBe(false);
      expect(component.selectedValues().size).toBe(initialSelection); // No change
    });
  });
});

import { ShowcaseDocMeta } from '@shared/components/showcase-doc-page/showcase-doc-page.meta';
import {
  ShowcaseDocAssetPaths,
  ShowcaseDocPageConfig
} from '@shared/components/showcase-doc-page/showcase-doc-page.models';
import { TimePickerBasicDemoComponent } from './examples/time-picker-basic-demo';
import { TimePickerFormatStepDemoComponent } from './examples/time-picker-format-step-demo';
import { TimePickerInlineScheduleDemoComponent } from './examples/time-picker-inline-schedule-demo';
import { TimePickerSchedulingPanelDemoComponent } from './examples/time-picker-scheduling-panel-demo';
import { TimePickerSizeLayoutDemoComponent } from './examples/time-picker-size-layout-demo';
import { TimePickerStatesDemoComponent } from './examples/time-picker-states-demo';
import meta from './time-picker.showcase.meta.json';

const timePickerMeta = meta as ShowcaseDocMeta;

const componentMap = {
  basic: TimePickerBasicDemoComponent,
  formatStep: TimePickerFormatStepDemoComponent,
  sizeLayout: TimePickerSizeLayoutDemoComponent,
  states: TimePickerStatesDemoComponent,
  inlineSchedule: TimePickerInlineScheduleDemoComponent,
  schedulingPanel: TimePickerSchedulingPanelDemoComponent
} as const;

export const TIME_PICKER_DOC_ASSET_PATHS: ShowcaseDocAssetPaths = {
  markdown: `/docs/components/${timePickerMeta.slug}.md`,
  ...(Object.fromEntries(
    Object.entries(timePickerMeta.snippets).map(([key, file]) => [
      key,
      `/docs/components/snippets/${timePickerMeta.slug}/${file}`
    ])
  ) as Record<string, string>)
};

export const TIME_PICKER_DOC_PAGE_CONFIG: ShowcaseDocPageConfig = {
  title: timePickerMeta.title,
  description: timePickerMeta.description,
  importCode: timePickerMeta.importCode,
  containerClass: timePickerMeta.containerClass,
  accessibility: timePickerMeta.accessibility,
  featureSections: timePickerMeta.featureSections.map((section) => ({
    id: section.id,
    title: section.title,
    description: section.description,
    codeKey: section.codeKey,
    component: componentMap[section.componentKey as keyof typeof componentMap]
  })),
  apiSections: timePickerMeta.apiSections
};

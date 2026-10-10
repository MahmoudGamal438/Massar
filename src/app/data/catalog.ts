import { Lesson } from '../core/models/content.models';
import { lessonsLevel0 } from './lessons-level-0.data';
import { lessonsLevel0Extra } from './lessons-level-0-extra.data';
import { lessonsLevel1 } from './lessons-level-1.data';
import { lessonsLevel1Extra } from './lessons-level-1-extra.data';
import {
  lessonsLevel3,
  lessonsLevel4,
  lessonsLevel5,
  lessonsLevel6plus,
} from './lessons-web-angular.data';
import { lessonsHtmlDeep } from './lessons-html-deep.data';
import { lessonsHtmlDeep2 } from './lessons-html-deep-2.data';
import { lessonsHtmlRef } from './lessons-html-ref.data';
import { lessonsCssDeep } from './lessons-css-deep.data';
import { lessonsCssRef } from './lessons-css-ref.data';
import { lessonsLevel3Extra } from './lessons-level-3-extra.data';
import { lessonsJsRef } from './lessons-js-ref.data';
import { lessonsLevel4Extra } from './lessons-level-4-extra.data';
import { lessonsLevel5Extra } from './lessons-level-5-extra.data';
import { lessonsLevel6Extra } from './lessons-level-6-extra.data';
import { lessonsLevel7to10Extra } from './lessons-level-7-10-extra.data';

export const allLessons: Lesson[] = [
  ...lessonsLevel0,
  ...lessonsLevel0Extra,
  ...lessonsLevel1,
  ...lessonsLevel1Extra,
  ...lessonsHtmlDeep,
  ...lessonsHtmlDeep2,
  ...lessonsHtmlRef,
  ...lessonsCssDeep,
  ...lessonsCssRef,
  ...lessonsLevel3,
  ...lessonsLevel3Extra,
  ...lessonsJsRef,
  ...lessonsLevel4,
  ...lessonsLevel4Extra,
  ...lessonsLevel5,
  ...lessonsLevel5Extra,
  ...lessonsLevel6plus,
  ...lessonsLevel6Extra,
  ...lessonsLevel7to10Extra,
];

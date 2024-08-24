import { createAction, props } from '@ngrx/store';

export const setImageData = createAction(
  '[Image] Set Image Data',
  props<{ imageData: string }>()
);

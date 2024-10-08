import { createReducer, on, Action } from '@ngrx/store';
import { setImageData } from './image.actions';
import { ImageState, initialState } from './image.state';

const _imageReducer = createReducer(
  initialState,
  on(setImageData, (state, { imageData, text }) => ({ ...state, imageData, text }))
);

export function imageReducer(state: ImageState | undefined, action: Action) {
  return _imageReducer(state, action);
}

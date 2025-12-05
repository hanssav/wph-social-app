import { PATH } from './path.constants';

export type EmptyPostState = {
  title: string;
  desc: string;
  label: string;
  action: string;
};

export const EMPTY_POST_STATE: EmptyPostState = {
  title: 'Your story starts here',
  desc: 'Share your first post and let the world see your moments, passions, and memories. Make this space truly yours.',
  label: 'Upload My First Post',
  action: PATH.FORM.ADD_POST,
};

export const EMPTY_SAVED_STATE: EmptyPostState = {
  title: 'Save what interests you ',
  desc: 'come back anytime to watch or share you saved content, or add it to a collection ',
  label: 'Explore',
  action: PATH.FEED,
};

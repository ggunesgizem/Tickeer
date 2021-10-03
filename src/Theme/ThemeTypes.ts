import BaseStyle from '~/Styles/BaseStyle';

export {ThemeKeys} from './ThemeKeys';
export type ThemeType = {
  spacing: typeof BaseStyle.spacing;
  fonts: typeof BaseStyle.fonts;
  eva: Record<string, any>;
};

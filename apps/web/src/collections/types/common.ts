import common from '../common.json';

export type CommonKey = keyof typeof common
export type CommonTranslations = Record<CommonKey, string>
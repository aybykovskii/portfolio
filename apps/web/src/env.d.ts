/// <reference types="astro/client" />

declare namespace App {
  type Translated<T> = import('./utils/lang').Translated<T>
  interface Locals {
    lang: import('./types').Lang
    commonTranslations: import('./collections/types').CommonTranslations
    bio: Translated<import('./collections/types').Bio>
  }
}

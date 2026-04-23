/// <reference types="astro/client" />

declare namespace App {
  type Translated<T> = import('./utils/lang').Translated<T>
  interface Locals {
    commonTranslations: import('./collections/types').CommonTranslations
    bio: Translated<import('./collections/types').Bio>
  }
}

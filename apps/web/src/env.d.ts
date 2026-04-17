/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    commonTranslations: import('./collections/types').CommonTranslations
  }
}

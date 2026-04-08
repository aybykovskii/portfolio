/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    commonTranslations: Record<import('./collections/types').CommonKey, string>
  }
}

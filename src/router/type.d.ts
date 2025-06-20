import 'vue-router'

declare module 'vue-router' {
  interface RouteMeta {
    hideLayout?: boolean
    requiresAuth?: boolean
    roles?: Array<'ADMIN' | 'USER' | string>
  }
}

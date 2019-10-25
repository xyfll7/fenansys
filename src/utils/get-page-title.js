import { title } from '@/settings'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title || '智慧法院'}`
  }
  return `${title}`
}

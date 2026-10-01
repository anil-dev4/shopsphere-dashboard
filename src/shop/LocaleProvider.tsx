import { useEffect, type ReactNode } from 'react'
import { LocaleContext, translate, type Language } from './i18n'
import { useStored } from './useStored'

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [language, storeLanguage] = useStored<Language>('ss-language', 'en')
  const setLanguage = (next: Language) => {
    try { localStorage.setItem('ss-language', JSON.stringify(next)) } catch { /* Storage is optional. */ }
    storeLanguage(next)
  }
  useEffect(() => { document.documentElement.lang = language === 'en' ? 'en-IE' : language }, [language])
  return <LocaleContext.Provider value={{ language, setLanguage, t: text => translate(language, text) }}>{children}</LocaleContext.Provider>
}

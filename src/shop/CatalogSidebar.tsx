import { categories } from './catalog'
import { Icon } from './ui'
import { useLocale } from './i18n'

type CatalogSidebarProps = {
  category: string
  search: string
  onCategory: (category: string) => void
  onSearch: (value: string) => void
}

export function CatalogSidebar({ category, search, onCategory, onSearch }: CatalogSidebarProps) {
  const { t } = useLocale()
  return <aside className="categories catalog-sidebar" aria-label={t('Categories')}>
    <div className="sidebar-heading"><span className="sidebar-kicker">{t('DISCOVER')}</span><h2>{t('Explore the store')}</h2><p>{t('Find something made for you.')}</p></div>
    <div className="sidebar-search"><Icon name="search" size={17} /><input value={search} onChange={event => onSearch(event.target.value)} placeholder={t('Search products')} aria-label={t('Search products from categories')} />{search && <button type="button" onClick={() => onSearch('')} aria-label={t('Clear search')}><Icon name="close" size={14} /></button>}</div>
    <h3>{t('All Categories')}</h3>
    <div className="category-links">{categories.map((item, index) => <button key={item} className={category === item && !search ? 'active' : ''} aria-pressed={category === item && !search} onClick={() => onCategory(item)}><Icon name={index < 2 ? 'user' : index < 6 ? 'grid' : 'bag'} size={16} /><span>{t(item)}</span><span className="category-chevron" aria-hidden="true">›</span></button>)}</div>
    <div className="sidebar-note"><Icon name="truck" size={21} /><span><strong>{t('Free delivery')}</strong><small>{t('On orders over €9.99')}</small></span></div>
  </aside>
}

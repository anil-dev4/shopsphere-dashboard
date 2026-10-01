import type { FormEvent } from 'react'
import { Brand, Icon } from './ui'
import { useLocale } from './i18n'

export type NavigationItem = 'Shop' | 'Categories' | 'New Arrivals' | 'Offers' | 'About'

const links: NavigationItem[] = ['Shop', 'Categories', 'New Arrivals', 'Offers', 'About']

type SiteHeaderProps = {
  active: NavigationItem | null
  accountName: string
  cartCount: number
  menuOpen: boolean
  search: string
  onHome: () => void
  onNavigate: (item: NavigationItem) => void
  onSearch: (value: string) => void
  onWishlist: () => void
  onCart: () => void
  onProfile: () => void
  onToggleMenu: () => void
}

export function SiteHeader({ active, accountName, cartCount, menuOpen, search, onHome, onNavigate, onSearch, onWishlist, onCart, onProfile, onToggleMenu }: SiteHeaderProps) {
  const { language, setLanguage, t } = useLocale()
  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(search)
  }

  return <header className="header site-header">
    <div className="header-inner">
      <Brand go={onHome} />
      <nav className={menuOpen ? 'open' : ''} aria-label="Main navigation">
        {links.map(item => <button key={item} type="button" className={active === item ? 'active' : ''} aria-current={active === item ? 'page' : undefined} onClick={() => onNavigate(item)}>{t(item)}</button>)}
      </nav>
      <div className="header-actions">
        <form className="search header-search" role="search" onSubmit={submitSearch}>
          <Icon name="search" size={17} />
          <input value={search} onChange={event => onSearch(event.target.value)} placeholder={t('Search products...')} aria-label={t('Search products')} autoComplete="off" />
          {search && <button className="search-clear" type="button" aria-label={t('Clear search')} onClick={() => onSearch('')}><Icon name="close" size={14} /></button>}
        </form>
        <select className="header-language" value={language} onChange={event => setLanguage(event.target.value as typeof language)} aria-label={t('Language')} title={t('Language')}><option value="en">EN</option><option value="de">DE</option><option value="nl">NL</option></select>
        <button className="icon-button" onClick={onWishlist} aria-label={t('Wishlist')}><Icon name="heart" /></button>
        <button className="icon-button cart-icon" onClick={onCart} aria-label={`${t('Cart')}, ${cartCount} ${t('items')}`}><Icon name="cart" size={20} />{cartCount > 0 && <i>{cartCount}</i>}</button>
        <button className="account-link" onClick={onProfile}><span>{accountName.charAt(0).toUpperCase()}</span><strong>{t('Hi')}, {accountName.split(' ')[0]}!</strong></button>
        <button className="mobile-menu icon-button" onClick={onToggleMenu} aria-label={t('Toggle menu')} aria-expanded={menuOpen}><Icon name="menu" /></button>
      </div>
    </div>
    <form className="mobile-search" role="search" onSubmit={submitSearch}>
      <Icon name="search" size={18} />
      <input value={search} onChange={event => onSearch(event.target.value)} placeholder={t('Search products, styles, colors...')} aria-label={t('Search products')} autoComplete="off" />
      {search && <button type="button" onClick={() => onSearch('')} aria-label={t('Clear search')}><Icon name="close" size={15} /></button>}
    </form>
  </header>
}

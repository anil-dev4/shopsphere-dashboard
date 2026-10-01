import sneaker from '../assets/sneaker-hero.png'
import { products } from './catalog'
import type { Product } from './catalog'
import { ProductCard } from './components'
import { Icon } from './ui'
import type { IconName } from './ui'
import { useLocale } from './i18n'

type HomePageProps = {
  favorites: string[]
  onShop: () => void
  onOpen: (product: Product) => void
  onFavorite: (id: string) => void
  onAdd: (product: Product) => void
}

const benefits: [IconName, string, string][] = [
  ['truck', 'Free Delivery', 'On orders above €9.99'],
  ['refresh', 'Easy Returns', '7-day return policy'],
  ['shield', 'Secure Payment', '100% secure checkout'],
]

export function HomePage({ favorites, onShop, onOpen, onFavorite, onAdd }: HomePageProps) {
  const { t } = useLocale()
  return <main>
    <section className="hero">
      <div className="hero-copy">
        <p className="eyebrow">● &nbsp; {t('NEW SEASON COLLECTION')}</p>
        <h1>{t('Style that')}<br />{t('moves with you.')}</h1>
        <p>{t('Discover premium fashion, electronics, home essentials and more — all in one place.')}</p>
        <div className="hero-buttons">
          <button className="button primary" onClick={onShop}>{t('Shop Now')} <Icon name="arrow" size={16} /></button>
          <button className="button light-button" onClick={onShop}>{t('Explore Collections')}</button>
        </div>
        <div className="stats"><div><b>10K+</b><small>{t('Happy Customers')}</small></div><div><b>500+</b><small>{t('Premium Brands')}</small></div><div><b>4.8★</b><small>{t('Average Rating')}</small></div></div>
      </div>
      <img src={sneaker} alt={t('White sneaker on green display')} />
    </section>
    <section className="home-content">
      <div className="section-title"><div><p className="eyebrow">{t('CURATED FOR YOU')}</p><h2>{t('Shop the latest styles')}</h2></div><button onClick={onShop}>{t('View all products')} <Icon name="arrow" size={16} /></button></div>
      <div className="home-grid">{products.slice(0, 4).map(item => <ProductCard key={item.id} item={item} isFavorite={favorites.includes(item.id)} onOpen={onOpen} onFavorite={onFavorite} onAdd={onAdd} />)}</div>
      <div className="benefits" id="about">{benefits.map(([icon, title, caption]) => <div key={title}><Icon name={icon} size={23} /><span><b>{t(title)}</b><small>{t(caption)}</small></span></div>)}</div>
    </section>
  </main>
}

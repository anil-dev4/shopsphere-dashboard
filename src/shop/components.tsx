import { money } from './catalog'
import type { Page, Product } from './catalog'
import { Icon, Photo } from './ui'
import type { IconName } from './ui'
import { useLocale } from './i18n'

type ProductCardProps = {
  item: Product
  isFavorite: boolean
  onOpen: (item: Product) => void
  onFavorite: (id: string) => void
  onAdd: (item: Product) => void
}

export function ProductCard({ item, isFavorite, onOpen, onFavorite, onAdd }: ProductCardProps) {
  const { t } = useLocale()
  return <article className="product-card">
    <button className="card-photo" onClick={() => onOpen(item)} aria-label={`${t('View')} ${t(item.name)}`}><Photo index={item.image} /></button>
    <button className={`favorite ${isFavorite ? 'on' : ''}`} onClick={() => onFavorite(item.id)} aria-label={`${t(isFavorite ? 'Remove' : 'Add')} ${t(item.name)} ${t(isFavorite ? 'from' : 'to')} ${t('wishlist')}`} aria-pressed={isFavorite}><Icon name="heart" size={19} fill={isFavorite ? 'currentColor' : 'none'} /></button>
    <button className="product-name" onClick={() => onOpen(item)}>{t(item.name)}</button>
    <div className="price">{money(item.price)} <del>{money(item.old)}</del> <span className="discount">{Math.round((1 - item.price / item.old) * 100)}% {t('OFF')}</span></div>
    <div className="rating"><Icon name="star" size={13} fill="currentColor" /> {item.rating} <span>({item.reviews})</span></div>
    <button className="button outline full" onClick={() => onAdd(item)}>{t('Add to Cart')}</button>
  </article>
}

type SummaryProps = {
  subtotal: number
  total: number
  discount: boolean
  itemCount: number
  checkout?: boolean
  coupon: string
  onCouponChange: (value: string) => void
  onApplyCoupon: () => void
  onCheckout: () => void
}

export function OrderSummary({ subtotal, total, discount, itemCount, checkout = false, coupon, onCouponChange, onApplyCoupon, onCheckout }: SummaryProps) {
  const { t } = useLocale()
  return <aside className="summary panel">
    <h3>{t('Order Summary')}</h3>
    <div><span>{t('Subtotal')}</span><b>{money(subtotal)}</b></div>
    <div><span>{t('Delivery')}</span><b className="green">{t('FREE')}</b></div>
    {discount && <div><span>{t('Discount')}</span><b className="green">−{money(subtotal - total)}</b></div>}
    <div className="summary-total"><strong>{t('Total')}</strong><strong>{money(total)}</strong></div>
    {!checkout && <button className="button primary full" disabled={!itemCount} onClick={onCheckout}>{t('Proceed to Checkout')} <Icon name="arrow" size={16} /></button>}
    <h4>{t('Apply Coupon')}</h4>
    <form className="coupon" onSubmit={event => { event.preventDefault(); onApplyCoupon() }}>
      <input value={coupon} onChange={event => onCouponChange(event.target.value)} placeholder={t('Enter coupon code')} aria-label={t('Coupon code')} />
      <button type="submit">{t('Apply')}</button>
    </form>
    <small>{t('Try SAVE10 for 10% off')}</small>
  </aside>
}

const accountLinks: [IconName, string, Page][] = [
  ['user', 'My Profile', 'profile'],
  ['package', 'My Orders', 'orders'],
  ['heart', 'Wishlist', 'category'],
  ['logout', 'Logout', 'login'],
]

export function AccountMenu({ active, onNavigate, onWishlist }: { active: string; onNavigate: (page: Page) => void; onWishlist: () => void }) {
  const { t } = useLocale()
  return <aside className="account-menu" aria-label={t('Account navigation')}>
    {accountLinks.map(([icon, label, target]) => <button key={label} className={active === label ? 'active' : ''} onClick={label === 'Wishlist' ? onWishlist : () => onNavigate(target)}><Icon name={icon} size={17} />{t(label)}</button>)}
  </aside>
}

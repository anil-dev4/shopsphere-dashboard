import type { ReactNode } from 'react'
import fashion from '../assets/fashion-grid.png'
import { products } from './catalog'
import { productPhotos } from './productPhotos'
import { useLocale } from './i18n'

export type IconName='bag'|'search'|'heart'|'cart'|'user'|'arrow'|'close'|'star'|'check'|'trash'|'minus'|'plus'|'truck'|'shield'|'refresh'|'grid'|'package'|'pin'|'card'|'settings'|'logout'|'menu'|'filter'
export function Icon({name,size=18,fill='none'}:{name:IconName;size?:number;fill?:string}){
  const paths:Record<IconName,ReactNode>={
    bag:<><path d="M4 8h16l-1 12H5L4 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,search:<><circle cx="10.8" cy="10.8" r="6.5"/><path d="m16 16 4.5 4.5"/></>,heart:<path d="M20.6 8.5c0 4.2-8.6 10-8.6 10s-8.6-5.8-8.6-10a4.5 4.5 0 0 1 8.6-1.9 4.5 4.5 0 0 1 8.6 1.9Z"/>,cart:<><path d="M3 4h2l2.2 11.5h11.6L21 7H6"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/></>,user:<><circle cx="12" cy="8" r="4"/><path d="M4.5 21a7.5 7.5 0 0 1 15 0"/></>,arrow:<><path d="M4 12h16"/><path d="m14 6 6 6-6 6"/></>,close:<path d="M5 5 19 19M19 5 5 19"/>,star:<path d="m12 2.5 2.9 6 6.6.9-4.8 4.7 1.2 6.6-5.9-3.1-5.9 3.1 1.2-6.6-4.8-4.7 6.6-.9L12 2.5Z"/>,check:<path d="m4 12 5 5L20 6"/>,trash:<><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"/></>,minus:<path d="M5 12h14"/>,plus:<path d="M5 12h14M12 5v14"/>,truck:<><path d="M2 6h12v11H2zM14 9h4l4 4v4h-8"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></>,shield:<><path d="M12 2 4 5v6c0 5 3.5 8.5 8 11 4.5-2.5 8-6 8-11V5l-8-3Z"/><path d="m8.5 12 2.3 2.3 4.8-5"/></>,refresh:<><path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.8 9A7 7 0 0 1 18 7l2 5M4 12l2 5a7 7 0 0 0 12.2-2"/></>,grid:<><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,package:<><path d="m3 7 9-4 9 4v10l-9 4-9-4V7Z"/><path d="m3 7 9 4 9-4M12 11v10"/></>,pin:<><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z"/><circle cx="12" cy="10" r="2"/></>,card:<><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20M6 15h4"/></>,settings:<><circle cx="12" cy="12" r="3"/><path d="m12 2 2 3 4-.5 1.5 3.5L22 12l-2.5 4 1.5 3.5-4 .5-5 2-3-2-4 .5L3.5 17 2 12l1.5-5L5 4.5l4 .5 3-3Z"/></>,logout:<><path d="M10 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h5M8 12h13m-5-5 5 5-5 5"/></>,menu:<path d="M4 7h16M4 12h16M4 17h16"/>,filter:<path d="M4 6h16M7 12h10M10 18h4"/>
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}
export function Photo({index,className=''}:{index:number;className?:string}){
  const { t } = useLocale()
  const product=products.find(item=>item.image===index)
  const productPhoto=product&&productPhotos[product.id]
  if(productPhoto)return <div className={`photo product-photo ${className}`}><img src={productPhoto} alt={t(product.name)} loading="lazy" decoding="async"/></div>
  return <div className={`photo photo-${index} ${className}`} style={{backgroundImage:`url(${fashion})`}} role="img" aria-label={product ? t(product.name) : undefined}/>
}
export function Brand({go,light=false}:{go:()=>void;light?:boolean}){return <button className={`brand ${light?'light':''}`} onClick={go}><span className="brand-icon"><Icon name="bag" size={17}/></span>Shop<span>Sphere</span></button>}
export function Qty({value,change}:{value:number;change:(delta:number)=>void}){const {t}=useLocale();return <div className="qty"><button onClick={()=>change(-1)} aria-label={t('Decrease quantity')}><Icon name="minus" size={14}/></button><span>{value}</span><button onClick={()=>change(1)} aria-label={t('Increase quantity')}><Icon name="plus" size={14}/></button></div>}

import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { HomePage } from './shop/HomePage'
import { AuthPage } from './shop/AuthPage'
import { categories, money, products } from './shop/catalog'
import type { Account, CartItem, Order, Page, Product } from './shop/catalog'
import { useStored } from './shop/useStored'
import { Brand, Icon, Photo, Qty } from './shop/ui'
import { AccountMenu, OrderSummary, ProductCard } from './shop/components'
import { SiteHeader } from './shop/SiteHeader'
import type { NavigationItem } from './shop/SiteHeader'
import { CatalogSidebar } from './shop/CatalogSidebar'
import { AddressEditor } from './shop/AddressEditor'
import { useLocale } from './shop/i18n'
import type { IconName } from './shop/ui'
import './App.css'
import './shop/navigation.css'
import './shop/experience.css'
import './shop/polish.css'
import './shop/storefront-finish.css'

const validPages:Page[]=['login','signup','home','category','product','cart','checkout','success','orders','order-detail','profile']
function readPage():Page{return validPages.includes(window.location.hash.slice(1) as Page)?window.location.hash.slice(1) as Page:'login'}

function nameFromEmail(email:string){return email.split('@')[0].split(/[._+-]+/).filter(Boolean).map(part=>part.charAt(0).toUpperCase()+part.slice(1)).join(' ')||'Shopper'}

function App(){
  const { t } = useLocale()
  const [page,setPage]=useState<Page>(readPage)
  const [cart,setCart]=useStored<CartItem[]>('ss-cart',[])
  const [orders,setOrders]=useStored<Order[]>('ss-orders',[])
  const [favorites,setFavorites]=useStored<string[]>('ss-favorites',[])
  const [account,setAccount]=useStored<Account>('ss-account',{name:'Anil Reddy',email:'anil.reddy@example.com',phone:'+91 98765 43210',address:'123, Main Street, Hyderabad, Telangana - 500001'})
  const [selected,setSelected]=useState(products[0].id)
  const [size,setSize]=useState('M'),[color,setColor]=useState('Pink'),[quantity,setQuantity]=useState(1)
  const [search,setSearch]=useState(''),[category,setCategory]=useState(categories[0])
  const [sort,setSort]=useState('popular'),[wishlist,setWishlist]=useState(false)
  const [collection,setCollection]=useState<'new'|null>(null)
  const [coupon,setCoupon]=useState(''),[discount,setDiscount]=useState(false),[payment,setPayment]=useState('UPI')
  const [error,setError]=useState(''),[notice,setNotice]=useState(''),[editing,setEditing]=useState(false),[menu,setMenu]=useState(false)
  const [draft,setDraft]=useState<Account>(account)
  const [currentOrder,setCurrentOrder]=useState('')
  const [orderFilter,setOrderFilter]=useState('All')
  useEffect(()=>{const sync=()=>setPage(readPage());window.addEventListener('hashchange',sync);return()=>window.removeEventListener('hashchange',sync)},[])
  useEffect(()=>{if(notice){const timer=setTimeout(()=>setNotice(''),3000);return()=>clearTimeout(timer)}},[notice])
  const go=(next:Page)=>{window.history.pushState({},'',`#${next}`);setPage(next);setMenu(false);window.scrollTo(0,0)}
  const product=products.find(item=>item.id===selected)??products[0]
  const count=cart.reduce((sum,item)=>sum+item.quantity,0)
  const subtotal=cart.reduce((sum,item)=>sum+(products.find(p=>p.id===item.id)?.price??0)*item.quantity,0)
  const total=subtotal-(discount?Math.round(subtotal*.1):0)
  const order=orders.find(item=>item.id===currentOrder)??orders[0]
  const filtered=useMemo(()=>{
    const query=search.trim().toLowerCase()
    const matching=products.filter(item=>(query.length>0||category==='Offers'||item.category===category)&&(!wishlist||favorites.includes(item.id))&&`${item.name} ${item.color} ${item.category} ${t(item.name)} ${t(item.color)} ${t(item.category)}`.toLowerCase().includes(query))
    if(sort==='price-asc')return [...matching].sort((a,b)=>a.price-b.price)
    if(sort==='price-desc')return [...matching].sort((a,b)=>b.price-a.price)
    return matching
  },[category,favorites,search,sort,wishlist,t])
  const openProduct=(item:Product)=>{setSelected(item.id);setSize(item.category.includes('Fashion')?'M':'One Size');setColor(item.color);setQuantity(1);go('product')}
  const add=(item:Product,amount=1,chosenSize=size,chosenColor=color)=>{setCart(current=>{const index=current.findIndex(row=>row.id===item.id&&row.size===chosenSize&&row.color===chosenColor);return index<0?[...current,{id:item.id,size:chosenSize,color:chosenColor,quantity:amount}]:current.map((row,i)=>i===index?{...row,quantity:row.quantity+amount}:row)});setNotice(`${t(item.name)} ${t('added to cart')}`)}
  const favorite=(id:string)=>setFavorites(current=>current.includes(id)?current.filter(item=>item!==id):[...current,id])
  const auth=(event:FormEvent<HTMLFormElement>,mode:'login'|'signup')=>{event.preventDefault();const data=new FormData(event.currentTarget);const email=String(data.get('email')).trim().toLowerCase();if(mode==='signup'){if(data.get('password')!==data.get('confirm')){setError('Passwords do not match.');return}setAccount(current=>({...current,name:String(data.get('name')).trim(),email}))}else{setAccount(current=>({...current,name:nameFromEmail(email),email}))}setError('');go('home')}
  const placeOrder=()=>{if(!cart.length)return;const next:Order={id:`SSP${Math.floor(100000+Math.random()*900000)}`,date:new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'}),items:cart,total,address:{...account}};setOrders(current=>[next,...current]);setCurrentOrder(next.id);setCart([]);setDiscount(false);go('success')}
  const renderProductCard = (item: Product) => <ProductCard key={item.id} item={item} isFavorite={favorites.includes(item.id)} onOpen={openProduct} onFavorite={favorite} onAdd={product => add(product, 1, product.category.includes('Fashion') ? 'M' : 'One Size', product.color)} />
  const renderSummary = (checkout = false) => <OrderSummary subtotal={subtotal} total={total} discount={discount} itemCount={count} checkout={checkout} coupon={coupon} onCouponChange={setCoupon} onApplyCoupon={() => { if (coupon.trim().toUpperCase() === 'SAVE10') { setDiscount(true); setNotice(t('SAVE10 applied')) } else setNotice(t('Try code SAVE10')) }} onCheckout={() => go('checkout')} />
  const showWishlist=()=>{setWishlist(true);setSearch('');setCollection(null);setCategory(categories[0]);go('category')}
  const searchProducts=(value:string)=>{
    setSearch(value)
    setWishlist(false)
    setCollection(null)
    if(page!=='category')go('category')
  }
  const selectCategory=(value:string)=>{
    setCategory(value)
    setSearch('')
    setWishlist(false)
    setCollection(null)
  }
  const navigateHeader=(item:NavigationItem)=>{
    if(item==='Shop'){setSearch('');setWishlist(false);setCollection(null);go('home');return}
    if(item==='About'){go('home');window.setTimeout(()=>document.getElementById('about')?.scrollIntoView({behavior:'smooth'}),0);return}
    if(item==='Offers'){selectCategory('Offers');go('category');return}
    selectCategory(categories[0])
    setCollection(item==='New Arrivals'?'new':null)
    go('category')
  }
  const activeNav:NavigationItem|null=page==='home'?'Shop':page==='category'?(search?'Categories':category==='Offers'?'Offers':collection==='new'?'New Arrivals':'Categories'):null
  const renderAccountMenu = (active: string) => <AccountMenu active={active} onNavigate={go} onWishlist={showWishlist} />
  if(page==='login'||page==='signup')return <AuthPage mode={page} error={error} notice={notice} onNavigate={go} onSubmit={auth} onForgotPassword={()=>setNotice(t('Use any valid email and password of at least 6 characters.'))} />
  return <div className="app">
    <SiteHeader active={activeNav} accountName={account.name} cartCount={count} menuOpen={menu} search={search} onHome={()=>go('home')} onNavigate={navigateHeader} onSearch={searchProducts} onWishlist={showWishlist} onCart={()=>go('cart')} onProfile={()=>go('profile')} onToggleMenu={()=>setMenu(value=>!value)} />
  {page==='home'&&<HomePage favorites={favorites} onShop={()=>go('category')} onOpen={openProduct} onFavorite={favorite} onAdd={item=>add(item,1,'M',item.color)} />}
  {page==='category'&&<main className="layout catalog-layout">
    <CatalogSidebar category={category} search={search} onCategory={selectCategory} onSearch={searchProducts} />
    <section className="catalog">
      <p className="breadcrumb">{t('Home')} &nbsp;›&nbsp; {t(search?'Search':wishlist?'Wishlist':collection==='new'?'New Arrivals':category)}</p>
      <div className="catalog-title">
        <div><p className="eyebrow">{t("DISCOVER YOUR STYLE")}</p><h1>{t(wishlist?'My Wishlist':search?'Search Results':collection==='new'?'New Arrivals':category)}</h1><p>{search?`${t('Showing results for')} “${search.trim()}” · ${filtered.length} ${t('products')}`:`${filtered.length} ${t('products to explore')}`}</p></div>
        <label className="sort"><Icon name="filter" size={15}/><select aria-label={t("Sort products")} value={sort} onChange={event=>setSort(event.target.value)}><option value="popular">{t("Sort by: Popularity")}</option><option value="price-asc">{t("Price: Low to High")}</option><option value="price-desc">{t("Price: High to Low")}</option></select></label>
      </div>
      {filtered.length?<div className="catalog-grid">{filtered.map(item=>renderProductCard(item))}</div>:<div className="empty catalog-empty"><Icon name="search" size={38}/><h2>{t(search?'No matching products':wishlist?'Your wishlist is empty':'No products here yet')}</h2><p>{t(search?'Try another name, color, or category.':'Explore the latest styles in the store.')}</p><button className="button primary" onClick={()=>selectCategory(categories[0])}>{t("Show all products")}</button></div>}
    </section>
  </main>}
  {page==='product'&&<main className="product-page"><p className="breadcrumb">{t('Home')} &nbsp;›&nbsp; {t(product.category)} &nbsp;›&nbsp; {t(product.name)}</p><div className="product-layout"><div className="gallery"><Photo index={product.image} className="main-photo"/></div><section className="product-info"><p className="eyebrow">{t('CURATED')} · {t(product.category).toUpperCase()}</p><div className="product-heading"><h1>{t(product.name)}</h1><button className={`favorite ${favorites.includes(product.id)?'on':''}`} onClick={()=>favorite(product.id)} aria-label={t("Favorite")}><Icon name="heart" size={22} fill={favorites.includes(product.id)?'currentColor':'none'}/></button></div><div className="rating"><Icon name="star" size={16} fill="currentColor"/> {product.rating} <span>({product.reviews} {t('reviews')})</span></div><div className="product-price"><b>{money(product.price)}</b><del>{money(product.old)}</del><span className="discount">{Math.round((1-product.price/product.old)*100)}% {t('OFF')}</span></div><div className="option"><b>{t("Color:")} <span>{t(color)}</span></b><div className="colors">{(product.category==="Women's Fashion"?Array.from(new Set([product.color,'White','Blue'])):[product.color]).map(value=><button key={value} className={`${value.toLowerCase()} ${color===value?'active':''}`} onClick={()=>setColor(value)} aria-label={value}/>)}</div></div>{product.category.includes('Fashion')&&<div className="option"><b>{t("Size:")}</b><div className="sizes">{['S','M','L','XL'].map(value=><button key={value} className={size===value?'active':''} onClick={()=>setSize(value)}>{value}</button>)}</div></div>}<div className="option"><b>{t("Quantity:")}</b><Qty value={quantity} change={delta=>setQuantity(value=>Math.max(1,value+delta))}/></div><div className="product-actions"><button className="button outline" onClick={()=>add(product,quantity)}>{t("Add to Cart")}</button><button className="button primary" onClick={()=>{add(product,quantity);go('cart')}}>{t("Buy Now")} <Icon name="arrow" size={17}/></button></div><div className="benefits compact">{([['truck','Free Delivery','On orders above €9.99'],['refresh','Easy Returns','7-day returns'],['shield','Secure Payment','100% secure']] as [IconName,string,string][]).map(([icon,title,caption])=><div key={title}><Icon name={icon} size={21}/><span><b>{t(title)}</b><small>{t(caption)}</small></span></div>)}</div></section></div></main>}
  {page==='cart'&&<main className="standard cart-page"><div className="page-title"><div><p className="eyebrow">{t("YOUR BAG")}</p><h1>{t("Shopping Cart")} <span>({count} {t('items')})</span></h1></div><button onClick={()=>go('category')}>{t("Continue Shopping")} <Icon name="arrow" size={16}/></button></div>{cart.length?<div className="two-col"><section className="cart-list">{cart.map((row,index)=>{const item=products.find(p=>p.id===row.id)??products[0];return <article className="cart-row" key={`${row.id}-${row.size}-${row.color}`}><button onClick={()=>openProduct(item)}><Photo index={item.image}/></button><div><button className="product-name" onClick={()=>openProduct(item)}>{t(item.name)}</button><p>{t('Size:')} {row.size} · {t('Color:')} {t(row.color)}</p><b>{money(item.price)}</b><Qty value={row.quantity} change={delta=>setCart(current=>current.map((entry,i)=>i===index?{...entry,quantity:Math.max(1,entry.quantity+delta)}:entry))}/></div><button className="delete" onClick={()=>setCart(current=>current.filter((_,i)=>i!==index))} aria-label={t("Remove item")}><Icon name="trash" size={18}/></button></article>})}</section>{renderSummary()}</div>:<div className="empty"><Icon name="cart" size={42}/><h2>{t("Your cart is empty")}</h2><p>{t("Find something you love in our latest collection.")}</p><button className="button primary" onClick={()=>go('category')}>{t("Start Shopping")}</button></div>}</main>}
  {page==='checkout'&&<main className="standard checkout-page">
    <div className="page-title"><div><p className="eyebrow">{t("ALMOST THERE")}</p><h1>{t("Checkout")}</h1></div></div>
    <div className="steps"><span className="active">1 &nbsp; {t('Address')}</span><span>2 &nbsp; {t('Payment')}</span><span>3 &nbsp; {t('Review')}</span></div>
    <div className="two-col">
      <section>
        <AddressEditor account={account} onSave={next=>{setAccount(next);setNotice(t('Delivery address saved'))}} />
        <div className="panel payment-panel"><div className="panel-heading"><span className="panel-heading-icon"><Icon name="card" size={19}/></span><div><p className="eyebrow">{t("PAY YOUR WAY")}</p><h3>{t("Payment Method")}</h3></div></div><div className="payment-options">{['UPI','Credit / Debit Card','Net Banking','Cash on Delivery'].map(method=><label key={method} className={payment===method?'selected':''}><input type="radio" name="payment" checked={payment===method} onChange={()=>setPayment(method)}/><span>{t(method)}</span>{method==='UPI'&&<small>G Pay · PhonePe · Paytm</small>}</label>)}</div></div>
        <button className="button primary place" disabled={!cart.length} onClick={placeOrder}>{t('Place Order')} · {money(total)} <Icon name="arrow" size={17}/></button>
      </section>
      <div>{renderSummary(true)}<div className="checkout-items panel"><h3>{t("Your Items")}</h3>{cart.map((row,index)=>{const item=products.find(p=>p.id===row.id)??products[0];return <div key={index}><Photo index={item.image}/><span><b>{t(item.name)}</b><small>{t('Size')} {row.size} · {t('Qty')} {row.quantity}</small></span><b>{money(item.price*row.quantity)}</b></div>})}</div></div>
    </div>
  </main>}
  {page==='success'&&<main className="success success-page"><div className="confetti">✦ &nbsp; · &nbsp; ✧ &nbsp; · &nbsp; ✦</div><div className="success-icon"><Icon name="check" size={50}/></div><h1>{t("Order Placed Successfully!")}</h1><p>{t("Thank you for shopping with ShopSphere.")}</p><div className="success-details"><span>{t("Order Number")}</span><b>#{order?.id}</b><span>{t("Estimated Delivery")}</span><b>{t("3–5 business days")}</b></div><button className="button primary full" onClick={()=>go('order-detail')}>{t("View Order")} <Icon name="arrow" size={17}/></button><button className="button outline full" onClick={()=>go('category')}>{t("Continue Shopping")}</button></main>}
  {page==='orders'&&<main className="account-layout orders-page">
    {renderAccountMenu('My Orders')}
    <section className="account-content">
      <div className="page-title"><div><p className="eyebrow">{t("YOUR PURCHASES")}</p><h1>{t("My Orders")}</h1></div></div>
      <div className="tabs">{['All','Processing','Shipped','Delivered'].map(status=><button key={status} className={orderFilter===status?'active':''} onClick={()=>setOrderFilter(status)}>{t(status)}</button>)}</div>
      {(orderFilter==='All'||orderFilter==='Processing')&&orders.length?orders.map(entry=><article className="order-card" key={entry.id}><Photo index={products.find(p=>p.id===entry.items[0]?.id)?.image??0}/><div><b>{t('Order')} #{entry.id}</b><p>{entry.date} · {entry.items.reduce((sum,row)=>sum+row.quantity,0)} {t('items')}</p><strong>{money(entry.total)}</strong></div><span className="status">{t("Processing")}</span><button className="button outline" onClick={()=>{setCurrentOrder(entry.id);go('order-detail')}}>{t("View Details")}</button></article>):<div className="empty"><Icon name="package" size={40}/><h2>{orderFilter==='All'?t('No orders yet'):`${t(orderFilter)} ${t('orders')}`}</h2><p>{t(orderFilter==='All'?'Your orders will appear here after checkout.':'Orders in this status will appear here.')}</p><button className="button primary" onClick={()=>go('category')}>{t("Explore products")}</button></div>}
    </section>
  </main>}
  {page==='order-detail'&&<main className="standard order-detail-page">
    <button className="back" onClick={()=>go('orders')}>‹ &nbsp; {t('Back to Orders')}</button>
    {order?<>
      <div className="page-title"><div><p className="eyebrow">{t("ORDER DETAILS")}</p><h1>{t('Order')} #{order.id}</h1><p>{t('Placed on')} {order.date}</p></div><span className="status">{t("Processing")}</span></div>
      <div className="tracking">{([['check','Order Placed',order.date],['package','Processing','In progress'],['truck','Shipped','Coming soon'],['pin','Delivered','Estimated soon']] as [IconName,string,string][]).map(([icon,title,caption],index)=><div className={index<2?'active':''} key={title}><span><Icon name={icon} size={17}/></span><b>{t(title)}</b><small>{t(caption)}</small></div>)}</div>
      <div className="two-col">
        <section className="panel"><h3>{t("Items")}</h3>{order.items.map((row,index)=>{const item=products.find(p=>p.id===row.id)??products[0];return <div className="order-line" key={index}><Photo index={item.image}/><span><b>{t(item.name)}</b><small>{t('Size')} {row.size} · {t('Color:')} {t(row.color)} · {t('Qty')} {row.quantity}</small></span><strong>{money(item.price*row.quantity)}</strong></div>})}</section>
        <aside className="panel"><h3>{t("Shipping Address")}</h3><b>{(order.address??account).name}</b><p>{(order.address??account).address}</p><p>{(order.address??account).phone}</p><hr/><div className="summary-total"><b>{t("Total Amount")}</b><b>{money(order.total)}</b></div></aside>
      </div>
    </>:<div className="empty"><h2>{t("Order not found")}</h2><button className="button primary" onClick={()=>go('orders')}>{t("My Orders")}</button></div>}
  </main>}
  {page==='profile'&&<main className="account-layout profile-page">
    {renderAccountMenu('My Profile')}
    <section className="account-content">
      <div className="page-title"><div><p className="eyebrow">{t("ACCOUNT SETTINGS")}</p><h1>{t("My Profile")}</h1></div></div>
      <div className="profile panel">
        <div className="profile-top"><span className="profile-avatar">{account.name.charAt(0)}</span><div><b>{account.name}</b><p>{account.email}</p></div><button className="button outline" onClick={()=>{setDraft(account);setEditing(value=>!value)}}>{t(editing?'Cancel':'Edit Profile')}</button></div>
        <form onSubmit={event=>{event.preventDefault();setAccount(draft);setEditing(false);setNotice(t('Profile saved successfully'))}}>
          <div className="profile-grid">
            <label>{t("Full Name")}<input value={editing?draft.name:account.name} onChange={event=>setDraft(current=>({...current,name:event.target.value}))} disabled={!editing} required/></label>
            <label>{t("Email")}<input type="email" value={editing?draft.email:account.email} onChange={event=>setDraft(current=>({...current,email:event.target.value}))} disabled={!editing} required/></label>
            <label>{t("Phone")}<input value={editing?draft.phone:account.phone} onChange={event=>setDraft(current=>({...current,phone:event.target.value}))} disabled={!editing}/></label>
            <label>{t("Delivery Address")}<input value={editing?draft.address:account.address} onChange={event=>setDraft(current=>({...current,address:event.target.value}))} disabled={!editing}/></label>
          </div>
          {editing&&<button className="button primary" type="submit">{t("Save Changes")}</button>}
        </form>
      </div>
    </section>
  </main>}
  {notice&&<div className="toast"><Icon name="check" size={16}/>{notice}</div>}
  <footer className="site-footer">
    <div className="footer-inner">
      <div className="footer-about"><Brand go={()=>go('home')} light/><p>{t('Style for every moment.')} © {new Date().getFullYear()} ShopSphere.</p></div>
      <div className="footer-links" aria-label="Footer navigation"><button onClick={()=>go('category')}>{t("Shop")}</button><button onClick={()=>go('orders')}>{t("Orders")}</button><button onClick={()=>go('profile')}>{t("Account")}</button></div>
    </div>
  </footer></div>
}
export default App



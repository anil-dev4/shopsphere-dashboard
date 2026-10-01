import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Account } from './catalog'
import { Icon } from './ui'
import { useLocale } from './i18n'

export function AddressEditor({ account, onSave }: { account: Account; onSave: (next: Account) => void }) {
  const { t } = useLocale()
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState(account)

  const startEditing = () => {
    setDraft(account)
    setEditing(true)
  }
  const save = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSave({ ...draft, name: draft.name.trim(), address: draft.address.trim(), phone: draft.phone.trim() })
    setEditing(false)
  }

  return <section className="panel delivery-panel">
    <div className="panel-heading"><span className="panel-heading-icon"><Icon name="pin" size={19} /></span><div><p className="eyebrow">{t('DELIVERY DETAILS')}</p><h3>{t('Delivery Address')}</h3></div></div>
    {editing ? <form className="address-edit-form" onSubmit={save}>
      <div className="address-edit-grid">
        <label>{t('Full name')}<input value={draft.name} onChange={event => setDraft(current => ({ ...current, name: event.target.value }))} required /></label>
        <label>{t('Phone number')}<input type="tel" value={draft.phone} onChange={event => setDraft(current => ({ ...current, phone: event.target.value }))} required /></label>
        <label className="address-full">{t('Street, city, state and postal code')}<textarea value={draft.address} onChange={event => setDraft(current => ({ ...current, address: event.target.value }))} rows={3} required /></label>
      </div>
      <div className="address-edit-actions"><button type="button" className="button outline" onClick={() => setEditing(false)}>{t('Cancel')}</button><button type="submit" className="button primary"><Icon name="check" size={16} /> {t('Save Address')}</button></div>
    </form> : <div className="address-card">
      <span className="address-radio" aria-hidden="true" />
      <div><strong>{account.name}</strong><p>{account.address}</p><p>{account.phone}</p></div>
      <button type="button" onClick={startEditing}><Icon name="settings" size={15} /> {t('Edit')}</button>
    </div>}
  </section>
}

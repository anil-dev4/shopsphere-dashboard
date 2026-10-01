import type { FormEvent } from 'react'
import loginArt from '../assets/login-fashion.png'
import type { Page } from './catalog'
import { Brand, Icon } from './ui'
import { languageOptions, useLocale } from './i18n'

type AuthPageProps = {
  mode: 'login' | 'signup'
  error: string
  notice: string
  onNavigate: (page: Page) => void
  onSubmit: (event: FormEvent<HTMLFormElement>, mode: 'login' | 'signup') => void
  onForgotPassword: () => void
}

export function AuthPage({ mode, error, notice, onNavigate, onSubmit, onForgotPassword }: AuthPageProps) {
  const { language, setLanguage, t } = useLocale()
  return <main className={`auth ${mode}`} style={{ backgroundImage: `linear-gradient(90deg,rgba(39,26,9,.08),rgba(15,28,17,.55)),url(${loginArt})` }}>
    <div className="auth-left">
      <Brand light go={() => onNavigate('home')} />
      <div className="auth-cats">{['Shop', 'New Arrivals', 'Women', 'Men', 'Kids', 'Accessories', 'Offers'].map(item => <span key={item}>{t(item)}</span>)}</div>
    </div>
    <section className="auth-panel">
      {mode === 'signup' && <label className="language-picker"><span>{t('Language')}</span><select value={language} onChange={event => setLanguage(event.target.value as typeof language)} aria-label={t('Language')}>{languageOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select></label>}
      {mode === 'login' ? <>
        <h1>{t('Welcome Back!')}</h1>
        <form key="login" onSubmit={event => onSubmit(event, 'login')}>
          <label>{t('Email')}<input type="email" name="email" autoComplete="email" defaultValue="anil.reddy@example.com" required /></label>
          <label>{t('Password')}<input type="password" name="password" autoComplete="current-password" defaultValue="password123" minLength={6} required /></label>
          <button className="forgot" type="button" onClick={onForgotPassword}>{t('Forgot Password?')}</button>
          {error && <p className="error" role="alert">{t(error)}</p>}
          <button className="button auth-submit" type="submit">{t('Submit')} <Icon name="arrow" size={17} /></button>
        </form>
        <div className="or">{t('OR')}</div>
        <div className="social" aria-label={t('Social sign-in is not available yet')}><button type="button" disabled title={t('Social sign-in is not available yet')} aria-label={t('Google sign-in unavailable')}>G</button><button type="button" disabled title={t('Social sign-in is not available yet')} aria-label={t('Apple sign-in unavailable')}>●</button><button type="button" disabled title={t('Social sign-in is not available yet')} aria-label={t('Facebook sign-in unavailable')}>f</button></div>
        <p className="social-note">{t('Social sign-in is not available yet')}</p>
        <p className="auth-switch">{t('Don’t have an account?')} <button onClick={() => onNavigate('signup')}>{t('Register Now')}</button></p>
      </> : <>
        <h1>{t('Create Your Account')}</h1><p className="auth-caption">{t('Join ShopSphere and start shopping')}</p>
        <form key="signup" onSubmit={event => onSubmit(event, 'signup')}>
          <label>{t('Full Name')}<input name="name" autoComplete="name" placeholder="Anil Reddy" required /></label>
          <label>{t('Email')}<input name="email" type="email" autoComplete="email" placeholder="anil.reddy@example.com" required /></label>
          <label>{t('Password')}<input name="password" type="password" autoComplete="new-password" minLength={6} required /></label>
          <label>{t('Confirm Password')}<input name="confirm" type="password" autoComplete="new-password" minLength={6} required /></label>
          <label className="terms"><input type="checkbox" required /> {t('I agree to Terms & Conditions')}</label>
          {error && <p className="error" role="alert">{t(error)}</p>}
          <button className="button primary full" type="submit">{t('Create Account')}</button>
        </form>
        <p className="auth-switch">{t('Already have an account?')} <button onClick={() => onNavigate('login')}>{t('Login')}</button></p>
      </>}
    </section>
    {notice && <div className="toast" role="status">{notice}</div>}
  </main>
}

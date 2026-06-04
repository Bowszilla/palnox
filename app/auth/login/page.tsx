'use client'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeSlash, Sparkle } from '@phosphor-icons/react'
import { GradientButton } from '@/components/ui/gradient-button'
import { createClient } from '@/lib/supabase/client'

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  )
}

function LoginForm() {
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirectTo') ?? '/dashboard'
  const urlError = searchParams.get('error')

  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const [isMagicLoading, setIsMagicLoading] = useState(false)
  const [error, setError] = useState<string | null>(
    urlError === 'oauth' ? 'Connexion Google annulée. Réessaie.' : null
  )
  const [magicSent, setMagicSent] = useState(false)

  const supabase = createClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(
        error.message === 'Invalid login credentials'
          ? 'Email ou mot de passe incorrect.'
          : error.message
      )
      setIsLoading(false)
      return
    }

    window.location.href = redirectTo
  }

  const handleGoogle = async () => {
    setIsGoogleLoading(true)
    setError(null)

    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    })
  }

  const handleMagicLink = async () => {
    if (!email) {
      setError('Entre ton email pour recevoir le lien magique.')
      return
    }
    setIsMagicLoading(true)
    setError(null)

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(redirectTo)}`,
      },
    })

    setIsMagicLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setMagicSent(true)
  }

  const inputStyle = {
    background: 'var(--surface-2)',
    border: '1px solid rgba(120,150,210,0.22)',
  }

  const inputEvents = {
    onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
      e.currentTarget.style.borderColor = 'var(--primary-500)'
      e.currentTarget.style.boxShadow = 'var(--focus-ring)'
    },
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => {
      e.currentTarget.style.borderColor = 'rgba(120,150,210,0.22)'
      e.currentTarget.style.boxShadow = 'none'
    },
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-5 py-10"
      style={{
        background: `
          radial-gradient(80% 50% at 50% -5%, rgba(46,143,232,0.18), transparent 60%),
          var(--bg-0)
        `,
      }}
    >
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo/logo-mark.png" alt="PALNOX" width={48} height={48} className="mb-3" />
          <h1 className="font-display font-bold text-h1 text-ink-1 tracking-tight">PALNOX</h1>
          <p className="text-body-sm text-ink-3 mt-1">The Ultimate Palworld Companion</p>
        </div>

        <div
          className="rounded-xl p-6 border"
          style={{ background: 'var(--grad-surface)', borderColor: 'rgba(120,150,210,0.22)' }}
        >
          <h2 className="font-display font-bold text-[20px] text-ink-1 mb-5">Connexion</h2>

          {/* Google OAuth */}
          <button
            type="button"
            onClick={handleGoogle}
            disabled={isGoogleLoading}
            className="w-full h-12 rounded-md font-display font-semibold text-[15px] text-ink-1 border flex items-center justify-center gap-2.5 transition-all duration-200 hover:border-primary-400 disabled:opacity-60 cursor-pointer mb-4"
            style={{ background: 'var(--surface-2)', borderColor: 'rgba(120,150,210,0.22)' }}
          >
            {isGoogleLoading ? (
              <span className="w-4 h-4 rounded-full border-2 border-ink-3 border-t-primary-400 animate-spin" />
            ) : (
              <GoogleIcon />
            )}
            Continuer avec Google
          </button>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex-1 h-px" style={{ background: 'rgba(120,150,210,0.12)' }} />
            <span className="text-[12px] text-ink-4 font-display">ou</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(120,150,210,0.12)' }} />
          </div>

          {error && (
            <div
              className="rounded-md px-4 py-3 mb-4 text-[13px] font-body"
              style={{ background: 'rgba(242,85,90,0.12)', color: 'var(--error-400)', border: '1px solid rgba(242,85,90,0.25)' }}
            >
              {error}
            </div>
          )}

          {magicSent ? (
            <div
              className="rounded-md px-4 py-3 text-[13px] font-body text-center"
              style={{ background: 'rgba(31,195,212,0.10)', color: 'var(--cyan-300)', border: '1px solid rgba(31,195,212,0.25)' }}
            >
              Lien envoyé ! Vérifie ta boîte mail.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-display font-semibold text-[12px] tracking-[0.04em] uppercase text-ink-3">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  required
                  className="h-12 px-4 rounded-md font-body text-[15px] text-ink-1 outline-none transition-all duration-200"
                  style={inputStyle}
                  {...inputEvents}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="font-display font-semibold text-[12px] tracking-[0.04em] uppercase text-ink-3">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full h-12 px-4 pr-12 rounded-md font-body text-[15px] text-ink-1 outline-none transition-all duration-200"
                    style={inputStyle}
                    {...inputEvents}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-3 cursor-pointer"
                  >
                    {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button type="button" className="text-[13px] font-display font-semibold" style={{ color: 'var(--primary-300)' }}>
                  Mot de passe oublié ?
                </button>
              </div>

              <GradientButton type="submit" fullWidth size="lg" isLoading={isLoading}>
                Se connecter
              </GradientButton>

              <button
                type="button"
                onClick={handleMagicLink}
                disabled={isMagicLoading}
                className="w-full h-12 rounded-md font-display font-semibold text-[15px] text-ink-1 border flex items-center justify-center gap-2 transition-all duration-200 hover:border-cyan-400 disabled:opacity-60 cursor-pointer"
                style={{ background: 'var(--surface-2)', borderColor: 'rgba(120,150,210,0.22)' }}
              >
                {isMagicLoading
                  ? <span className="w-4 h-4 rounded-full border-2 border-ink-3 border-t-cyan-400 animate-spin" />
                  : <Sparkle size={18} color="var(--cyan-300)" />
                }
                Connexion par lien magique
              </button>
            </form>
          )}
        </div>

        <p className="text-center text-[14px] text-ink-3 mt-6">
          Pas encore de compte ?{' '}
          <Link href="/auth/register" className="font-semibold" style={{ color: 'var(--primary-300)' }}>
            S&apos;inscrire
          </Link>
        </p>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}

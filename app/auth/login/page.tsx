'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeSlash, Sparkle } from '@phosphor-icons/react'
import { GradientButton } from '@/components/ui/gradient-button'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Supabase auth will be wired here
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = '/dashboard'
    }, 800)
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
        {/* Logo */}
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
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid rgba(120,150,210,0.22)',
                }}
                onFocus={e => { e.currentTarget.style.borderColor = 'var(--primary-500)'; e.currentTarget.style.boxShadow = 'var(--focus-ring)' }}
                onBlur={e => { e.currentTarget.style.borderColor = 'rgba(120,150,210,0.22)'; e.currentTarget.style.boxShadow = 'none' }}
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
                  style={{
                    background: 'var(--surface-2)',
                    border: '1px solid rgba(120,150,210,0.22)',
                  }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--primary-500)'; e.currentTarget.style.boxShadow = 'var(--focus-ring)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(120,150,210,0.22)'; e.currentTarget.style.boxShadow = 'none' }}
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
          </form>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-px" style={{ background: 'rgba(120,150,210,0.12)' }} />
            <span className="text-[12px] text-ink-4 font-display">ou</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(120,150,210,0.12)' }} />
          </div>

          {/* Magic link */}
          <button
            type="button"
            className="w-full h-12 rounded-md font-display font-semibold text-[15px] text-ink-1 border flex items-center justify-center gap-2 transition-all duration-200"
            style={{ background: 'var(--surface-2)', borderColor: 'rgba(120,150,210,0.22)' }}
          >
            <Sparkle size={18} color="var(--cyan-300)" />
            Connexion par lien magique
          </button>
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

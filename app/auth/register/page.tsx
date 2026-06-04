'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, EyeSlash } from '@phosphor-icons/react'
import { GradientButton } from '@/components/ui/gradient-button'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
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
          radial-gradient(80% 50% at 50% -5%, rgba(139,69,230,0.16), transparent 60%),
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
          <h2 className="font-display font-bold text-[20px] text-ink-1 mb-5">Créer un compte</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { id: 'username', label: 'Nom de dresseur', type: 'text', placeholder: 'Kael_Dresseur' },
              { id: 'email',    label: 'Email',            type: 'email', placeholder: 'ton@email.com' },
            ].map(({ id, label, type, placeholder }) => (
              <div key={id} className="flex flex-col gap-1.5">
                <label htmlFor={id} className="font-display font-semibold text-[12px] tracking-[0.04em] uppercase text-ink-3">
                  {label}
                </label>
                <input
                  id={id}
                  type={type}
                  placeholder={placeholder}
                  required
                  className="h-12 px-4 rounded-md font-body text-[15px] text-ink-1 outline-none transition-all duration-200 w-full"
                  style={{ background: 'var(--surface-2)', border: '1px solid rgba(120,150,210,0.22)' }}
                  onFocus={e => { e.currentTarget.style.borderColor = 'var(--primary-500)'; e.currentTarget.style.boxShadow = 'var(--focus-ring)' }}
                  onBlur={e => { e.currentTarget.style.borderColor = 'rgba(120,150,210,0.22)'; e.currentTarget.style.boxShadow = 'none' }}
                />
              </div>
            ))}

            <div className="flex flex-col gap-1.5">
              <label className="font-display font-semibold text-[12px] tracking-[0.04em] uppercase text-ink-3">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Min. 8 caractères"
                  required
                  minLength={8}
                  className="w-full h-12 px-4 pr-12 rounded-md font-body text-[15px] text-ink-1 outline-none transition-all duration-200"
                  style={{ background: 'var(--surface-2)', border: '1px solid rgba(120,150,210,0.22)' }}
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

            <GradientButton type="submit" fullWidth size="lg" isLoading={isLoading}>
              Créer mon compte
            </GradientButton>
          </form>

          <p className="text-center text-[12px] text-ink-4 mt-4 leading-relaxed">
            En t&apos;inscrivant, tu acceptes nos{' '}
            <span className="text-ink-3 cursor-pointer">conditions d&apos;utilisation</span>
            {' '}et notre{' '}
            <span className="text-ink-3 cursor-pointer">politique de confidentialité</span>.
          </p>
        </div>

        <p className="text-center text-[14px] text-ink-3 mt-6">
          Déjà un compte ?{' '}
          <Link href="/auth/login" className="font-semibold" style={{ color: 'var(--primary-300)' }}>
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  )
}

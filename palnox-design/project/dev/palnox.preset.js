/** PALNOX — Tailwind preset (web Next.js + React Native / NativeWind)
 *  import preset in tailwind.config: { presets: [require('./palnox.preset')] }
 *  Dark-only system; apply on a dark root.
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: { 50:'#E8F2FE',100:'#C7E0FC',200:'#93C5F8',300:'#5FA9F2',400:'#3D97EE',500:'#2E8FE8',600:'#1C74CC',700:'#155BA3',800:'#11457A',900:'#0C3158' },
        cyan:    { 100:'#B4F4FB',300:'#45E0EE',500:'#1FC3D4',700:'#137C8A' },
        violet:  { 100:'#DEC9FB',300:'#A66EF0',500:'#8B45E6',700:'#5C24A1' },
        bg:      { base:'#060A12', DEFAULT:'#0A0F1B', sunken:'#0E1422' },
        surface: { 1:'#131B2D', 2:'#1A2438', 3:'#243150', 4:'#2E3D60' },
        ink:     { 1:'#EEF3FF', 2:'#AEBBD8', 3:'#7787A8', 4:'#515E7C' },
        success:'#2FCB85', warning:'#F5A524', error:'#F2555A',
        rarity:  { common:'#8A97B8', rare:'#2E8FE8', epic:'#8B45E6', legendary:'#F5B638', alpha:'#F2555A', lucky:'#1FC3D4', boss:'#E0457E' },
      },
      fontFamily: {
        display: ['Chakra Petch', 'system-ui', 'sans-serif'],
        body:    ['Space Grotesk', 'system-ui', 'sans-serif'],
        stat:    ['Rajdhani', 'Chakra Petch', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['40px', { lineHeight: '44px', letterSpacing: '-0.02em' }],
        'h1': ['28px', { lineHeight: '34px' }],
        'h2': ['24px', { lineHeight: '30px' }],
        'title': ['18px', { lineHeight: '24px' }],
        'body': ['15px', { lineHeight: '22px' }],
        'caption': ['12px', { lineHeight: '16px' }],
      },
      borderRadius: { sm:'10px', md:'14px', lg:'18px', xl:'24px', '2xl':'32px' },
      backgroundImage: {
        'grad-brand':   'linear-gradient(135deg,#2E8FE8 0%,#8B45E6 100%)',
        'grad-cyan':    'linear-gradient(135deg,#29D6E6 0%,#2E8FE8 100%)',
        'grad-premium': 'linear-gradient(135deg,#8B45E6 0%,#F5B638 100%)',
      },
      boxShadow: {
        'glow-blue':   '0 8px 28px rgba(46,143,232,0.35)',
        'glow-violet': '0 8px 30px rgba(139,69,230,0.40)',
        'glow-premium':'0 8px 30px rgba(245,182,56,0.30)',
        'card':        '0 4px 14px rgba(0,0,0,0.45)',
      },
    },
  },
};

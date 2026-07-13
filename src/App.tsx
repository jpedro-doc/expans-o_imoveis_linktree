import { useRef, type MouseEvent, type ReactNode } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'
import { ArrowUpRight, Instagram, MessageCircle, MoveRight, Youtube } from 'lucide-react'
import houseImage from '../assets/casa-expansao.jpg'

const ease = [0.22, 1, 0.36, 1] as const
const whatsapp = 'https://wa.me/5586998138098?text=Ol%C3%A1%2C%20gostaria%20de%20falar%20com%20um%20consultor%20da%20Expans%C3%A3o%20Im%C3%B3veis.'
const instagram = 'https://www.instagram.com/expansaoimoveisthe/'
const website = 'https://www.expansaoimoveisthe.com.br/'

function Logo({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 80 68" role="img" aria-label="Símbolo Expansão" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M8 55 40 9l32 46" />
      <path d="M21 55 40 28l19 27" />
      <path d="M8 55h64" />
    </svg>
  )
}

function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: .8, delay, ease }}
    >
      {children}
    </motion.div>
  )
}

function MagneticLink({ children, href, className = '', label }: { children: ReactNode; href: string; className?: string; label?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 240, damping: 18 })
  const springY = useSpring(y, { stiffness: 240, damping: 18 })

  const move = (event: MouseEvent<HTMLAnchorElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    x.set((event.clientX - rect.left - rect.width / 2) * .08)
    y.set((event.clientY - rect.top - rect.height / 2) * .12)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={move}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      whileTap={{ scale: .985 }}
    >
      {children}
    </motion.a>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: ReactNode }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group relative grid size-11 touch-manipulation place-items-center text-charcoal outline-none transition-colors hover:text-crimson focus-visible:text-crimson lg:size-9"
      whileHover={{ y: -3 }}
      whileTap={{ scale: .9 }}
    >
      {children}
      <span className="absolute bottom-0 h-px w-0 bg-crimson transition-all duration-300 group-hover:w-full group-focus-visible:w-full" />
    </motion.a>
  )
}

function App() {
  const reduceMotion = useReducedMotion()
  const imageX = useMotionValue(0)
  const imageY = useMotionValue(0)
  const smoothX = useSpring(imageX, { stiffness: 70, damping: 20 })
  const smoothY = useSpring(imageY, { stiffness: 70, damping: 20 })
  const rotateX = useTransform(smoothY, [-.5, .5], [1.5, -1.5])
  const rotateY = useTransform(smoothX, [-.5, .5], [-1.5, 1.5])
  const photoX = useTransform(smoothX, [-.5, .5], [-10, 10])
  const photoY = useTransform(smoothY, [-.5, .5], [-10, 10])

  const trackPointer = (event: MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    imageX.set((event.clientX - rect.left) / rect.width - .5)
    imageY.set((event.clientY - rect.top) / rect.height - .5)
  }

  return (
    <div className="grain relative min-h-dvh overflow-hidden bg-[radial-gradient(circle_at_85%_8%,rgba(166,28,28,.055),transparent_30rem),linear-gradient(150deg,#fff_0%,#f7f7f5_100%)]">
      <motion.div
        aria-hidden="true"
        className="fixed left-0 top-0 z-50 h-[2px] bg-crimson"
        initial={{ width: 0 }}
        animate={{ width: '100%' }}
        transition={{ duration: 1.25, ease }}
      />

      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-crimson/[.035] blur-3xl" />

      <main className="page-main relative mx-auto grid min-h-dvh w-full max-w-[1180px] grid-cols-1 px-4 lg:grid-cols-[340px_minmax(440px,560px)] lg:grid-rows-[1fr_auto] lg:items-center lg:justify-center lg:gap-x-[clamp(4rem,8vw,8rem)] lg:px-12 lg:py-8">
        <section className="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left" aria-labelledby="brand-name">
          <Reveal delay={.05}>
            <Logo className="mb-1 w-10 text-crimson sm:w-12 lg:mb-4 lg:w-16" />
          </Reveal>

          <Reveal delay={.12}>
            <h1 id="brand-name" className="uppercase leading-none">
              <span className="block text-[clamp(1.7rem,8vw,3.45rem)] font-extrabold tracking-[.075em]">Expansão</span>
              <span className="mt-2 block text-[.58rem] font-bold tracking-[.62em] text-crimson [text-indent:.62em] sm:text-[.63rem] lg:mt-2.5 lg:text-xs">Imóveis</span>
            </h1>
          </Reveal>

          <Reveal delay={.2}>
            <p className="mt-4 text-[.68rem] font-medium leading-5 tracking-[.035em] sm:text-xs sm:leading-6 lg:mt-9 lg:text-[.8rem] lg:leading-7">
              As <strong className="font-bold text-crimson">melhores oportunidades</strong> em um só lugar.
            </p>
          </Reveal>

          <Reveal delay={.28}>
            <nav className="mt-2 flex gap-3 lg:mt-6 lg:gap-5" aria-label="Redes sociais">
              <SocialLink href={instagram} label="Instagram da Expansão Imóveis"><Instagram size={18} strokeWidth={1.6} /></SocialLink>
              <SocialLink href={whatsapp} label="WhatsApp da Expansão Imóveis"><MessageCircle size={18} strokeWidth={1.6} /></SocialLink>
              <SocialLink href="https://www.youtube.com/results?search_query=expansao+imoveis+the" label="YouTube da Expansão Imóveis"><Youtube size={19} strokeWidth={1.6} /></SocialLink>
            </nav>
          </Reveal>

          <Reveal delay={.35} className="mt-10 hidden items-center gap-4 lg:flex">
            <span className="h-px w-9 bg-charcoal/30" />
            <span className="text-[.48rem] font-bold uppercase tracking-[.28em] text-charcoal/60">Curadoria imobiliária</span>
          </Reveal>
        </section>

        <Reveal delay={.18} className="mt-5 w-full max-w-[530px] justify-self-center sm:mt-7 lg:mt-0">
          <section aria-label="Imóvel em destaque">
            <motion.figure
              onMouseMove={trackPointer}
              onMouseLeave={() => { imageX.set(0); imageY.set(0) }}
              style={reduceMotion ? undefined : { rotateX, rotateY, transformPerspective: 1200 }}
              className="image-group relative m-0"
            >
              <motion.div
                aria-hidden="true"
                className="absolute -left-1 top-3 z-20 flex items-center gap-2.5 bg-white/95 px-3 py-2 uppercase tracking-[.18em] shadow-[0_8px_30px_rgba(0,0,0,.05)] backdrop-blur-sm sm:-left-2 sm:top-4"
                initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: .85, duration: .6, ease }}
              >
                <span className="text-[.5rem] font-bold">Seleção</span><b className="text-[.72rem] text-crimson">01</b>
              </motion.div>

              <div className="image-mask relative h-[clamp(350px,52svh,520px)] overflow-hidden bg-neutral-300 shadow-[0_22px_60px_rgba(35,31,28,.14)] sm:h-[clamp(390px,58svh,600px)] lg:h-[clamp(460px,64vh,650px)] lg:shadow-[0_28px_80px_rgba(35,31,28,.15)]">
                <motion.img
                  src={houseImage}
                  width="1122"
                  height="1402"
                  fetchPriority="high"
                  alt="Residência contemporânea em concreto e vidro, cercada por vegetação tropical"
                  className="absolute -inset-3 size-[calc(100%+24px)] max-w-none object-cover object-[center_57%]"
                  style={reduceMotion ? undefined : { x: photoX, y: photoY, scale: 1.035 }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <div className="shine absolute inset-0" />
                <div className="absolute inset-x-4 bottom-4 z-10 flex justify-between text-[.45rem] font-semibold uppercase tracking-[.2em] text-white">
                  <span>Arquitetura contemporânea</span><span>Exp — 01</span>
                </div>
                <div className="vertical-copy absolute right-3 top-1/2 z-10 hidden -translate-y-1/2 text-[.42rem] font-semibold uppercase tracking-[.26em] text-white/70 sm:block">Teresina · Piauí</div>
              </div>
            </motion.figure>

            <div className="bg-white">
              <MagneticLink
                href={whatsapp}
                label="Falar com um consultor pelo WhatsApp"
                className="group grid min-h-[88px] touch-manipulation grid-cols-[auto_1fr_auto] items-center gap-3.5 border-b border-charcoal/35 px-4 text-[.72rem] font-semibold leading-[1.55] tracking-[.025em] outline-none transition-colors duration-300 active:border-crimson active:text-crimson hover:border-crimson hover:text-crimson focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-4 sm:min-h-24 sm:gap-4 sm:px-5"
              >
                <span className="grid size-10 place-items-center rounded-full border border-current transition-colors duration-300 group-active:bg-crimson group-active:text-white group-hover:bg-crimson group-hover:text-white sm:size-9"><MessageCircle size={16} strokeWidth={1.5} /></span>
                <span>Gostaria de falar<br />com um consultor?</span>
                <MoveRight className="transition-transform duration-300 group-hover:translate-x-1.5" size={29} strokeWidth={1.2} />
              </MagneticLink>

              <MagneticLink
                href={website}
                label="Ver imóveis disponíveis"
                className="group relative block min-h-[92px] touch-manipulation px-4 py-6 text-[.78rem] font-medium leading-6 outline-none active:bg-paper/60 focus-visible:ring-2 focus-visible:ring-crimson focus-visible:ring-offset-4 sm:px-5 sm:py-7 sm:text-[.82rem]"
              >
                Residencial ou comercial,<br /><strong className="font-bold text-crimson">temos a solução.</strong>
                <span className="absolute bottom-6 right-4 flex min-h-6 items-center gap-2 text-[.47rem] font-bold uppercase tracking-[.18em] sm:bottom-7 sm:right-5">
                  Ver imóveis <ArrowUpRight className="text-crimson transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" size={14} />
                </span>
              </MagneticLink>
            </div>
          </section>
        </Reveal>

        <Reveal delay={.55} className="col-span-full mt-6 flex w-full justify-between text-[.4rem] font-semibold uppercase tracking-[.16em] text-charcoal/55 sm:text-[.44rem] sm:tracking-[.2em] lg:mt-8">
          <span>Expansão Imóveis</span><span>@expansaoimoveisthe</span>
        </Reveal>
      </main>
    </div>
  )
}

export default App

import type { Metadata, Viewport } from "next"
import localFont from "next/font/local"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { TextCorruption } from "@/components/site/degraded-mode"
import { cn } from "@/lib/utils"

/* Polices de la cellule (charte SOC-01), servies depuis /public/typo */

// Corps de texte — TT Interphases Pro (variable)
const fontSans = localFont({
  src: "../public/typo/TT Interphases Pro Trial Variable.ttf",
  weight: "100 900",
  variable: "--font-sans",
  display: "swap",
})

// Données / mono — TT Interphases Pro Mono (variable)
const fontMono = localFont({
  src: "../public/typo/TT Interphases Pro Mono Trial Var Roman.ttf",
  weight: "100 900",
  variable: "--font-mono",
  display: "swap",
})

// Titres / display — KH Interference
const fontHeading = localFont({
  src: [
    { path: "../public/typo/KHInterferenceTRIAL-Light.otf", weight: "300", style: "normal" },
    { path: "../public/typo/KHInterferenceTRIAL-Regular.otf", weight: "400", style: "normal" },
    { path: "../public/typo/KHInterferenceTRIAL-Bold.otf", weight: "700", style: "normal" },
  ],
  variable: "--font-heading",
  display: "swap",
})

// Gros chiffres / signalétique — TT Interphases Pro Condensed
const fontDisplay = localFont({
  src: [
    { path: "../public/typo/TT Interphases Pro Trial Condensed Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/typo/TT Interphases Pro Trial Condensed ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../public/typo/TT Interphases Pro Trial Condensed Black.ttf", weight: "900", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
})

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "POLARIS — Cellule de communication du CCA · Programme AURORA",
    template: "%s · POLARIS",
  },
  description:
    "POLARIS, cellule de communication du Centre de Contrôle Aurora. Suivez en direct la mission AURORA : l'Odyssey IV en orbite de Kepler-452c, à 1 400 années-lumière de la Terre. Les premières images d'un autre monde sont imminentes.",
  applicationName: "POLARIS",
  authors: [{ name: "Cellule POLARIS — CCA" }],
  keywords: [
    "AURORA",
    "POLARIS",
    "CCA",
    "Centre de Contrôle Aurora",
    "Kepler-452c",
    "Odyssey IV",
    "mission spatiale",
    "exoplanète",
  ],
  openGraph: {
    title: "POLARIS — Programme AURORA",
    description:
      "L'Odyssey IV atteint l'orbite de Kepler-452c. Suivez la mission AURORA, en direct du Centre de Contrôle Aurora.",
    type: "website",
    locale: "fr_FR",
    siteName: "POLARIS",
    images: [
      {
        url: "/Landing_Diapo.png",
        width: 1130,
        height: 660,
        alt: "POLARIS — Cellule de communication du Programme AURORA",
      },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: "#FFFCF2",
  colorScheme: "light",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontSans.variable,
        fontHeading.variable,
        fontDisplay.variable,
        fontMono.variable,
        "font-sans"
      )}
    >
      <body className="bg-background text-foreground">
        {/* Mode dégradé (EVT-04C) : activé par défaut, posé avant hydratation
            pour éviter tout flash. Désactivable via le bandeau (localStorage). */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var d=document.documentElement;if(localStorage.getItem('polaris-comms')!=='nominal'){d.classList.add('degraded')}if(localStorage.getItem('polaris-fx')==='soft'){d.classList.add('fx-soft')}}catch(e){document.documentElement.classList.add('degraded')}})()",
          }}
        />
        <ThemeProvider forcedTheme="light">{children}</ThemeProvider>
        <TextCorruption />
      </body>
    </html>
  )
}

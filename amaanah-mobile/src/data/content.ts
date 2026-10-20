import type { Lesson, Provider, TabItem } from '../types';

export const tabs: readonly TabItem[] = [
  { key: 'home', label: 'Home', icon: '⌂' },
  { key: 'zakat', label: 'Zakat', icon: '✦' },
  { key: 'snapshot', label: 'Snapshot', icon: '▥' },
  { key: 'learn', label: 'Resources', icon: '▤' },
  { key: 'settings', label: 'Settings', icon: '⚙' },
];

export const lessons: readonly Lesson[] = [
  {
    id: 'sukuk',
    title: 'Sukuk',
    body: 'An Islamic certificate representing part-ownership in an asset or project. Returns arise from profit or rental income-not interest. Risks include asset performance, liquidity, and issuer risk.',
  },
  {
    id: 'funds',
    title: 'Halal mutual funds',
    body: 'Pooled funds holding Shariah-screened assets. Returns may come from growth and distributions. Screening reduces prohibited exposure but does not remove market risk.',
  },
  {
    id: 'gold',
    title: 'Gold',
    body: 'Physical gold or properly structured gold-backed instruments can store value. Gold has no yield, its price moves, and ownership and possession rules matter.',
  },
  {
    id: 'equities',
    title: 'Halal equities',
    body: 'Company shares that pass business-activity, debt, and non-compliant income screens. Company financials change, so screening must be maintained.',
  },
];

export const providers: readonly Provider[] = [
  {
    name: 'Lotus Capital',
    meta: 'SEC-registered Fund/Portfolio Manager',
    description: 'Offers Shariah-compliant funds and has participated in Nigerian Sukuk issuances.',
    badge: 'VERIFY CURRENT STATUS',
  },
  {
    name: 'FGN Sovereign Sukuk',
    meta: 'Government-issued instrument',
    description: 'Periodic infrastructure-linked Sukuk. Availability depends on active issuance windows.',
    badge: 'CHECK AVAILABILITY',
  },
  {
    name: 'Islamic finance windows',
    meta: 'Licensed PFAs and fund managers',
    description: 'Some Nigerian operators offer Islamic-compliant windows. Verify registration and current documents directly.',
    badge: 'CHECK REGISTRATION',
  },
];

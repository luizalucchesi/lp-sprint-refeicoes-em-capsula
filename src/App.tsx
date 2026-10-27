/* Main App Component - Handles routing (using react-router-dom), query client and other providers - use this file to add all routes */
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React, { Suspense } from 'react'
import Index from './pages/Index'
import Layout from './components/Layout'

const Toaster = React.lazy(() =>
  import('@/components/ui/toaster').then((m) => ({ default: m.Toaster })),
)
const Sonner = React.lazy(() =>
  import('@/components/ui/sonner').then((m) => ({ default: m.Toaster })),
)
const TooltipProvider = React.lazy(() =>
  import('@/components/ui/tooltip').then((m) => ({ default: m.TooltipProvider })),
)

const Obrigado = React.lazy(() => import('./pages/Obrigado'))
const PoliticaPrivacidade = React.lazy(() => import('./pages/PoliticaPrivacidade'))
const ExclusaoDeDados = React.lazy(() => import('./pages/ExclusaoDeDados'))
const NotFound = React.lazy(() => import('./pages/NotFound'))

const RouteFallback = () => (
  <div className="min-h-screen bg-cream flex items-center justify-center">
    <div className="w-8 h-8 rounded-full border-2 border-terracotta border-t-transparent animate-spin" />
  </div>
)

const App = () => (
  <BrowserRouter>
    <Suspense fallback={null}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </Suspense>
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Index />} />
          <Route path="/obrigado" element={<Obrigado />} />
          <Route path="/privacidade" element={<PoliticaPrivacidade />} />
          <Route path="/exclusao-de-dados" element={<ExclusaoDeDados />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
)

export default App

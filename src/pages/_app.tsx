import { AppProps } from 'next/app'
import BaseLayout from '@/components/layouts/BaseLayout'
import { TeamsProvider } from '@/contexts/TeamsContext'
import { SoccerFieldProvider } from '@/contexts/SoccerFieldContext'
import { RankProvider } from '@/contexts/RankContext'
import Router from 'next/router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//global styles
import '@/styles/global.scss'

//Binding events.
Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <BaseLayout>
      <SoccerFieldProvider>
        <TeamsProvider>
          <RankProvider>
            <Component {...pageProps} />
          </RankProvider>
        </TeamsProvider>
      </SoccerFieldProvider>
    </BaseLayout>
  )
}

export default MyApp

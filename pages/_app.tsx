import '@/styles/globals.css'
import type { AppProps } from 'next/app'

import { WagmiConfig, createClient, configureChains} from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { mainnet, goerli } from 'wagmi/chains'

const { provider, webSocketProvider } = configureChains(
  [mainnet, goerli],
  [
    publicProvider(),
    alchemyProvider({ apiKey: process.env.ALCHEMY_KEY || ''})
  ],
)

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={client}>
      <Component {...pageProps} />
    </WagmiConfig>
  )
}

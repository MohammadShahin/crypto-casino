import type { AppProps } from 'next/app'
import { chain, WagmiConfig, createClient, configureChains } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { ChakraProvider } from '@chakra-ui/react'
import { MetaMaskConnector } from 'wagmi/connectors/metaMask'
// const alchemyId = process.env.ALCHEMY_ID
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import Layout from '../src/components/Layout'
import Head from 'next/head'

const graphClient = new ApolloClient({
    uri: 'https://api.thegraph.com/subgraphs/name/hasankhadra/casino-subgraph',
    cache: new InMemoryCache(),
})

// const myProvider = getDefaultProvider(chain.polygonMumbai.id)

const { provider } = configureChains([chain.polygonMumbai], [publicProvider()])

// Set up client
const walletClient = createClient({
    autoConnect: false,
    connectors: [
        new MetaMaskConnector({
            chains: [chain.polygonMumbai],
            options: { shimDisconnect: true },
        }),
    ],
    provider: provider,
})

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <WagmiConfig client={walletClient}>
            <ApolloProvider client={graphClient}>
                <ChakraProvider>
                    <Layout>
                        <Head>
                            <title>Crypto Casino</title>
                            <meta
                                name="viewport"
                                content="initial-scale=1.0, width=device-width"
                            />
                        </Head>
                        <Component {...pageProps} />
                    </Layout>
                </ChakraProvider>
            </ApolloProvider>
        </WagmiConfig>
    )
}

export default MyApp

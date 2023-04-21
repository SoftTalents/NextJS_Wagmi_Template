import { useState } from 'react'
import { useAccount, useBalance, useConnect, useEnsName } from 'wagmi'
import { Loader, Button, Layout } from '../components';

export default function Home() {
  const [showWalletOptions, setShowWalletOptions] = useState(false);

  const { address, isConnected, isConnecting, isReconnecting } = useAccount();

  const { data: balanceData, isError, isLoading } = useBalance({
    address: address,
    chainId: 5 // goerli
  })

  const accountLoading = (isConnecting || isReconnecting);

  const loading = (accountLoading || isLoading) && !balanceData;

  const renderContent = () => {
    if (loading) return <Loader size={8} />;
    if (balanceData) {
      return (
        <>
          <h1 className="mb-8 text-4xl font-bold">My Wallet</h1>
          <div className="inline-flex place-items-center">
            <h6 className="ml-2 text-2xl">{`Ξ ${Number(
              balanceData?.formatted
            ).toFixed(4)} ${balanceData?.symbol}`}</h6>
          </div>
        </>
      );
    }

    return (
      <>
        <h1 className="mb-8 text-4xl font-bold">
          Welcome to the NextJS wagmi template!
        </h1>
        <Button
          loading={accountLoading}
          onClick={() => setShowWalletOptions(true)}
        >
          Connect to Wallet
        </Button>
      </>
    );
  };

  return (
    <Layout
      showWalletOptions={showWalletOptions}
      setShowWalletOptions={setShowWalletOptions}
    >
      <div className="grid h-screen place-items-center">
        <div className="grid place-items-center">{renderContent()}</div>
      </div>
    </Layout>
  )
}

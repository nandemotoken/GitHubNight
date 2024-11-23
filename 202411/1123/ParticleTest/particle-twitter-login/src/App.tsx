import React, { useEffect, useRef, useState } from 'react';
import { ethers } from 'ethers';
import { walletEntryPlugin, EntryPosition, WalletConfig } from '@particle-network/wallet';

const MAINNET_RPC = 'https://ethereum.publicnode.com';

interface EthereumProvider {
  request(payload: {
    method: string;
    params?: unknown[];
    chainId?: number;
  }): Promise<any>;
  on(event: string, listener: (...args: any[]) => void): this;
  removeListener?(event: string, listener: (...args: any[]) => void): this;
}

class CustomProvider implements EthereumProvider {
  private provider: ethers.JsonRpcProvider;
  private eventListeners: { [key: string]: ((...args: any[]) => void)[] } = {};

  constructor(rpcUrl: string) {
    this.provider = new ethers.JsonRpcProvider(rpcUrl);
  }

  async request({ method, params = [], chainId }: {
    method: string;
    params?: unknown[];
    chainId?: number;
  }): Promise<any> {
    try {
      // Map common Ethereum JSON-RPC methods
      switch (method) {
        case 'eth_chainId':
          const network = await this.provider.getNetwork();
          return network.chainId;
        
        case 'eth_blockNumber':
          const blockNumber = await this.provider.getBlockNumber();
          return '0x' + blockNumber.toString(16);
        
        case 'eth_getBalance':
          const balance = await this.provider.getBalance(params[0] as string);
          return balance.toString();
        
        case 'eth_call':
          return await this.provider.call(params[0] as any);
        
        case 'eth_estimateGas':
          const gas = await this.provider.estimateGas(params[0] as any);
          return gas.toString();
        
        case 'eth_getTransactionCount':
          const nonce = await this.provider.getTransactionCount(params[0] as string);
          return '0x' + nonce.toString(16);
        
        default:
          // Forward other requests directly to the provider
          return await this.provider.send(method, params);
      }
    } catch (error) {
      console.error(`Error in method ${method}:`, error);
      throw error;
    }
  }

  on(event: string, listener: (...args: any[]) => void): this {
    if (!this.eventListeners[event]) {
      this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(listener);
    
    // Set up provider events
    switch (event) {
      case 'block':
        this.provider.on('block', (blockNumber) => {
          listener(blockNumber);
        });
        break;
      case 'network':
        this.provider.on('network', (newNetwork, oldNetwork) => {
          listener(newNetwork, oldNetwork);
        });
        break;
    }
    
    return this;
  }

  removeListener(event: string, listener: (...args: any[]) => void): this {
    if (this.eventListeners[event]) {
      this.eventListeners[event] = this.eventListeners[event].filter(l => l !== listener);
    }
    
    // Remove provider events
    switch (event) {
      case 'block':
      case 'network':
        this.provider.removeListener(event, listener);
        break;
    }
    
    return this;
  }
}

const App: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [provider, setProvider] = useState<CustomProvider | null>(null);
  const [blockNumber, setBlockNumber] = useState<number | null>(null);

  useEffect(() => {
    const initProvider = async () => {
      try {
        const customProvider = new CustomProvider(MAINNET_RPC);
        setProvider(customProvider);

        // Get initial block number
        const currentBlock = await customProvider.request({ method: 'eth_blockNumber' });
        setBlockNumber(parseInt(currentBlock, 16));

        // Listen for new blocks
        customProvider.on('block', (blockNumber: number) => {
          setBlockNumber(blockNumber);
        });

        // Initialize wallet entry plugin
        walletEntryPlugin.init({
          projectId: process.env.REACT_APP_PROJECT_ID!,
          clientKey: process.env.REACT_APP_CLIENT_KEY!,
          appId: process.env.REACT_APP_APP_ID!,
        }, {
          erc4337: {
            name: "SIMPLE",
            version: "1.0.0"
          },
          visible: true,
          preload: true,
          entryPosition: EntryPosition.BR,
          topMenuType: 'close'
        });

        // Set up wallet core with custom provider
        walletEntryPlugin.setWalletCore({
          ethereum: customProvider,
        });

        walletEntryPlugin.walletEntryCreate();
      } catch (error) {
        console.error('Failed to initialize provider:', error);
      }
    };

    initProvider();

    return () => {
      walletEntryPlugin.walletEntryDestroy();
    };
  }, []);

  const handleOpenWallet = () => {
    walletEntryPlugin.openWallet({
      windowSize: 'large',
      topMenuType: 'close'
    });
  };

  const handleCheckBalance = async () => {
    if (!provider) return;
    
    try {
      const address = '0xde0B295669a9FD93d5F28D9Ec85E40f4cb697BAe';
      const balance = await provider.request({ 
        method: 'eth_getBalance',
        params: [address, 'latest']
      });
      alert(`Balance: ${ethers.formatEther(balance)} ETH`);
    } catch (error) {
      console.error('Failed to check balance:', error);
    }
  };

  const handleGetChainId = async () => {
    if (!provider) return;
    
    try {
      const chainId = await provider.request({ method: 'eth_chainId' });
      alert(`Chain ID: ${parseInt(chainId.toString())}`);
    } catch (error) {
      console.error('Failed to get chain ID:', error);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Particle Network Wallet Integration</h1>
      
      {blockNumber && (
        <p className="mb-4 text-gray-600">
          Current Block: {blockNumber.toLocaleString()}
        </p>
      )}
      
      <div className="space-y-4">
        <button 
          onClick={handleOpenWallet}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Open Wallet
        </button>

        <button 
          onClick={handleCheckBalance}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Check Example Balance
        </button>

        <button 
          onClick={handleGetChainId}
          className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
        >
          Get Chain ID
        </button>
      </div>
    </div>
  );
};

export default App;
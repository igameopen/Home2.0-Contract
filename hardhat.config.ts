import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'

require('dotenv').config()

const PRIVATE_KEY = process.env.PRIVATE_KEY || ''
const API_KEY = process.env.API_KEY || ''

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.19',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  defaultNetwork: 'localhost',
  networks: {
    localhost: {
      accounts: {
        mnemonic: 'test test test test test test test test test test test junk',
        count: 801
      }
    },
    arbitrumGoerli: {
      url: 'https://goerli-rollup.arbitrum.io/rpc',
      chainId: 421613,
      accounts: [PRIVATE_KEY]
    }
  },
  mocha: {
    timeout: 400000
  },
  etherscan: {
    apiKey: {
      arbitrumOne: API_KEY,
      arbitrumGoerli: API_KEY
    }
  }
}

export default config

import { ethers } from 'hardhat'
import { ExplorersEdition } from '../typechain-types'
import { HardhatEthersSigner } from '@nomicfoundation/hardhat-ethers/signers'
import { expect } from 'chai'

describe('ExplorersEdition', function () {
  let contract: ExplorersEdition
  let owner: HardhatEthersSigner
  let price = ethers.parseEther('0.2')

  before(async function () {
    const [signer] = await ethers.getSigners()
    owner = signer
    contract = await ethers.deployContract('ExplorersEdition')
    contract.waitForDeployment()
  })

  describe('初始化', async function () {
    it('设置售卖价格', async function () {
      await contract.setMintPrice(price)
      expect(await contract.mintPrice()).to.equal(price)
    })

    it('设置bashURI', async function () {
      await contract.setBaseURI('ipfs:/asdsd/')
    })
  })

  // describe('管理员操作', async function () {
  //   it('奖励系列1 100 个', async function () {
  //     await contract.ownerMint(owner.address, 1, 100)
  //   })
  // })

  describe('售卖阶段1', function () {
    it('设置售卖阶段1', async function () {
      await contract.setStage(1)
      expect(await contract.stage()).to.equal(1)
    })

    it('无白名单购买', async function () {
      await contract.mint({
        value: price
      })
    })

    it('添加白名单', async function () {
      await contract.addWhiteList(owner.address)
    })

    it('白名单购买', async function () {
      await contract.mint({
        value: price
      })
    })

    it('重复购买', async function () {
      await contract.mint({
        value: price
      })
    })

    it('查看uri', async function () {
      const tokenID = await contract.tokenOfOwnerByIndex(owner.address, 0)
      console.log(`token uri: ${await contract.tokenURI(tokenID)}`)
    })
  })

  describe('售卖阶段2 剩下799个钱包全买了', function () {
    it('设置售卖阶段2', async function () {
      await contract.setStage(2)
      expect(await contract.stage()).to.equal(2)
    })

    it('修改账户余额', async function () {
      const signers = await ethers.getSigners()
      for (let i = 1; i < signers.length; i++) {
        const signer = signers[i]
        ethers.provider.send('hardhat_setBalance', [signer.address, '0x8AC7230489E80000'])
      }
    })

    it('买tm的', async function () {
      const signers = await ethers.getSigners()
      for (let i = 1; i < signers.length - 1; i++) {
        const signer = signers[i]
        await contract.connect(signer).mint({
          value: price
        })
      }
    })

    it('超出购买测试', async function () {
      const signers = await ethers.getSigners()
      const signer = signers[signers.length - 1]
      await contract.connect(signer).mint({
        value: price
      })
    })
  })

  describe('售卖阶段3', function () {
    it('设置售卖阶段3', async function () {
      await contract.setStage(3)
      expect(await contract.stage()).to.equal(3)
    })

    it('设置盲盒URL', async function () {
      await contract.connect(owner).setSpecialHiddenURI('ipfs://mmmmmm')
    })

    it('把nft各个系列转到owner', async function () {
      const uri = await contract.tokenURI(await contract.tokenOfOwnerByIndex(owner.address, 0))
      const series = uri.substring(uri.length - 3, uri.length - 2)
      const ownerSeries: string[] = []
      ownerSeries.push(series)

      const signers = await ethers.getSigners()
      for (let i = 1; i < signers.length - 1; i++) {
        const signer = signers[i]
        const tokenID = await contract.tokenOfOwnerByIndex(signer.address, 0)
        const uri = await contract.tokenURI(tokenID)
        const series = uri.substring(uri.length - 3, uri.length - 2)
        if (ownerSeries.indexOf(series) == -1) {
          // 转账
          await contract.connect(signer).transferFrom(signer.address, owner.address, tokenID)

          ownerSeries.push(series)
          console.log(ownerSeries)
          if (ownerSeries.length == 8) {
            break
          }
        }
      }

      expect(await contract.canMintSpecial(owner.address)).to.be.eq(true)
    })

    it('购买99系列 nft', async function () {
      await contract.connect(owner).specialMint({
        value: price
      })
      const balance = await contract.balanceOf(owner)
      console.log(`balance ${balance}`)

      for (let i = 0; i < balance; i++) {
        const tokenID = await contract.tokenOfOwnerByIndex(owner.address, i)
        console.log(`tokenID: ${tokenID}; url: ${await contract.tokenURI(tokenID)}`)
      }
    })

    it('卖出个数', async function () {
      console.log(`supper ${await contract.totalSupply()}`)
    })

    it('设置开启盲盒', async function () {
      await contract.connect(owner).setSpecialHidden(false)
    })

    it('测试 nft uri', async function () {
      const balance = await contract.balanceOf(owner)
      console.log(`balance ${balance}`)

      for (let i = 0; i < balance; i++) {
        const tokenID = await contract.tokenOfOwnerByIndex(owner.address, i)
        console.log(`tokenID: ${tokenID}; url: ${await contract.tokenURI(tokenID)}`)
      }
    })

    it('现在不能mint 99', async function () {
      expect(await contract.canMintSpecial(owner.address)).to.be.eq(false)
    })

    it('转去别的号再mint 99', async function () {
      const signer = (await ethers.getSigners())[2]

      const balance = await contract.balanceOf(owner)

      const tokenIDs: bigint[] = []
      for (let i = 0; i < balance; i++) {
        const tokenID = await contract.tokenOfOwnerByIndex(owner, i)
        tokenIDs.push(tokenID)
      }

      for (let i = 0; i < tokenIDs.length; i++) {
        await contract.transferFrom(owner, signer, tokenIDs[i])
      }

      await contract.connect(signer).specialMint({
        value: price
      })
    })
  })

  // it('mint test', async function () {
  //   const currentBalance = await ethers.provider.getBalance(contract.target)
  //   await contract.mint({
  //     value: price
  //   })
  //   expect(await ethers.provider.getBalance(contract.target)).to.equal(currentBalance + price)
  // })

  // it('withdraw', async function () {
  //   const contractBalance = await ethers.provider.getBalance(contract.target)
  //   const ownerBalance = await ethers.provider.getBalance(owner.address)

  //   const tx = await contract.withdraw(owner.address)
  //   const receipt = await tx.wait()
  //   console.log(`block number is ${receipt!.blockNumber}`)

  //   const totalGasPrice = receipt!.gasUsed * receipt!.gasPrice

  //   expect(await ethers.provider.getBalance(owner.address)).to.equal(ownerBalance + contractBalance - totalGasPrice)
  // })
})

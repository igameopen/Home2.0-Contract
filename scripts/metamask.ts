import { ethers, run } from 'hardhat'

async function main() {
  //   let contract = await ethers.deployContract('ExplorersEdition')
  //   contract.waitForDeployment()
  //   console.log(`Contract with deployed to ${contract.target}`)
  //   const [owner] = await ethers.getSigners()
  //   await contract.setBaseURI('ipfs://bafybeifkubdec34m25er55wuqux2i7bmbzq22nwcym2qd5i7hte5pfc5bi/')
  //   await contract.ownerMint(owner, 0, 3)
  //   const balance = await contract.balanceOf(owner)
  //   for (let i = 0; i < balance; i++) {
  //     const tokenID = await contract.tokenOfOwnerByIndex(owner, i)
  //     const uri = await contract.tokenURI(tokenID)
  //     console.log(`id: ${tokenID}; uri: ${uri}`)
  //   }
  //   await test()
  await open()
}

async function test() {
  let contract = await ethers.getContractAt('ExplorersEdition', '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9')
  const [owner] = await ethers.getSigners()
  await contract.ownerMint(owner, 8, 1)
  await contract.setSpecialHiddenURI('ipfs://bafybeid2mrmmxrhuduei4ez45qcsdnsw4syobdnsfemuhls2ozl3zxvudi')

  const balance = await contract.balanceOf(owner)
  for (let i = 0; i < balance; i++) {
    const tokenID = await contract.tokenOfOwnerByIndex(owner, i)
    const uri = await contract.tokenURI(tokenID)

    console.log(`id: ${tokenID}; uri: ${uri}`)
  }
}

async function open() {
  let contract = await ethers.getContractAt('ExplorersEdition', '0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9')
  await contract.setSpecialHidden(false)

  const [owner] = await ethers.getSigners()
  const balance = await contract.balanceOf(owner)
  for (let i = 0; i < balance; i++) {
    const tokenID = await contract.tokenOfOwnerByIndex(owner, i)
    const uri = await contract.tokenURI(tokenID)

    console.log(`id: ${tokenID}; uri: ${uri}`)
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

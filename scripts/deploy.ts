import { ethers, run } from 'hardhat'

async function main() {
  let contract = await ethers.deployContract('ExplorersEdition')
  contract.waitForDeployment()

  console.log(`Contract with deployed to ${contract.target}`)
  console.log('setBaseURI')
  await contract.setBaseURI('ipfs://bafybeifkubdec34m25er55wuqux2i7bmbzq22nwcym2qd5i7hte5pfc5bi/')
  console.log('setSpecialHiddenURI')
  await contract.setSpecialHiddenURI('ipfs://bafybeid2mrmmxrhuduei4ez45qcsdnsw4syobdnsfemuhls2ozl3zxvudi')
  console.log('setMintPrice')
  await contract.setMintPrice(ethers.parseEther('0.022'))

  console.log('Verifying contract...')
  try {
    await run('verify:verify', {
      address: contract.target,
      constructorArguments: []
    })
  } catch (e) {
    if ((e as TypeError).message.toLowerCase().includes('already verified')) {
      console.log('Already Verified!')
    } else {
      console.log(e)
    }
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

import { ethers, run } from 'hardhat'

async function main() {
  let contract = await ethers.deployContract('ExplorersEdition')
  contract.waitForDeployment()

  console.log(`Contract with deployed to ${contract.target}`)

  await contract.setBaseURI('ipfs://xxxx/')
  await contract.setStage(1)
  await contract.setMintPrice(1)
  await contract.setSellingTime(1692527776)

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

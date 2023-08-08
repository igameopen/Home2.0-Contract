import { ethers, run } from 'hardhat'

async function main() {
  console.log('Verifying contract...')
  try {
    await run('verify:verify', {
      address: '0x20C44b8ded76049679cCA58f33A4BBA939a90A1c',
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

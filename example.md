# ExplorersEdition Project

<!-- https://arbiscan.io/address/0x3733c99fcfcb6be3d92873fab0b8f9897b07fb29 -->

## 读取方法

1. 售卖阶段  
   `stage()`

2. 铸造价格  
   `mintPrice()`

3. 各个系列已售卖个数  
   `seriesSaleCounts(uint256)`

4. 是否白名单  
   `whiteList(address)`

5. token id 是否已经 mint 99 NFT  
   `tokenMinted(uint256)`

6. 是否盲盒  
   `specialHidden()`

## 用户方法

1. 铸造  
   `mint()`

2. 能否铸造最后的 99 个  
   `canMintSpecial(address)`

3. 99 个铸造  
   `specialMint()`

## 后台管理方法

1. 设置售卖阶段  
    `setStage(uint256)`  
   阶段 1 为只能白名单购买  
   阶段 2 为公售  
   阶段 3 为可以 mint 99 个 NFT

2. 设置售卖价格  
   `setMintPrice(uint256)`  
   设置售卖价格的单位为 wei, 例如价格为 0.022 ETH 则输入的参数应该是 22000000000000000  
   即 0.022 乘以 10 的 18 次方, 以此类推

3. 设置是否解开盲盒  
   `setSpecialHidden(bool)`  
   99 个 nft 的盲盒开关, 是盲盒输入 `true` , 否则输入 `false`  
   默认为盲盒状态, 要打开盲盒的时候输入 `false` 即可

4. 设置盲盒 tokenURI  
   `setSpecialHiddenURI(string)`

5. 添加白名单列表  
   `addWhiteLists(address[])`  
   添加多个地址为白名单, 入参格式 `[地址1, 地址2, 地址3, ...]`  
   入参示例 `[0x123123213123, 0x1231243255435435435, 0x123213123]`

6. 添加白名单  
   `addWhiteList(address)`  
   添加某个地址为白名单  
   入参示例 `0x12321312312312321`

7. 移除白名单  
   `removeWhiteList(address)`  
   把某个地址移除白名单  
   入参示例 `0x123123213123132`

8. 设置 baseURL  
   `setBaseURI(string)`

9. 提现  
   `withdraw(address)`  
   把合约的余额转到接收地址  
   参数为接收地址

10. 官方铸造 NFT  
    `ownerMint(address,uint256,uint256)`  
    官方铸造某个系列 NFT 给对应地址, 可以铸造多张. 铸造多张时, 只能是同一个系列;  
    参数 1 铸造 NFT 的地址  
    参数 2 系列 ID, 0-8, 8 为最后 99 个 NFT  
    参数 3 铸造多少个

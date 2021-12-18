const main = async () => {
    const gameContractFactory = await hre.ethers.getContractFactory('MyPizzaGame');
    const gameContract = await gameContractFactory.deploy(
      ["Joe's Pizza", "Prince St Pizza", "Artichoke's Pizza"],       // Names
      ["https://pyxis.nymag.com/v1/imgs/396/5d8/a3bc3843a3e63556254dbddaae43c2e40d-joes-pizza-01.rsocial.w1200.jpg", // Images
      "https://cdn.vox-cdn.com/thumbor/YvZnIF3L5qAaNtBYmFz1iV2KLwM=/0x0:2000x1335/1520x1013/filters:focal(840x508:1160x828):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/68650626/prince_street_pizza_psp_la.0.jpg", 
      "https://i.pinimg.com/564x/3c/b6/26/3cb626e79ad01218140d96034e9d05c0.jpg"],
      [50, 200, 150],                    // HP values
      [75, 50, 25]                       // Attack damage values
    );
    await gameContract.deployed();
    console.log("Contract deployed to:", gameContract.address);

    let txn;
    // We only have three characters.
    // an NFT w/ the character at index 2 of our array.
    txn = await gameContract.mintCharacterNFT(2);
    await txn.wait();

    // Get the value of the NFT's URI.
    let returnedTokenUri = await gameContract.tokenURI(1);
    console.log("Token URI:", returnedTokenUri);
  };
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();
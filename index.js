document.addEventListener("DOMContentLoaded", async () => {
  console.log("ahoy !");
  console.log("=================");

  const connectButton = document.querySelector(".connect-metamask");
  const addresssButton = document.querySelector(".get-marketplace-address");
  const addressBox = document.querySelector(".address-box");
  const errorBox = document.querySelector(".error");
  const connectedAddressBox = document.querySelector(".connected-address");
  const footer = document.querySelector(".footer");
  let NFTContractFactory;

  const marketplaceAbi = [
    {
      inputs: [
        {
          internalType: "address",
          name: "nftAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "buyNft",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "buyer",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "seller",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
      ],
      name: "ItemBought",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "seller",
          type: "address",
        },
        {
          indexed: true,
          internalType: "address",
          name: "nftAddress",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
      ],
      name: "ItemListed",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "nftAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
        {
          internalType: "uint256",
          name: "price",
          type: "uint256",
        },
      ],
      name: "listNft",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "withdraw",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "seller",
          type: "address",
        },
      ],
      name: "balance",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "nftAddress",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "tokenId",
          type: "uint256",
        },
      ],
      name: "getNft",
      outputs: [
        {
          components: [
            {
              internalType: "uint256",
              name: "price",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "seller",
              type: "address",
            },
          ],
          internalType: "struct NFTMarketplace.NFT",
          name: "",
          type: "tuple",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  const marketplaceContractAddress =
    "0xeb9edf8af463234d2666614ea6421ffcfc34cf79";

  async function connectMetaMask() {
    if (window.ethereum != "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);

      const signer = provider.getSigner();

      return { signer, provider };
    } else {
      console.log("metamask not installed");
    }
  }

  function getMarketPlaceAddress() {
    errorBox.textContent = "";
    if (!NFTContractFactory) {
      errorBox.textContent = "connect your wallet first please";
      return;
    }

    console.log(NFTContractFactory.address);
    addressBox.textContent = NFTContractFactory.address;
  }

  // console.log(await signer.getAddress());

  connectButton.addEventListener("click", async () => {
    const { signer } = await connectMetaMask();

    if (signer) {
      errorBox.textContent = "";

      connectButton.textContent = "connected";
      connectedAddressBox.textContent =
        (await signer.getAddress()).slice(0, 4) +
        "..." +
        (await signer.getAddress()).slice(-4);
      NFTContractFactory = new ethers.Contract(
        marketplaceContractAddress,
        marketplaceAbi,
        signer
      );
      console.log(NFTContractFactory);
      footer.style.display = "block";
    } else {
      return;
    }
  });

  addresssButton.addEventListener("click", async () => {
    getMarketPlaceAddress();
  });
});

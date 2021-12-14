import type { HardhatRuntimeEnvironment } from "hardhat/types";

import type { WagumiCats } from "@/typechain/WagumiCats";
import type { WagumiCats__factory } from "@/typechain/factories/WagumiCats__factory";

const deploy = async ({ ethers, network }: HardhatRuntimeEnvironment) => {
  if (network.name !== "hardhat") {
    return;
  }

  const wagumiCatsFactory = (await ethers.getContractFactory(
    "WagumiCats",
  )) as WagumiCats__factory;
  const wagumiCats: WagumiCats = await wagumiCatsFactory.deploy(
    "https://cats.wagumi.xyz/metadata/",
  );
  await wagumiCats.deployed();
  await wagumiCats.ownerBatchMint();
  await wagumiCats.setSaleIsActive(true);
  await wagumiCats.transferOwnership(
    "0xDCE4694e268bD83EA41B335320Ed11A684a1d7dB",
  );
};

deploy.tags = ["WagumiCats"];

export default deploy;

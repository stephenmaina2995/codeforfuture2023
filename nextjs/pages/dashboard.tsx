import { ethers } from "ethers";
import "dotenv/config";

const Dashboard = () => {
  const ownerAddress = "0x46235044283cd02df4212b774d6904cadee0ddde";

  const provider = new ethers.JsonRpcProvider(process.env.NODE_URL);

  const filter = {
    fromBlock: 0,
    toBlock: "latest",
    topics: [
      ethers.id("ContractCreated(address)"),
      null,
      ethers.zeroPadValue(ownerAddress, 32),
    ],
  };

  provider
    .getLogs(filter)
    .then((logs) => {
      logs.forEach((log) => {
        console.log(`Contract found at address: ${log.address}`);
      });
    })
    .catch((error) => console.error(error));

  return <>Dashboard</>;
};

export default Dashboard;

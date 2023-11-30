"use client";

import Link from "next/link";
import { useRouter } from "next/router";
//import { ethers } from "ethers";
import { useEffect, useState } from "react";

const getEthereumObject = () => window.ethereum;
const findMetaMaskAccount = async () => {
  try {
    const ethereum = getEthereumObject();

    if (!ethereum) {
      console.error("Make sure you have Metamask!");
      return null;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      return account;
    } else {
      console.error("No authorized account found");
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const NavLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  return (
    <Link
      href={href}
      passHref
      className={`${isActive ? "shadow-md" : ""} py-1.5 px-3 rounded-full`}
    >
      {children}
    </Link>
  );
};

export const Header = () => {
  //State setters
  const [currentAccount, setCurrentAccount] = useState("");

  const connectWallet = async () => {
    try {
      const ethereum = getEthereumObject();
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    findMetaMaskAccount().then((account) => {
      if (account !== null) {
        setCurrentAccount(account);
      }
    });
  }, []);

  const navLinks = (
    <>
      <li>
        <NavLink href="/">Home</NavLink>
      </li>
      <li>
        <NavLink href="/dashboard">Account</NavLink>
      </li>
    </>
  );

  return (
    <div className="flex justify-between w-full mb-16 py-4 px-2">
      <nav className="flex list-none gap-2">{navLinks}</nav>
      {
        <button
          className="rounded-full border py-1.5 px-3"
          onClick={connectWallet}
        >
          {!currentAccount
            ? "Connect Wallet"
            : currentAccount.slice(0, 4) + "..." + currentAccount.slice(-4)}
        </button>
      }
    </div>
  );
};

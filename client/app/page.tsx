import { useState, useEffect } from "react";
import { contractAddress } from "../config";
import { ethers } from "ethers";

import Library from "../abi/Library.json"
import { NextPage } from "next";
import Book from "./components/Book";

declare let window: any; 

const Home:NextPage = () => {
  const [ currentAccount, setCurrentAccount ] = useState('');
  const [ bookName, setBookName ] = useState('')
  const [ bookAuthor, setBookAuthor ] = useState('')
  const [ bookYear, setBookYear ] = useState('')
  const [ bookFinished, setBookFinished ] = useState([])
  const [ booksUnfinished, setBookUnfinished ] = useState([]) 

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }

      const chainId = await ethereum.request({method: 'eht_chainId'})
      const mainnetChainId = '0x5'

      if (chainId !== mainnetChainId) {
        alert("You are not connected to Mainnet network");
        return;
      } 

      const accounts = await ethereum.request({method: 'eth_chainId'})
      setCurrentAccount(accounts[0]);

    } catch (error) {
      console.log("Error connecting to metamask", error);
      
    }
  }

  const submitBook = async () => {
    const book = {
      'name': bookName,
      'year': parseInt(bookYear),
      'author': bookAuthor,
      'finished': bookFinished == 'yes' ? true : false
    }

    try {
      const {ethereum} = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const LibraryContract = new ethers.Contract(contractAddress, Library.abi, signer)
        const libraryTx = await LibraryContract.addBook(book.name, book.year, book.author, book.finished)
        console.log(libraryTx);
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (error) {
      console.error(error);
    }
  }

  const getBooks = async () => {
    try {
      const {ethereum} = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const LibraryContract = new ethers.Contract(contractAddress, Library.abi, signer)

        const booksFinished = await LibraryContract.getFinishedBooks()
        const booksUnfinished = await LibraryContract.getUnFinishedBooks()

        setBookFinished(booksFinished)
        setBookUnfinished(booksUnfinished)
      } else {
        console.log("Ethereum object does not exist");
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center bg-[#f3f6f4] text-[#6a50aa] min-h-screen pb-20">
        <div className="transition hover:rotate-180 hover:scale-105 duration-500 ease-in-out"></div>
        <h2 className="text-3xl font-bold mb-20 mt-20">
          Manage your Personal Library
        </h2>
        {
          currentAccount === '' ? (
            <button className="text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition" onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <div>
              <div className="text-3xl font-bold mb-20 mt-12">
                <h4>
                  Wallet Connected: { currentAccount }
                </h4>
              </div>
              <div>
                <div className="text-xl font-semibold mb-20 mt-4">
                  <input className="text-xl font-bold mb-2 mt-1" type="text" placeholder="Book name" value={bookName} onChange={(e) => setBookName(e.target.value)} />
                  <br />
                  <input className="text-xl font-bold mb-2 mt-1" type="text" placeholder="Book author" value={bookAuthor} onChange={(e) => setBookAuthor(e.target.value)} />
                  <br />
                  <input className="text-xl font-bold mb-2 mt-1" type="text" placeholder="Book year" value={bookYear} onChange={(e) => setBookYear(e.target.value)} />
                  <br />
                  <label>
                    Have you finished reading this booking ?
                    <select value={bookAuthor} onChange={(e) => (e.target.value)}>
                      <option value="yes">yes</option>
                      <option value="no">no</option>
                    </select>
                  </label>
                  <button className="text-xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 ml-5 hover:scale-105 transition duration-500 ease-in-out"
                    onClick={submitBook}
                  >Add Book</button>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <div className="font-semibold text-lg text-center mb-4">
                    Books List
                  </div>
                  <button className="text-xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition duration-500 ease-in-out">Get Books</button>
                  {
                    booksUnfinished.length > 0 ?
                      <div className="font-semibold text-lg text-center mb-4 mt-5">
                        Books Unfinished ({booksUnfinished.length})
                      </div> : <div></div>
                  }

                  <div className="flex flex-col justify-center items-center">
                    {
                      booksUnfinished.map((book) => (
                        <Book
                          key={book.id}
                          id={parseInt(book.id)}
                          name={book.name}
                          year={parseInt(book.year).toString()}
                          author={book.author}
                          finished={book.finished.toString()}
                          clickBookFinished={null}
                        ></Book>
                      ))
                    }
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </div>
    </>
  )
}

export default Home;
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { Avatar } from '@/components/avatar'
import { Channel } from '@/components/channel'
import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import Channels from './channels'

export default function Home(){

  const router = useRouter()

  const [loggedUser, setLoggedUser] = useState('Unnamed')

  console.log(loggedUser)

  //pass logged user to channels page as props without using router
  const handleLogin = () => {
    router.push({
      pathname: '/channels',
      query: {
        loggedUser: loggedUser
        },
    })
  }

  //click when enter is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin()
    }
  }

  return (
    <>
      <Head>
            <title>Quacker</title>
            <meta name="description" content="Messenger app and discord clone" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/donald.png" />
      </Head>
      <main className={styles.main}>
        <div className={styles.container}>
        <h2>What's your name?</h2>
        <input
          type="text"
          placeholder="Username"
          onKeyDown={handleKeyDown}
          onChange={(e) => {
            setLoggedUser(e.target.value)
          }}
        />
        <button
          onClick={() => handleLogin()}
        > Start Chatting</button>
        </div>
      </main>
    </>
    
  )
}

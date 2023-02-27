import {useState, useEffect} from 'react'
import axios from 'axios'
import Head from 'next/head'
import styles from '@/styles/Channels.module.css'
import { Avatar } from '@/components/avatar'
import { Channel } from '@/components/channel'
import { useRouter } from 'next/router'
import { getAllChannels } from '@/database'
import AddChannel from '@/components/addChannel'

function wait(seconds) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve()
        }, seconds * 1000)
    })
}

export default function Channels({channels, loggedUser}) {

    const [newChannels, setNewChannels] = useState(channels)

    const [activeChannel, setActiveChannel] = useState(1)
    console.log(activeChannel)

    const router = useRouter()

    //set active channel when channel is clicked with query params
    const handleChannelClick = (channel) => {
        setActiveChannel(channel)
        router.push({
            pathname: `channels/${channel}`,
            query: {
                activeChannel: channel, 
                loggedUser: loggedUser
            },
        })
    }
    
    console.log(loggedUser)

    return (
        <>
        <Head>
            <title>Quacker</title>
            <meta name="description" content="Messenger app and discord clone" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/donald.png" />
        </Head>
        <main className={styles.main}>
         
          <div className={styles.avatarcontainer}>
            <Avatar src='/donald.png'/>
          </div>
  
          <div className={styles.channelcontainer}>
            <div className={styles.bar}>
              <h2>Channels</h2>
            </div>
     {/* get active channel */}
            <div className={styles.channelboard}>
                {newChannels.map((channel) => (
                    
                    <Channel
                        onClick={() => handleChannelClick(channel.id)}
                        key={channel.id}
                        name={channel.name}
                        channelid={channel.id}
                        image={channel.image}
                    />
                ))}
            
            </div>
            <AddChannel channels={newChannels} setNewChannels={setNewChannels} />
          </div>
        </main>
      </>
    )
}

export async function getServerSideProps(context) {

    const { loggedUser } = context.query
    console.log(loggedUser)

    // runs on the server
    const channels = await getAllChannels();

    return {
        props: {
            channels: JSON.parse(JSON.stringify(channels)),
            loggedUser: (loggedUser ? JSON.parse(JSON.stringify(loggedUser)) : 'unnamed')
        }
    }

}

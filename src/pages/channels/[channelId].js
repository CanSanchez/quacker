import { getAllMessages } from "@/database";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import Head from 'next/head'
import styles from '@/styles/Messages.module.css'
import { Avatar } from '@/components/avatar'
import { Channel } from '@/components/channel'
import { useRouter } from 'next/router'
import { getAllChannels } from '@/database'
import AddChannel from '@/components/addChannel'
import Image from "next/image";


export default function ChannelBoard({channelId, messages: initialMessages, channels, loggedUser}) {

    const router = useRouter()

    const [newChannels, setNewChannels] = useState(channels)

    const [activeChannel, setActiveChannel] = useState(channelId)
    console.log(activeChannel)

    const [userName, setUserName] = useState(loggedUser)
    const [text, setText] = useState('')
    const [messages, setMessages] = useState(initialMessages)

    //add username and message to active channel api

    // const [created, setCreated] = useState('')
    // const [id, setId] = useState('')
    // const [message, setMessage] = useState('')

    const [activeMessage, setActiveMessage] = useState({})
    console.log(activeMessage)

    const bottomRef = useRef(null);
      
    //scroll to bottom of page
    const scrollToBottom = () => {
      bottomRef.current.scrollIntoView({behavior: 'smooth', block: 'end', inline: 'nearest' });
      console.log('scrolling')
    }

    useEffect(() => {

    if (messages.length > 3) {
      scrollToBottom()
    }

    }, [messages])
   
      const handleChannelClick = async (id) => {
        const channel = newChannels.find((channel) => channel.id === id)
        setActiveChannel(channel)
        router.push({
          pathname: `${id}`,
          query: {
              activeChannel: channel.id, 
              loggedUser
          },
        })

        const messages = await axios.get(`/api/channels/${id}/messages`)
        setMessages(messages.data);
        if (messages.length > 3) {
          setTimeout(() => {
            scrollToBottom()
          }, 1000)
        }
      }

  
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log('submit', userName, text)
        // Send to the database (POST)

        const result = await axios.post(`/api/channels/${channelId}/messages`, {
            userName, text
        })
        const newMessage = result.data

        setMessages([...messages, newMessage])
        // go to the bottom of the page
        scrollToBottom()
    }

    //update message from active channel api

    const handleUpdateMessage = async (id) => {
        const newtext = updatedmessage
        console.log(newtext)
        await fetch(`/api/channels/${activeChannel.id}/messages/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({text: newtext}),
        })
        setMessages(messages.map((message) => message.id === id ? {...message, text: newtext} : message))
        setShowEditPopUp(false)
    }


    //delete message from active channel api

    const handleDelete = (message) => {
        setActiveMessage(message)
        setShowPopUp(true)
    }
    
    const handleDeleteMessage = async (id) => {
        await fetch(`/api/channels/${activeChannel.id}/messages/${id}`, {
            method: 'DELETE',
        })
        setMessages(messages.filter((message) => message.id !== id))
        alert('Message Deleted')
        setShowPopUp(false)
        if (messages.length > 5) {
          window.location.reload()
        }
    }

    //pop up 

    const [showPopUp, setShowPopUp] = useState(false)

    const [showEditPopUp, setShowEditPopUp] = useState(false)


    const handleEditMessage = (message) => {
    setActiveMessage(message)
    setShowEditPopUp(true)
    }

const [updatedmessage, setUpdatedMessage] = useState();
console.log(updatedmessage)

//enter key to submit

const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
        handleSubmit(e) || handleUpdateMessage(e)
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
      <main className={styles.main} suppressHydrationWarning={true}>
       
        <div className={styles.avatarcontainer}>
          <Avatar src='/donald.png'/>
        </div>

        <div className={styles.channelcontainer}>
          <div className={styles.bar}>
            <h2>Channels</h2>
          </div>
          <div className={styles.channelboard}>
                {newChannels.map((channel) => (
                    
                    <Channel
                        onClick={() => handleChannelClick(channel.id)}
                        key={channel.id}
                        name={channel.name}
                        id={channel.id}
                        image={channel.image}
                        activeChannel={activeChannel}
                    />
                ))}
            </div>
            <AddChannel channels={newChannels} setNewChannels={setNewChannels} />
          </div>

        <div className={styles.board}>
          <div className={styles.bar}>
            <h2>{activeChannel.name} Messages</h2>
          </div>
          <div className={styles.messagelist}>
          {activeChannel && messages.map((message) => (
            <div className={styles.message} key={message.id}>
              <div className={styles.username}>
              <h3>{message.userName}</h3>
              <p>{new Date(message.created).toLocaleString()}</p>
              </div>
              <p>{message.text}</p>
              <span style={{display: 'flex', alignItems: 'center', marginTop: '1em'}}
              onClick={() => handleDelete(message)}
              >
                <Image width={10} height={10} style={{marginRight: '5px'}} src='/delete.png' />
                <p style={{fontSize: '.8em', fontWeight: '200'}}>Delete message</p>
              </span>
              <span style={{display: 'flex', alignItems: 'center', marginTop: '1em'}}
              onClick={() => handleEditMessage(message)}
              >
                <Image width={10} height={10} style={{marginRight: '5px'}} src='/pencil.png' />
                <p style={{fontSize: '.8em', fontWeight: '200'}}>Edit message</p>
              </span>

              {activeMessage && activeMessage.id == message.id && showPopUp && (
                <div className={styles.editpopup} style={{alignItems:'center'}}>
                  <p style={{marginBottom: '1em'}}>Are you sure you want to delete this message?</p>
                  <button onClick={() => handleDeleteMessage(message.id)}>Yes</button>
                  <button onClick={() => setShowPopUp(false)}>No</button>
                </div>
              )}

              {showEditPopUp && (
                <div className={styles.editpopup}>
                  <form>
                    <textarea
                      required
                      type="text"
                      placeholder={activeMessage.text}
                      defaultValue={activeMessage.text}
                      value={updatedmessage}
                      onChange={(e) => setUpdatedMessage(e.target.value)}
                    />
                    <button onClick={()=>handleUpdateMessage(activeMessage.id)}>Update</button>
                  </form>
                </div>
              )}
              <span ref={bottomRef} style={{width: '0', height: '0'}}/>
            </div>
          ))}
        </div>
        <div className={styles.messageform}>
          <div className={styles.form}>
              <form onSubmit={handleSubmit}>
                <input
                  required
                  type="text"
                  placeholder="Username"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
                <textarea
                  required
                  type="text"
                  placeholder="Message"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <button type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
          
        

      </main>
    </>
  )
}


export async function getServerSideProps(context) {
    // This is always server side
    // From the server, we can connect to the database

    const { loggedUser } = context.query
    const channelId = context.query.channelId

    const channels = await getAllChannels()
    const messages = await getAllMessages(channelId)

    return {
        props: {
            channelId,
            channels: JSON.parse(JSON.stringify(channels)),
            messages: JSON.parse(JSON.stringify(messages)),
            loggedUser: (loggedUser ? JSON.parse(JSON.stringify(loggedUser)) : null)
        }
    }
}

//channel component
import styles from '@/styles/Channels.module.css'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import AddChannel from './addChannel'
import { useRouter } from 'next/router'


export const Channel = (props) => {

   const [activeChannel, setActiveChannel] = useState(props.activeChannel)
   const [showPopup, setShowPopup] = useState(false)
   const [showPopupWarning, setShowPopupWarning] = useState(false)
   const [showPopupinput, setShowPopupinput] = useState(false)
//    console.log(activeChannel)

   const [newName, setNewName] = useState('')

   useEffect(() => {
         setActiveChannel(props.activeChannel)
    }, [props.activeChannel])

    const handleEditChannel = (channel) => {
        console.log(channel)
        setShowPopupinput(true)
    }

    //delete channel
    const handleDeleteChannel = async (id) => {
        await fetch(`/api/channels/${id}`, {
            method: 'DELETE',
        })
        setShowPopup(false)
        setShowPopupWarning(false)
        alert('Channel Deleted')
        window.location.reload()
    }

     //update channel name in database by channel id
     const handleUpdateChannel = async (id) => {
        const newname = newName
        console.log(newname)
        await fetch(`/api/channels/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: newname}),
        })
        setShowPopup(false)
        setShowPopupinput(false)
        alert('Channel Updated')
        window.location.reload()
    }

    return (
        <div className={styles.channel}
            key={props.channelid}
            onClick={props.onClick}
            suppressHydrationWarning={true}
            
        >
        <Image width={15} height={15} style={{marginRight: '10px'}} src='/hashtag.png' alt='channel'/>
        <h3 className={activeChannel && props.id === activeChannel.id ? styles.active : null}>{props.name}</h3>
        <Image width={15} height={15} style={{marginLeft: '10px'}} src='/dots.png' onClick={()=>setShowPopup(true)} alt='menu'/>
        {activeChannel && activeChannel.id == props.id && showPopup ? (
            <span className={styles.editpopup}>
                <span onClick={() =>setShowPopupWarning(true)}>
                    <Image width={10} height={10} style={{marginLeft: '10px'}} src='/delete.png' alt='delete'/>
                    <p>Delete Channel</p>
                </span>
                <span onClick={() =>handleEditChannel(activeChannel.id)}>
                <Image width={10} height={10} style={{marginLeft: '10px'}} src='/pencil.png' alt='edit'/>
                    <p>Edit Channel</p>
                </span> 
                <span onClick={() =>setShowPopup(false)} style={{position: 'relative', bottom: -12, left: 65}}>
                <Image width={10} height={10} style={{marginLeft: '10px'}} src='/close.png' alt='close' />
                    <p>Close</p>
                </span> 
            </span>
        ) : null}

             
        {activeChannel && activeChannel.id == props.id && showPopupinput ? (
            <span className={styles.editpopup}>
                <span style={{flexDirection: 'column'}}>
                    <p>Enter new channel name</p>
                    <input 
                        id='newname' 
                        type='text' 
                        placeholder={activeChannel.name}
                        defaultValue={props.name}
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                    ></input>
                    <button onClick={() =>handleUpdateChannel(activeChannel.id)}>Update</button>
                    <p style={{marginTop: '1em'}} onClick={()=>setShowPopupinput(false)}>Cancel</p>
                </span>
            </span>
        ) : null}

        {activeChannel  && activeChannel.id == props.id && showPopupWarning ? (
            <span className={styles.editpopup}>
                <span style={{flexDirection: 'column'}}>
                    <p>Are you sure you want to delete this channel?</p>
                    <button onClick={()=>handleDeleteChannel(props.id)}>Delete</button>
                    <p style={{marginTop: '1em'}} onClick={()=>setShowPopupWarning(false)}>Cancel</p>
                </span>
            </span>
        ) : null}
     </div>
    )
}



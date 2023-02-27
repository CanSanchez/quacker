
// //channel component
// import styles from '@/styles/Home.module.css'
// import { useState, useEffect } from 'react'
// import AddChannel from './addChannel'
// import { useRouter } from 'next/router'
// import { getAllChannels } from '@/database'


// export const ChannelList = (props) => {
    
//     //fetch the channels from the api
//        const [channels, setChannels] = useState([])

//     // useEffect(() => {
//     //     fetch('/api/channels')
//     //         .then((res) => res.json())
//     //         .then((data) => {
//     //             setChannels(data)
//     //         })
//     //     console.log(channels)
//     // }, [])

//     const [activeChannel, setActiveChannel] = useState()
//     console.log(activeChannel)
   
//     const handleChannelClick = (channel) => {
//         setActiveChannel(channel)
//         console.log(channel)
//     }

//     const handleEditChannel = (channel) => {
//         setActiveChannel(channel)
//         console.log(channel)
//         setShowPopupinput(true)
//     }



//     props.setActiveChannel(activeChannel)

//     //delete channel
//     const handleDeleteChannel = async (id) => {
//         await fetch(`/api/channels/${id}`, {
//             method: 'DELETE',
//         })
//         setChannels(channels.filter((channel) => channel.id !== id))
//         setShowPopup(false)
//         setShowPopupWarning(false)
//         alert('Channel Deleted')
//     }

//     //update channel name in database by channel id
//     const handleUpdateChannel = async (id) => {
//         const newname = document.getElementById('newname').value
//         console.log(newname)
//         await fetch(`/api/channels/${id}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({name: newname}),
//         })
//         setChannels(channels.map((channel) => channel.id === id ? {...channel, name: newname} : channel))
//         setShowPopup(false)
//         setShowPopupinput(false)
//         alert('Channel Updated')
//     }

//     //create popup for delete channel

//     const [showPopup, setShowPopup] = useState(false)
//     const [showPopupWarning, setShowPopupWarning] = useState(false)

//     //create popup for update channel

//     const [showPopupinput, setShowPopupinput] = useState(false)

//     const [newName, setNewName] = useState("");

    
//     return (

//     //map through the channels and display them
// <>  
//         <h2 style={{textAlign:'center', margin: '1em', fontSize: '.8rem'}}>{channels.length} Active Channels</h2>
//         <div className={styles.channelboard}>
//         {channels.map((channel) => (
//             //make the active channel bold
            
//             <div className={styles.channel}
//                 key={channel.id}
//                 onClick={() => handleChannelClick(channel)}
//             >
//                 <img width={15} style={{marginRight: '10px'}} src='hashtag.png'></img>
//                 <h3 className={activeChannel && channel.id === activeChannel.id ? styles.active : styles}>{channel.name}</h3>
//                 <img width={15} style={{marginLeft: '10px'}} src='dots.png' onClick={()=>setShowPopup(true)}></img>
//                 {activeChannel && activeChannel.id == channel.id && showPopup ? (
//                 <span className={styles.editpopup}>
//                     <span onClick={() =>setShowPopupWarning(true)}>
//                         <img width={10} height={10} style={{marginLeft: '10px'}} src='delete.png'></img>
//                         <p>Delete Channel</p>
//                     </span>
//                     <span onClick={() =>handleEditChannel(activeChannel.id)}>
//                     <img width={10} height={10} style={{marginLeft: '10px'}} src='pencil.png'></img>
//                         <p>Edit Channel</p>
//                     </span> 
//                     <span onClick={() =>setShowPopup(false)} style={{position: 'relative', bottom: -12, left: 65}}>
//                     <img width={10} height={10} style={{marginLeft: '10px'}} src='close.png'></img>
//                         <p>Close</p>
//                     </span> 
//                 </span>
//                 ) : null}

//                 {activeChannel && activeChannel.id == channel.id && showPopupinput ? (
//                     <span className={styles.editpopup}>
//                         <span style={{flexDirection: 'column'}}>
//                             <p>Enter new channel name</p>
//                             <input 
//                                 id='newname' 
//                                 type='text' 
//                                 placeholder={activeChannel.name}
//                                 defaultValue={channel.name}
//                                 value={newName}
//                                 onChange={(e) => setNewName(e.target.value)}
//                             ></input>
//                             <button onClick={() =>handleUpdateChannel(activeChannel.id)}>Update</button>
//                             <p style={{marginTop: '1em'}} onClick={()=>setShowPopupinput(false)}>Cancel</p>
//                         </span>
//                     </span>
//                 ) : null}

//                 {activeChannel  && activeChannel.id == channel.id && showPopupWarning ? (
//                     <span className={styles.editpopup}>
//                         <span style={{flexDirection: 'column'}}>
//                             <p>Are you sure you want to delete this channel?</p>
//                             <button onClick={()=>handleDeleteChannel(channel.id)}>Delete</button>
//                             <p style={{marginTop: '1em'}} onClick={()=>setShowPopupWarning(false)}>Cancel</p>
//                         </span>
//                     </span>
//                 ) : null}
//             </div>
//         ))}
//         </div>
//         <AddChannel setChannels={setChannels}/>
//  </>
//     )
// }



// // export async function getServerSideProps() {

// //     // runs on the server
// //     const channels = await getAllChannels();
// //     console.log(channels)

// //     return {
// //         props: {
// //             channels: JSON.parse(JSON.stringify(channels))
// //         }
// //     }

// // }
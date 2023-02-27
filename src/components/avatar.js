
import styles from '@/styles/Channels.module.css'
import Image from 'next/image'
import Link from 'next/link'
//create an avatar component

export const Avatar = (props) => {
    return (
        <>
            <Link href='/channels'>
                <Image src={props.src} width={50} height={50} 
                    className={styles.avatarimg}
                    priority
                    alt='avatar'
                />
            </Link>
        </>
    )
}



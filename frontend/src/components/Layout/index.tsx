import React from 'react'
import Footer from './Footer'
import Header from './Header'
import styles from './Layout.module.css'

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className={styles.container}>
            <Header />
            <main className={styles.main}>{children}</main>
            <Footer />
        </div>
    )
}

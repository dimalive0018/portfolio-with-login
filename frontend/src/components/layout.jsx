import React from 'react'
import Footer from './footer'
import Navbar from './nav'

export default function Layout({ children }) {
    return (
        <>
            <Navbar />
            <main>
                {children}
            </main>
            <Footer />
        </>
    )
}

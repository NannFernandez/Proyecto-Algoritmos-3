import React from 'react'
import './header.css'
import { Button } from 'primereact/button'

export const Header = ({page}) => {
    return (
        <header className="header-container">
            <div className="header">
                <div>
                    TeleFood/{page}
                </div>
                <div>
                    <Button icon="pi pi-list"/>
                </div>
            </div>
        </header>
)}
    
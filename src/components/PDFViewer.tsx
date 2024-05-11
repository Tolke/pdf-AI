"use client";

import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin, ToolbarProps, ToolbarSlot } from '@react-pdf-viewer/default-layout';
import { ReactElement } from 'react';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const PDFViewer = () => {
    const renderToolbar = (Toolbar: (props: ToolbarProps) => ReactElement) => (
        <Toolbar>
            { (slots: ToolbarSlot) => {
                const {
                    CurrentPageInput,
                    Download,
                    EnterFullScreen,
                    GoToNextPage,
                    GoToPreviousPage,
                    NumberOfPages,
                    Print,
                    ShowSearchPopover,
                    Zoom,
                    ZoomIn,
                    ZoomOut,
                } = slots;
                return (
                    <div
                        style={ {
                            alignItems: 'center',
                            display: 'flex',
                            width: '100%',
                        } }
                    >
                        <div style={ { padding: '0px 2px' } }>
                            <ShowSearchPopover/>
                        </div>
                        <div style={ { padding: '0px 2px' } }>
                            <ZoomOut/>
                        </div>
                        <div style={ { padding: '0px 2px' } }>
                            <Zoom/>
                        </div>
                        <div style={ { padding: '0px 2px' } }>
                            <ZoomIn/>
                        </div>
                        <div style={ { padding: '0px 2px', marginLeft: 'auto' } }>
                            <GoToPreviousPage/>
                        </div>
                        <div style={ { padding: '0px 2px', width: "3rem" } }>
                            <CurrentPageInput/>
                        </div>
                        <div style={ { padding: '0px 2px' } }>
                            / <NumberOfPages/>
                        </div>
                        <div style={ { padding: '0px 2px' } }>
                            <GoToNextPage/>
                        </div>
                        <div style={ { padding: '0px 2px', marginLeft: 'auto' } }>
                            <EnterFullScreen/>
                        </div>
                        <div style={ { padding: '0px 2px' } }>
                            <Download/>
                        </div>
                        <div style={ { padding: '0px 2px' } }>
                            <Print/>
                        </div>
                    </div>
                );
            } }
        </Toolbar>
    );
    const defaultLayout = defaultLayoutPlugin({ renderToolbar, sidebarTabs: () => [] });

    return (
        <div className="w-1/2 h-screen">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                <Viewer
                    plugins={ [defaultLayout] }
                    fileUrl="https://tfg-ai-pdf-chat.s3.eu-central-1.amazonaws.com/users/user_2gCJu86Fob9SD02Ccd3yNwdlXN0/1715460965288-Tony_Robbins.pdf"
                />
            </Worker>
        </div>
    );
}

export default PDFViewer;
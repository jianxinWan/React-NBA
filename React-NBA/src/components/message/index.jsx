import React from 'react';
import ReactDom from 'react-dom';
import Message from './message';

export default function msgOpen(options = {}){
    const Msg = document.createElement('div');
    document.getElementById('root').appendChild(Msg);
    Msg.classList.add('msg');
    ReactDom.render(
        <Message 
            {...options} 
            onClose = {()=>msgClose(Msg,options = {})}
        />,
        Msg
    );
}

function msgClose(container){
    document.getElementById('root').removeChild(container);
}
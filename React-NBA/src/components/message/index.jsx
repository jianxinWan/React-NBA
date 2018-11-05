import React from 'react';
import ReactDom from 'react-dom';
import Message from './message';

export default {
    msgOpen:function msgOpen (options = {}){
        const Msg = document.createElement('div');
        document.getElementById('root').appendChild(Msg);
        msgOpen.container = Msg;
        Msg.classList.add('msg');
        ReactDom.render(
            <Message 
                {...options} 
                onClose = {()=>msgClose(Msg,options = {})}
            />,
            Msg
        );
    },
    msgClose:msgClose
}
function msgClose(container){
    if(document.getElementById('root').contains(container)){
        document.getElementById('root').removeChild(container);
    }
}
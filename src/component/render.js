import React, { Component } from "react";
import io from "socket.io-client"
class Render extends Component {
    constructor(props) {
        super(props);
        this.socket = io("http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000/");
        this.regExp = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#/%?=~_|!:,.;]*[a-z0-9-+&@#/%=~_|]/gim;
        this.regExp2 = /(^|[^/])(www\.[\S]+(\b|$))/gim;
        this.regExEmoji = /:.[^\s:-]*:/g;
        this.emoji = {
            ':grinning:': '😀',
            ':joy:': '😂',
            ':ok_hand:': '👌',
            ':thumbsup:': '👍',
            ':muscle:': '💪',
            ':beer:': '🍺',
            ':skull:':"💀",
            ':zombie:':"🧟"
        }
        this.handleLinks = this.handleLinks.bind(this);
    }
    handleLinks(data, id) {
        return data.split(" ").map(word => {
            if (this.regExp.test(word)) {
                return <a key={id} href={word}> {word} </a>
            }
            else if (this.regExp2.test(word)) {
                return <a key={id} href={word}> {word} </a>
            }
            else if (this.regExEmoji.test(word)){
                for (let key in this.emoji){
                   if(word === key){
                   return word.replace(key,this.emoji[key])
                   }
                }
            }
            return word+" ";
        })
    }
    render() {
        let renderChat = this.props.users.map(user => {
            return (
                <div className="chat-container-user" key={user.id} >
                    <div className="chat-container-username">[Raid] [{user.username}]</div>
                    <div className="chat-container-messege">: {this.handleLinks(user.content, user.id)}</div>
                </div>
            )
        })
        return (
            <>
                {renderChat}
            </>
        )
    }
}
export default Render
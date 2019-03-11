import React, { Component } from "react";
class Render extends Component {
    constructor(props) {
        super(props);
        this.emoji = {
            ':grinning:': '😀',
            ':joy:': '😂',
            ':ok_hand:': '👌',
            ':thumbsup:': '👍',
            ':muscle:': '💪',
            ':beer:': '🍺',
            ':skull:': "💀",
            ':zombie:': "🧟"
        }
        this.handleLinks = this.handleLinks.bind(this);
    }
    handleLinks(data, id) {
        return data.split(/\s+/).map(word => {
            if (/\b(?:https?|ftp):\/\/[a-z0-9-+&@#/%?=~_|!:,.;]*[a-z0-9-+&@#/%=~_|]/gim.test(word)) {
                return <a key={id} href={word}>{word}</a>
            }
            else if (/(^|[^/])(www\.[\S]+(\b|$))/gim.test(word)) {
                return <a key={id} href={"https://" + word}>{word}</a>
            }
            else if (/:.[^\s:-]*:/g.test(word)) {
                for (let key in this.emoji) {
                    if (word === key) {
                        return word.replace(new RegExp(key, "g"), this.emoji[key] + " ")
                    }
                }
            }
            return `${word} `;
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
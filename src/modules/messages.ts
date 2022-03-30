import { get, ref, remove, update, onValue, push } from "firebase/database";
import { db } from "./firebaseApp";

export class Messages
{
    constructor(
    public readonly id: string,
    public readonly userName: string,
    public readonly message: string,
    public readonly timeStamp:string
    )
    {
        this.displayMsg();
    }
    private showHideContent():void
    {
        const musicTag = document.getElementById("MusicTag") as HTMLDivElement;
        const messagesMusic = document.getElementById("messageMusic") as HTMLDivElement;

        const gamesTag = document.getElementById("GamesTag") as HTMLDivElement;
        const messagesGames = document.getElementById("messageGames") as HTMLDivElement;

        const showsTag = document.getElementById("ShowsTag") as HTMLDivElement;
        const messagesShows = document.getElementById("messageShows") as HTMLDivElement;

        musicTag.addEventListener("click", (e)=>
        {
            gamesTag.style.visibility = "hidden";
            messagesGames.style.visibility = "hidden";
            showsTag.style.visibility = "hidden";
            messagesShows.style.visibility = "hidden";
            // const topic = "music";
        });

        gamesTag.addEventListener("click", (e)=>
        {
            musicTag.style.visibility = "hidden";
            messagesMusic.style.visibility = "hidden";
            showsTag.style.visibility = "hidden";
            messagesShows.style.visibility = "hidden";
        });

        showsTag.addEventListener("click", (e)=>
        {
            musicTag.style.visibility = "hidden";
            messagesShows.style.visibility = "hidden";
            gamesTag.style.visibility = "hidden";
            messagesGames.style.visibility = "hidden";
        });
    }
    private displayMsg():void
    {
        //The section containing all messages (section for each topic?)
        const msgWrapper = document.getElementById("messages");
        //The Div containing one message
        const msgContainer = document.createElement("div") as HTMLDivElement;
        msgWrapper.append(msgContainer);
        //Set the messages ID to the div containing the message
        // msgContainer.id = this.id;
        msgContainer.classList.add(this.id);
        
        //Create the userName h4 element
        const userNameElement = document.createElement("h4") as HTMLHeadElement;
        //Set the userName and the timeStamp
        userNameElement.innerText = `${this.timeStamp}, ${this.userName}, ${this.message}`;
        msgContainer.append(userNameElement);
        
        // const date = new Date();

        // timeStamp:
        // date.getFullYear() +
        // " " +
        // (date.getMonth() + 1) +
        // "/" +
        // date.getUTCDate() +
        // " - " +
        // date.getHours() +
        // ":" +
        // date.getMinutes() +
        // ":";

        //Create the remove button
        const removeBtn = document.createElement("button") as HTMLButtonElement;
        removeBtn.innerText = "X";
        msgContainer.append(removeBtn);
        
        //Removebuttons event
        removeBtn.addEventListener("click", () =>
        {
            const userName = document.getElementById("userName") as HTMLInputElement;
            
            if (this.userName == userName.value)
            {
                //Set the reference in the database
                //TODO: change topics later
                const msgRef = ref(db, `/Topics/Games/` + this.id);
                remove(msgRef);
            }
        });
    };
    public clearDOM():void
    {
        document.querySelector(`.${this.id}`).remove();
    }
}
    const dbRef = ref (db, "/Topics/Games/");
    let messages:Messages[] = [];
    onValue(dbRef, (snapshot) =>
    {
        const messageData = snapshot.val();
        for(const message of messages)
        {
            message.clearDOM();
        }
        messages = [];
        for (const key in messageData)
        {
            messages.push(new Messages(
                key, messageData[key].name,
                messageData[key].message,
                messageData[key].timeStamp
            ))
        }
        //Scroll to the bottom
        scrollDown();
        //Remove the 26th post
        function postLimiter():void
        {
            const messageArray = Object.values(messageData);
            const index0 = Object.keys(messageData)[0];
            for(let i = 0; i < messageArray.length; i++)
            {
                if(messageArray.length>25)
                {
                    //Set the reference in the database
                    //TODO: change reference with all 3 topics
                    const post = ref(db, "/Topics/games/" + index0);
                    remove(post);
                }
            }
        }
       if (messageData)
       {
        postLimiter();
       }
    });
    document.getElementById("send").addEventListener("click", (e) =>
        {
            e.preventDefault();
            const name = document.getElementById("userName") as HTMLInputElement;
            const message = document.getElementById("userMessage") as HTMLInputElement;
            
            const messageToAdd = 
            {
                name: name.value,
                message: message.value,
            }
            
            const newKey:string = push(dbRef).key;
            const newMessage = {};
            newMessage[newKey] = messageToAdd;
            
            update(dbRef, newMessage);
        });
        
    function scrollDown():void
    {
        const e = document.getElementById("messages");
        e.scrollTop = e.scrollHeight;
    };
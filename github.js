// const mongoose =require('./mongoose.js');
// import mongoose  from "mongoose";

// const { any } = require("webidl-conversions");
// need to add condition in 63 line

//temporary changes in the lines from 272.

let sendBtn = document.querySelector("#sendBtn");
let msgInput = document.querySelector("#typeMsg");
let msgContent = document.querySelector(".msg_content");
let bodyTag    = document.querySelector("body");
let callTools = document.querySelectorAll('.call');
let OuterVideo = document.querySelector('.OutervideoBar');
let InnerVideo = document.querySelector('.NestedvideoBar')
// let msgPrivate = document.querySelector(".msg_private");
let ApearLSbar = document.querySelector(".apearL");
let ApearRSbar = document.querySelector(".apearR");
let s_barDivL = document.querySelector("#s_barL");
let s_barDivR = document.querySelector("#s_barR");
let s_barUListR = document.querySelector("#s_listR");
let s_barUListL = document.querySelector("#s_barL");
let activeBox = document.querySelector("p");
let switchmode = document.querySelector("#toggle");
let togglePos = document.querySelector("#TDesign");
let headBar  = document.querySelector('header');
let headtext = document.querySelector("#headText");
let headIcon = document.querySelector('.headIcon');
let listofUserR = [],iconofUserR=[],listBtnR=[],listnameR=[];
let listofUserL = [],iconofUserL=[],listBtnL=[],listnameL=[];
let msgPrivate=[],buttonListner=[];
let userNameBox = document.querySelector("#s_listR");
let s_Icon = document.querySelector(".material-symbols-outlined");
let mode = "dark",
  i = 0,iVcheck =0,noLeftmgs=0,nochatWindow=0;       // i value check
let data, msgCount,windowFlag=true;  //windowFlag is used to check the group chat user chat window is already present or not.
var index=0,className;
// const socket = io("http://localhost:8000");

let name = prompt("Enter your name");
if (name == "" || name == null) {
  do {
    alert("Name is compulsory!");
    name = prompt("Enter your name");
  } while (name == "" || name == null);
}

function handleBtnclick(event)
{

 for(let i=0;i<listBtnR.length;i++){
      if(((listBtnR[i].classList[1]))===(event.target).classList[1])
      {
        index=i;
        break;
      }
   }

  if( msgPrivate[index].style.left!="auto" &&  msgContent.style.display!="none")
    {
      
    msgContent.style.display="none";
    msgPrivate[index].style.display="flex";
    msgPrivate[index].style.left="auto";
    headtext.innerHTML=listnameR[index].innerHTML;
 
    
  
    }
    // opening the group chat when clicked twice on the same name;
    else if(  headtext.innerHTML  == listnameR[index].innerHTML)
   {

    msgContent.style.display="flex";
    msgPrivate[index].style.display="none";
    msgPrivate[index].style.left="-100vw";
    headtext.innerHTML='Welcome To ChatBook !';
  
   }
   // opening the another private chat from other private chat

   else
   {
       msgContent.style.display="none";

      // the code logic is given in the handleleftbtn Click.
       listnameR.forEach((listname,Lno)=>{
       if(headtext.innerHTML==listname.innerHTML)
      {
        msgPrivate[Lno].style.display="none";
       
      }
    });

    listnameL.forEach((listname,Lno)=>{
      if(headtext.innerHTML==listname.innerHTML)
     {
       msgPrivate[Lno].style.display="none";
      
     }
   });
    // display none to the  msg window jisse dusre pe click kiya gya hai.
    msgPrivate[index].style.display="flex";
    msgPrivate[index].style.left="auto";
    headtext.innerHTML=listnameR[index].innerHTML;

   }
}


function handleLeftBtnclick(event)
{
 console.log('left button click');

   //checking the each left button class list and comparing with e.target classlist.
  for( index=0;index<nochatWindow;index++){
 console.log(((msgPrivate[index].classList[2])),(event.target).classList[1]);
    if(((msgPrivate[index].classList[2]))===(event.target).classList[1])
    {       
    
      //when  opneing the private chat from the group chat
if( msgPrivate[index].style.left!="auto" &&  msgContent.style.display!="none")
  {
    console.log('entering');
  msgContent.style.display="none";
  msgPrivate[index].style.display="flex";
  msgPrivate[index].style.left="auto";
  if(name==(msgPrivate[index].classList[2]))
  {  console.log('2entering');
    headtext.innerHTML=msgPrivate[index].classList[2]+" (me)"; 
  }
  else{
    console.log('3entering');
    headtext.innerHTML=msgPrivate[index].classList[2];

  }

  

  }

  // opening the group chat when clicked twice on the same name;
  else if(  (headtext.innerHTML  == (msgPrivate[index].classList[2])+" (me)") || (headtext.innerHTML  == (msgPrivate[index].classList[2])))
 {

  msgContent.style.display="flex";
  msgPrivate[index].style.display="none";
  msgPrivate[index].style.left="-100vw";
  headtext.innerHTML='Welcome To ChatBook !';
  console.log('4entering');

 }
 // opening the another private chat from other private chat

 else
 {
     msgContent.style.display="none";
     //asscessing the previous open chat window from both left and  right side bar 
     listnameR.forEach((listname,Lno)=>
      {
     if(headtext.innerHTML==listname.innerHTML)
    {
      
      msgPrivate[Lno].style.display="none";
     
    }
    
  });
// scenario when the click to other chat window is done from left side bar  button that button donot exist in the left button.

  listnameL.forEach((listname,Lno)=>
    {
   if(headtext.innerHTML==listname.innerHTML)
  {
    
    msgPrivate[Lno].style.display="none";
   
  }
  
});
  
console.log('6entering');
  // display none to the  msg window jisse dusre pe click kiya gya hai.
  msgPrivate[index].style.display="flex";
  msgPrivate[index].style.left="auto";
  console.log(index);
  headtext.innerHTML=listnameL[index].innerHTML;

 }


 break;
}


}

}








// it also include saveContact emit emitter which saves the user personal contacts
function outMsg(window,data) {
  var divCreate = document.createElement("div");
  divCreate.innerHTML =
    "<h5>" + "~ me" + "</h5>" + data.value + "<h6>" + data.time + "</h6>";
    // if(msgPrivate[index].style.left!="auto" && window =='group')
    //   {
        msgContent.appendChild(divCreate);
        
  msgContent.scrollTop = msgContent.scrollHeight;
  
    //   }
// this case is when no private chats are display flex i.e not open and putting data into each window from database
    //   else if(msgPrivate[index].style.left!="auto" && window !='group')
    //   {
    //     msgPrivate.forEach(chatWindow=>{
    //       if(chatWindow.classList.contains(window)== true)
    //       {
    //         chatWindow.appendChild(divCreate);
    //         chatWindow.scrollTop = msgContent.scrollHeight;
  
    //       }
    //     })

    //   }
      
    //   // important step in else part only
    //   else{

    //         msgPrivate[index].appendChild(divCreate); 
    //         //Concatenating the class User name to the msgPrivate to link with the buttons to the left 
    //         msgPrivate[index].classList.add((headtext.innerHTML).trim().split(/\s+/)[0]);
           
    //         msgPrivate[index].scrollTop = msgContent.scrollHeight;
    //     //emiting socket event to save the personal chattings in their named database
    //     // unke khud k naam k database me unke sabhi contacts k sath baat store karna hai
       
    //         // just creating the left list of permanent contacts.
    //     if(msgPrivate[index].childElementCount == 1 )
    //     {

    //       (listnameL).forEach((singleBtn)=>{
    //         singleBtn.removeEventListener('pointerdown',handleLeftBtnclick);
          
    //          });
          
    //         listofUserL[noLeftmgs] = document.createElement('li');
    //         listofUserL[noLeftmgs].classList.add('pseudoClass');
    //         listofUserL[noLeftmgs].classList.add((headtext.innerHTML).trim().split(/\s+/)[0]);
    //         //created and appending the list.
            
    //         s_barUListL.appendChild(listofUserL[noLeftmgs]);
        
          
    //       //writing the button
    //       listBtnL[noLeftmgs]=document.createElement('button');
    //       listBtnL[noLeftmgs].classList.add('listBtn');
    //       listBtnL[noLeftmgs].classList.add((headtext.innerHTML).trim().split(/\s+/)[0]);

    //       listofUserL[noLeftmgs].appendChild( listBtnL[noLeftmgs]);
        
        
        
    //         // writing the user icon
    //         iconofUserL[noLeftmgs]=document.createElement('span');
    //         iconofUserL[noLeftmgs].classList.add('material-symbols-outlined');
    //         iconofUserL[noLeftmgs].classList.add((headtext.innerHTML).trim().split(/\s+/)[0]);
    //         iconofUserL[noLeftmgs].classList.add('iconPosition');
    //         listBtnL[noLeftmgs].appendChild( iconofUserL[noLeftmgs]);
    //         iconofUserL[noLeftmgs].innerHTML='person';
          
        
          
        
    //         // writing the user name inside the button
    //         listnameL[noLeftmgs]=document.createElement('span');
    //         listnameL[noLeftmgs].classList.add('pseudoClass');
    //         listnameL[noLeftmgs].classList.add((headtext.innerHTML).trim().split(/\s+/)[0]);
    //         listBtnL[noLeftmgs].appendChild( listnameL[noLeftmgs]);
    //         if(headtext.innerHTML == name) listnameL[noLeftmgs].innerHTML=headtext.innerHTML+' (me)';
    //         else  listnameL[noLeftmgs].innerHTML=headtext.innerHTML;
    //       //adding event listener for the buttons in the left side bar.
    //       //keep in mind when the number of buttons is increased then the previous event listener should be cancelled and new event listener
    //       // should be added.

          
    //       (listBtnL).forEach((singleBtn)=>{
         
    //         singleBtn.addEventListener('pointerdown',handleLeftBtnclick);
    //         // opening the privateMsg when clicked on once  
    //        // index
    //       });
          
    //         // //we are saving the contact in the  username specific personal collection only 
    //         // socket.emit('saveContact',(name),({
    //         //   contactName:listnameL[noLeftmgs].innerHTML
    //         // }))
    //         noLeftmgs++;
         
    //      }



    //   }
 
  divCreate.classList.add("right");
 
    msgInput.focus();
    msgInput.setSelectionRange(0,0);
     msgInput.value = "";
        msgInput.style.height='40px';
            

}

function notifyMsg(data, action) {
  var divCreate = document.createElement("div");
  var ctime = new Date();
  if ((data.value == "joined" ||data.value == "left")&& data.name== name) {
    divCreate.innerHTML = "me " + data.value + "<h6>" + data.time + "</h6>";
  } else {
    divCreate.innerHTML = data.name+' '+data.value + "<h6>" + data.time + "</h6>";
  }

  msgContent.appendChild(divCreate);
  divCreate.classList.add("center");
  msgContent.scrollTop = msgContent.scrollHeight;

  if (action == "pink" || data.value=='left') {
    divCreate.style.backgroundColor = "rgb(217 125 140)";
  }
}

function inMsg(window,data) {
  
  var divCreate = document.createElement("div");
  // divCreate.innerHTML=data;
  divCreate.innerHTML =
    "<h5>" + "~ " +data.name + "</h5>" + data.value + "<h6>" + data.time + "</h6>";
    if( window ==='group')
    {
      msgContent.appendChild(divCreate);
      msgContent.scrollTop = msgContent.scrollHeight;

    }
    else{
      msgPrivate.forEach(chatWindow=>{
        if(chatWindow.classList.contains(window)== true)
        {
          chatWindow.appendChild(divCreate);
          chatWindow.scrollTop = msgContent.scrollHeight;
          

        }
      })
    }
  divCreate.classList.add("left");
}

var ctime = new Date();
data = {
  name,
  value: "joined",
  time: ctime.toLocaleString(),
};

// socket.emit("me-user-has-joined", data);
// added the msgPrivate and msgContent on pointerDown event listener to close the side bars 

ApearLSbar.addEventListener("pointerdown", () => {
  if (s_barDivL.style.left == "0px") {
    s_barDivL.style.left = "-300px";
  } else {
    s_barDivL.style.left = "0px";
    msgContent.addEventListener("pointerdown", () => {
      s_barDivL.style.left = "-300px";

     
    
    });
    msgPrivate.forEach(chatWindow=>{
      chatWindow.addEventListener("pointerdown", () => {
        s_barDivL.style.left = "-300px";
       
      
    })
    });
  }
});


ApearRSbar.addEventListener("pointerdown", () => {
  if (s_barDivR.style.right == "0px") {
    s_barDivR.style.right = "-300px";
  } else {
    s_barDivR.style.right = "0px";
    msgContent.addEventListener("pointerdown", () => {
      s_barDivR.style.right = "-300px";
    });
    // console.log(index);
    msgPrivate.forEach(chatWindow=>{
      chatWindow.addEventListener("pointerdown", () => {
        s_barDivR.style.right = "-300px";
   
      
     });
     })
  }
});



msgContent.addEventListener("pointerdown", () => {
  headIcon.style.scale="0.7";
  headIcon.style.left="0";
  headIcon.style.top="0";
})






// socket.on("user-has-joined", (data) => {
//   data.value =  "joined";

//   // activeBox.innerHTML="Active : " +data[1];
//   notifyMsg(data, "green2");
//   // console.log(data,"has joined");
// });

// // reading the mesasage  the user joined.
// socket.on(name,(data)=>
// {

//         //data[1] is the getcontact from the database..... left user permenant chats. 
//         Array.from(data[1]).forEach((data)=>{

//           listofUserL[noLeftmgs] = document.createElement('li');
//           //created and appending the list.
//           listofUserL[noLeftmgs].classList.add('pseudoclass');
//           listofUserL[noLeftmgs].classList.add((data.contactName).trim().split(/\s+/)[0]);
//           s_barDivL.appendChild(listofUserL[noLeftmgs]);

        
//         //writing the button
//         listBtnL[noLeftmgs]=document.createElement('button');
//         listBtnL[noLeftmgs].classList.add('listBtn');
//         listBtnL[noLeftmgs].classList.add((data.contactName).trim().split(/\s+/)[0]);
//         listofUserL[noLeftmgs].appendChild( listBtnL[noLeftmgs]);

// //adding only chat window whose name is not present  in the list of permenant side contact.

//           // associating the chat window with each contact creating in the left side bar
//     msgPrivate[nochatWindow]= document.createElement('div');
//     msgPrivate[nochatWindow].classList.add("msg_private");
//     msgPrivate[nochatWindow].classList.add("contdark");
//     msgPrivate[nochatWindow].classList.add((data.contactName).trim().split(/\s+/)[0]);
//     bodyTag.appendChild( msgPrivate[nochatWindow]);

//     nochatWindow++;



//           // writing the user icon
//           iconofUserL[noLeftmgs]=document.createElement('span');
//           iconofUserL[noLeftmgs].classList.add('material-symbols-outlined');
//           iconofUserL[noLeftmgs].classList.add((data.contactName).trim().split(/\s+/)[0]);
//           iconofUserL[noLeftmgs].classList.add('iconPosition');
//           listBtnL[noLeftmgs].appendChild( iconofUserL[noLeftmgs]);
//           iconofUserL[noLeftmgs].innerHTML='person';



 

        

//           // writing the user name inside the button
//           listnameL[noLeftmgs]=document.createElement('span');
//           listnameL[noLeftmgs].classList.add('pseudoClass');
//           listnameL[noLeftmgs].classList.add((data.contactName).trim().split(/\s+/)[0]);
//           listBtnL[noLeftmgs].appendChild( listnameL[noLeftmgs]);
//           if(data.contactName == name) listnameL[noLeftmgs].innerHTML=data.contactName +' (me)';
//           else  listnameL[noLeftmgs].innerHTML=data.contactName ;
//           noLeftmgs++;
//         });

//         (listBtnL).forEach((singleBtn)=>{
        
//           singleBtn.addEventListener('pointerdown',handleLeftBtnclick);
        
//            });


  
//   // data is the array containg three DataTransferItemList.
//   // data[2] is the object of information given by server.js 


//           //data[0] is the getdata from the database..... only for the group chat window.
//           Array.from(data[0]).forEach((eachdata)=>{

//             if(eachdata.value !='joined' && eachdata.value !='left')
//             {
//               if(eachdata.name == name)
//               {
//                 outMsg('group',eachdata);
//               }
  
//               else{
//                 inMsg('group',eachdata);
//               }
//             }
  
//             else{
//               notifyMsg(eachdata);
//             }
  
  
  
  
  
//           });
  
  
  
  
  
  
  
  
  



//         // data[2] is the personal message of the name user with its contacts.
//         Array.from(data[2]).forEach((eachdata)=>{

//           Array.from(data[2]).forEach((specificdata)=>{

//           console.log(specificdata,typeof(specificdata),specificdata.value,specificdata.name);
        
//               if(specificdata[0].value !='right')
//               {
//                 // pssing the parameter eachdata.name to get to know in which chat window the data has to printed.
//                 outMsg(specificdata[0].name,specificdata);
//               }
  
//               else{
//                 inMsg(specificdata[0].name,specificdata);
//               }


//             });
          

//         })
     


      

//           var ctime = new Date();

//           notifyMsg({
//             name,
//             value: "joined",
//             time: ctime.toLocaleString(),
//           }, "greenme");

 
// });


// // no and list of user is in right side bar 
// socket.on("noOfuser", (activUser) => {
 
//   activeBox.innerHTML = "Active : " + activUser.no;


//   if(activUser.no >1)
//   {
    
//     ////removed event listener 
//     (listnameR).forEach((singleBtn)=>{
//       singleBtn.removeEventListener('pointerdown',handleBtnclick);
         
//        });
  
//   }
 


// // niche wala code tab chalega jab aap hi woh user ho  jo abhi  akhir me join hua h uske phele k sab user right side load honge.
// if( (s_barUListR.children).length==0 )
//  {
  
  
//         Array.from(activUser.content).forEach((userName,i) => {
//             listofUserR[i] = document.createElement(activUser.type);
//             listofUserR[i].classList.add('pseudoClass');
//             listofUserR[i].classList.add(userName);
            
//   // when user is connecting in the group chat then already existed users window creation.
//           listnameL.forEach(leftname=>{
//             console.log(leftname,(leftname.innerHTML).trim().split(/\s+/)[0] ,userName);
//             if((leftname.innerHTML).trim().split(/\s+/)[0] === userName)
//             {
//               windowFlag=false
//               console.log(windowFlag)
//             }
//           })
//           console.log(windowFlag)
//           //adding only chat window whose name is not present  in the list of permenant side contact.
//           // console.log('line 626 error auto matically adding the chat page already existing');

//           if(windowFlag== true)
//           {
//             console.log('line 626 error auto matically adding the chat page already existing');

//             msgPrivate[nochatWindow]= document.createElement('div');
//             msgPrivate[nochatWindow].classList.add("msg_private");
//             msgPrivate[nochatWindow].classList.add("contdark");
//             bodyTag.appendChild( msgPrivate[nochatWindow]);

//             nochatWindow++;

//           }
//           windowFlag=true;
      
    
//             //created and appending the list.
            
//             s_barUListR.appendChild(listofUserR[i]);
        
          
//             //writing the button
//             listBtnR[i]=document.createElement(activUser.typeB);
//             listBtnR[i].classList.add('listBtn');
//             listBtnR[i].classList.add(userName);
//             listofUserR[i].appendChild( listBtnR[i]);
            


//             // writing the user icon
//             iconofUserR[i]=document.createElement(activUser.typeS);
//             iconofUserR[i].classList.add('material-symbols-outlined');
//             iconofUserR[i].classList.add(userName);
//             iconofUserR[i].classList.add('iconPosition');
 
//             listBtnR[i].appendChild( iconofUserR[i]);
//             iconofUserR[i].innerHTML='person';
          

          

//             // writing the user name inside the button
//             listnameR[i]=document.createElement(activUser.typeS);
//             listnameR[i].classList.add('pseudoClass');
//             listnameR[i].classList.add(userName);
//             listBtnR[i].appendChild( listnameR[i]);
//             if(userName == name) listnameR[i].innerHTML=userName +' (me)';
//             else  listnameR[i].innerHTML=userName ;
 
//             // i++;
//         });



//       }

//       //apke join hone k baad koi join hota toh
//       else{

//      //   when another user is enetred in the group chat then checking its name in the left list then alloting it a chat window 


//         // when user is connecting in the group chat then already existed users window creation.
//         listnameL.forEach(leftname=>{
//           console.log((activUser.content[activUser.no-1]));
//           if((leftname.innerHTML).trim().split(/\s+/)[0]  === (activUser.content[activUser.no-1]))
//           {
//             windowFlag=false
//           }
//         })
//         //adding only chat window whose name is not present  in the list of permenant side contact.
//         if(windowFlag== true)
//         {
//           console.log('line 626 error auto matically adding the chat page already existing');
//           msgPrivate[nochatWindow]= document.createElement('div');
//           msgPrivate[nochatWindow].classList.add("msg_private");
//           msgPrivate[nochatWindow].classList.add("contdark");
//           bodyTag.appendChild( msgPrivate[nochatWindow]);

//           nochatWindow++;

//         }
//         windowFlag=true;
       
//             listofUserR[activUser.no-1] = document.createElement(activUser.type);
//             listofUserR[activUser.no-1].classList.add('pseudoClass');
//             listofUserR[activUser.no-1].classList.add(activUser.content[activUser.no-1] );
//   //  created and appending the list.
    
//   s_barUListR.appendChild(listofUserR[activUser.no-1]);
 
 
//    //writing the button
//    listBtnR[activUser.no-1]=document.createElement(activUser.typeB);
//    listBtnR[activUser.no-1].classList.add('listBtn');
//    listBtnR[activUser.no-1].classList.add(activUser.content[activUser.no-1] );
//    listofUserR[activUser.no-1].appendChild( listBtnR[activUser.no-1]);
 
// console.log('667 right button appended')

//     // writing the user icon
//     iconofUserR[activUser.no-1]=document.createElement(activUser.typeS);
//      iconofUserR[activUser.no-1].classList.add('material-symbols-outlined');
//      iconofUserR[activUser.no-1].classList.add(activUser.content[activUser.no-1] );
//      iconofUserR[activUser.no-1].classList.add('iconPosition');
//      listBtnR[activUser.no-1].appendChild( iconofUserR[activUser.no-1]);
//     iconofUserR[activUser.no-1].innerHTML='person';
  

   

//     // writing the user name inside the button
//     listnameR[activUser.no-1]=document.createElement(activUser.typeS);
//     listBtnR[activUser.no-1].appendChild( listnameR[activUser.no-1]);
//     listnameR[activUser.no-1].classList.add('pseudoClass');
//     listnameR[activUser.no-1].classList.add(activUser.content[activUser.no-1] );
//     if(activUser.content[activUser.no-1] == name) listnameR[activUser.no-1].innerHTML=activUser.content[activUser.no-1] +' (me)';
//     else  listnameR[activUser.no-1].innerHTML=activUser.content[activUser.no-1] ;

    

//       }
    
//           (listBtnR).forEach((singleBtn)=>{
         
    
//             singleBtn.addEventListener('pointerdown',handleBtnclick
//             );
//             // opening the privateMsg when clicked on once  
         
           
//         // index
 
         
        
//           });
        




















//     // adding event listener to each button
   
//     // (listBtnR).forEach((singleBtn,index)=>{
    
//     //   singleBtn.addEventListener('pointerdown', (e)=>{
//     //     // opening the privateMsg when clicked on once  

//     //     if( msgPrivate[index].style.left!="auto" &&  msgContent.style.display!="none")
//     //     {
          
//     //     msgContent.style.display="none";
//     //     msgPrivate[index].style.display="flex";
//     //     msgPrivate[index].style.left="auto";
//     //     headtext.innerHTML=listnameR[index].innerHTML;
   
        
      
//     //     }
//     //     // opening the group chat when clicked twice on the same name;
//     //     else if(  headtext.innerHTML  == listnameR[index].innerHTML)
//     //    {
//     //     console.log(index,"Else if msgContent.style.display=flex");
//     //     msgContent.style.display="flex";
//     //     msgPrivate[index].style.display="none";
//     //     msgPrivate[index].style.left="-100vw";
//     //     headtext.innerHTML='Welcome To ChatBook !';
      
//     //    }
//     //    // opening the another private chat from other private chat
    
//     //    else
//     //    {
//     //        msgContent.style.display="none";
//     //        listnameR.forEach((listname,Lno)=>{
//     //       console.log(listname.innerHTML);
//     //       if(headtext.innerHTML==listname.innerHTML)
//     //       {
//     //         msgPrivate[Lno].style.display="none";
//     //         console.log(`msgPrivate[${Lno}].style.display="none";`);
//     //       }
//     //     });
//     //     // display none to the  msg window jisse dusre pe click kiya gya hai.
//     //     msgPrivate[index].style.display="flex";
//     //     msgPrivate[index].style.left="auto";
//     //     headtext.innerHTML=listnameR[index].innerHTML;
    
//     //    }
    
  
//     //  });
     
    
//     //   });
    

      

//     msgPrivate[index].addEventListener("pointerdown", () => {
//           headIcon.style.scale="0.7";
//           headIcon.style.left="0";
//           headIcon.style.top="0";
//         });






// });


// socket.on("message", (data) => {
//   inMsg(data);
//   msgContent.scrollTop = msgContent.scrollHeight;
// });

// socket.on("user-has-left", (data) => {
//   notifyMsg(data, "pink");
// });
// // user sending message
// applyting the condition to the format of data object gebnerated here.using headtext bar.
sendBtn.addEventListener("pointerdown", () => {
  if (msgInput.value != "") {
    var ctime = new Date();
    if(headtext.innerHTML == 'Welcome To ChatBook !' )
    {
      data = {
        name,
        value: msgInput.value,
        time: ctime.toLocaleString(),
      };

    }

    else{
      data = {
        name: headtext.innerHTML.trim().split(/\s+/)[0] ,
        value: msgInput.value,
        time: ctime.toLocaleString(),
      };

    }
    // data='<h5>'+name+ '</h5>'+msgInput.value+'<h6>' +ctime.toLocaleString()+'</h6>';
    // if(msgPrivate[index].style.left!="auto")
    // {
    // //   socket.emit("message", data);
    //   outMsg('group',data);
    // }
    // else{
    //   socket.emit('personalMsg',name,data);
      console.log('emitteddddd1');
      outMsg(data.name,data);
//    }
  } 
});

document.addEventListener("keypress", (e) => {
  if (e.key == "Enter" && msgInput.value != "") {
    var ctime = new Date();
    if(headtext.innerHTML == 'Welcome To ChatBook !' )
      {
        data = {
          name,
          value: msgInput.value,
          time: ctime.toLocaleString(),
        };
  
      }
  
      else{
        data = {
          name: (headtext.innerHTML).trim().split(/\s+/)[0],
          value: msgInput.value,
          time: ctime.toLocaleString(),
        };
  
      }
    // // data='<h5>'+name+ '</h5>'+msgInput.value+'<h6>' +ctime.toLocaleString()+'</h6>';
    // // if(msgPrivate[index].style.left!="auto")
    // //   {
    // //     // socket.emit("message", data);
    // //     outMsg('group',data);
    // //   }
    // //   else{
    //     console.log('emitteddddd0');
        // socket.emit('personalMsg',name,data);
       // data.name contains the headtext.innerhtml
        outMsg(data.name,data);
    //   }

      
   
  }
});

// dark- light mode
switchmode.addEventListener("pointerdown", () => {
  if (mode == "dark") {
    togglePos.classList.remove("toggleAop");
    togglePos.classList.add("toggleOp");
    msgContent.classList.add("contLight");
    msgContent.classList.remove("contdark");
    msgPrivate.forEach((window)=>{
      window.classList.add("contLight");
      window.classList.remove("contdark");
    })
    msgInput.style.borderColor = "purple";
    msgInput.style.color = "#5b295b";
    headBar.style.backgroundColor="rgb(10, 75, 75)";
    s_barDivL.style.backgroundColor="rgb(10, 75, 75)";
    s_barDivR.style.backgroundColor="rgb(10, 75, 75)";
    s_barDivL.style.color="black";
    s_barDivR.style.color="black";
    

    

    mode = "light";
  } else {
    togglePos.classList.add("toggleAop");
    togglePos.classList.remove("toggleOp");
    msgContent.classList.remove("contLight");
    msgContent.classList.add("contdark");
    msgPrivate.forEach(window=>{
      window.classList.remove("contLight");
      window.classList.add("contdark");
    })
  
    msgInput.style.borderColor = "black";
    msgInput.style.color = "black";
    headBar.style.backgroundColor="rgb(9 27 27)";
    s_barDivL.style.backgroundColor="rgb(9 27 27)";
    s_barDivR.style.backgroundColor="rgb(9 27 27)";
    s_barDivL.style.color="white";
    s_barDivR.style.color="white";
    mode = "dark";
  }
});


headIcon.addEventListener('pointerdown',()=>
{
  if( headIcon.style.scale!="4")
  {
    headIcon.style.scale="4";
    headIcon.style.left="20vw";
    headIcon.style.top="25vh";
    
  
  }
  else{
    headIcon.style.scale="0.7";
    headIcon.style.left="0";
    headIcon.style.top="0";
  
  }

})

msgInput.addEventListener('input',()=>{
 
  msgInput.style.height='auto';
  msgInput.style.height=( msgInput.scrollHeight)+'px';
  msgInput.value=msgInput.value.replace(/\n/g,'');

  // console.log(msgInput.style.height,msgInput.scrollHeight,msgInput.value);
  if(msgInput.value =="" )
  {
    msgInput.style.height='40px';
   
  }
  // console.log('yes');
})


// adding click event listener on call and video call icon.

callTools.forEach((callTool)=>
  {
   
    callTool.addEventListener('pointerdown',(event)=>{
      console.log(OuterVideo.style.display);
      if(OuterVideo.style.display!="flex")
        {
          OuterVideo.style.display="flex";
          
        }

        else{
          OuterVideo.style.display="none";
        }


    })
  



})

  



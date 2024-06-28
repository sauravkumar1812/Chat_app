
export const samplechats = [
  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Doe",
    _id: "1",
    groupChat: false,
    members: ["1", "2"],
  },

  {
    avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
    name: "John Boi",
    _id: "2",
    groupChat: true,
    members: ["1", "2"],
  },
];

export  const sampleUsers=[{
  avatar:["https://write.geeksforgeeks.org/static/media/Group%20210.08204759.svg"],
  name:"Saurav kumar",
  _id:"1",
},
{
  avatar:["https://write.geeksforgeeks.org/static/media/Group%20210.08204759.svg"],
      name:"Saurav singh",
      _id:"2",
}];


export const sampleNotifications=[
  {
    sender:{
      avatar:["https://write.geeksforgeeks.org/static/media/Group%20210.08204759.svg"],
    name:"Saurav kumar",
    },
    _id:"1",
  },
  {
    sender:{
      avatar:["https://write.geeksforgeeks.org/static/media/Group%20210.08204759.svg"],
        name:"Saurav singh",
    },
        _id:"2",
  }
]

export const sampleMessage=[
    {
      attachments: [
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "kiska ka Message hai",
      _id: "sfnsdjkfsdnfkjsbnd",
      sender: {
        _id: "ssdfsdfsdf",
        name: "Chaman ",
      },
      chat: "chatId",
      createdAt: "2024-02-12T10:41:30.630Z",
    },
  
    {
      attachments: [
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "hamko kya hi pata h bhai?",
      _id: "sfnsdjkfsdnfkdbvjdddjsbnd",
      sender: {
        _id: "sdfsdfsdf",
        name: "Chaman 2",
      },
      chat: "chatId",
      createdAt: "2024-02-12T10:41:30.630Z",
    },
  
]


export const dashboardData = {
  users:[{
    avatar:["https://write.geeksforgeeks.org/static/media/Group%20210.08204759.svg"],
    name:"Saurav kumar",
    _id:"1",
    username:"saurav",
    friends:20,
    groups:5
  },
  {
    avatar:["https://write.geeksforgeeks.org/static/media/Group%20210.08204759.svg"],
        name:"Saurav singh",
        _id:"2",
        username:"Shaurya",
    friends:50,
    groups:12
  }],

  chats:[
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "John Doe",
      _id: "1",
      groupChat: false,
      members: [{_id:"1",avatar:"https://www.w3schools.com/howto/img_avatar.png"},
        {_id:"2",avatar:"https://www.w3schools.com/howto/img_avatar.png"},],
      totalMessages: 20,
      totalmembers: 2,
      creator: {
        name: "Saurav",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  
    {
      avatar: ["https://www.w3schools.com/howto/img_avatar.png"],
      name: "The Weekend Wibes",
      _id: "2",
      groupChat: true,
      members: [{_id:"1",avatar:"https://www.w3schools.com/howto/img_avatar.png"},
        {_id:"2",avatar:"https://www.w3schools.com/howto/img_avatar.png"},],
      totalMessages: 96,
      totalmembers: 12,
      creator: {
        name: "Saurav",
        avatar: "https://www.w3schools.com/howto/img_avatar.png",
      },
    },
  ],
  messages:[
    {
      attachments: [
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "kiska ka Message hai",
      _id: "sfnsdjkfsdnfkjsbnd",
      sender: {
        _id: "ssdfsdfsdf",
        name: "Chaman ",
      },
      chat: "chatId",
      createdAt: "2024-02-12T10:41:30.630Z",
    },
  
    {
      attachments: [
        {
          public_id: "asdsad 2",
          url: "https://www.w3schools.com/howto/img_avatar.png",
        },
      ],
      content: "hamko kya hi pata h bhai?",
      _id: "sfnsdjkfsdnfkdbvjdddjsbnd",
      sender: {
        _id: "sdfsdfsdf",
        name: "Chaman 2",
      },
      chat: "chatId",
      createdAt: "2024-02-12T10:41:30.630Z",
    },
  ]
}
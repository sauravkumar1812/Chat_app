const corsOptions = {
    origin: [
       "https://saurav-chat-app-frontend.onrender.com/",
       "https://chat-app-7icu.onrender.com",
      "http://localhost:5173",
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };
  
  const CHATTU_TOKEN = "Chat-app-token";
  
  export { corsOptions, CHATTU_TOKEN };
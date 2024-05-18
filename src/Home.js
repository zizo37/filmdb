import React from 'react';
import Footer from './Footer';
import Header from './Header';
import Content from './Content';
import ChatbotApp from './MovieChatbot/ChatbotApp';

function Home() {
    return (
      <>
        <Header/>
        <Content />
        <Footer/>
        <ChatbotApp/>
      </>

    );
  }
  
  export default Home;
  
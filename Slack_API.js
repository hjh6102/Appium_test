function sendMessage(massage) {


    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
   // myHeaders.append("Authorization", "Bearer xoxb-");
    
    const raw = JSON.stringify({
      "channel": "C06TM8L0MDG",
      "text": "hellooo"
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };
    
    fetch("https://slack.com/api/chat.postMessage", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.error(error));
}
sendMessage('안녕안녕안녕?');

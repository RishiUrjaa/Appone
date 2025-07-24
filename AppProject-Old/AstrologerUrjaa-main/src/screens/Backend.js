
import {initializeApp} from 'firebase/app';
import {
  getDatabase,
  ref,
  set,
  push,
  onValue,
  onChildAdded,
  query,
  orderByChild,
  startAt,
} from 'firebase/database';
import {Alert} from 'react-native';
import store from '../redux/store';
import Global from './Global';
const GLOBAL = require('./Global');
class Backend {
  uid = 1;
  messagesRef = null;
  messagesRefs = null;
  messagesRefss = null;
  // initialize Firebase Backend
  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyD6cPFWvusUHZp_lAJf8RWb7Y-UJlekIXE',
      authDomain: 'astrourzaa.firebaseapp.com',
      databaseURL: 'https://astrourzaa-default-rtdb.firebaseio.com',
      projectId: 'astrourzaa',
      storageBucket: 'astrourzaa.appspot.com',
      messagingSenderId: '517296153273',
      appId: '1:517296153273:web:c453b4a529f5a35dddf168',
      measurementId: 'G-ES4VXG0FVY',
    };

    this.app = initializeApp(firebaseConfig);
    this.firebase = getDatabase(this.app);
  }
  setUid(value) {
    this.uid = value;
  }
  getUid() {
    return this.uid;
  }

  // retrieve the messages from the Backend

  loadMessages(callback) {
    this.messagesRef = ref(this.firebase, 'chat/' + Global.bookingid);

    const onReceive = data => {
      // alert(JSON.stringify(data))
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        //createdAt: new Date(message.createdAt),
        createdAt: message.createdAt,
        status: message.status,
        user_id: message.user_id,
        anotherid: message.another,
        image: message.image,
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };

    onChildAdded(this.messagesRef, onReceive);

    //  this.messagesRef.orderByChild('createdAt').on('child_added', onReceive);
  }

  loadMessages1(callback) {
 
    this.messagesRef = ref(this.firebase, 'chat/' + Global.bookingid);

    const onReceive1 = data => {
      alert(JSON.stringify(data))
      const message = data.val();
      callback({
        _id: data.key,
        text: message.text,
        //createdAt: new Date(message.createdAt),
        createdAt: message.createdAt,
        status: message.status,
        user_id: message.user_id || '0',
        anotherid: message.another,
        image: message.image,
        end: message.end,
        gift: message.gift,
        gift_image: message.gift_image,
        user: {
          _id: message.user._id,
          name: message.user.name,
        },
      });
    };
    let today = new Date();
    var timestamp = new Date(today).toISOString();
    //onChildAdded(this.messagesRef, onReceive1);
    onChildAdded(
      query(this.messagesRef, orderByChild('createdAt'), startAt(timestamp)),
      onReceive1,
    );

    // onChildAdded(this.messagesRef, onReceive);

    //  this.messagesRef.orderByChild('createdAt').on('child_added', onReceive);
  }

  // send the message to the Backend

  sendMessage(message) {
   //alert(JSON.stringify(store.getState().user.user_id))
    this.messagesRef = ref(this.firebase, 'chat/' + Global.bookingid);

    //  this.messagesRef.update({ status: true});
    // alert(GLOBAL.chatstatus)
    //         if (GLOBAL.chatstatus == true) {
    //console.log(new Date(firebase.database.ServerValue.TIMESTAMP));
    var today = new Date();
    /* today.setDate(today.getDate() - 30);
            var timestamp = new Date(today).toISOString(); */
    var timestamp = today.toISOString();
    //this.messagesRef = [];
    for (let i = 0; i < message.length; i++) {
      var z = '';
      var k = message[i].hasOwnProperty('image');
      if (k == true) {
        z = message[i].image;
      } else {
        z = '';
      }
      if (message[i].text != '') {
        //  const newMessageRef = push(this.messagesRef);
        push(this.messagesRef, {
          text: message[i].text,
          user: message[i].user,
          createdAt: timestamp,
          user_id: store.getState().user.user_id|| '0',
          anotherid: Global.data.astrologerdetails?.id || '0',
          status: false,
          image: z,
          end: '',
          gift: message[i].gift || '',
          gift_image: message[i].gift_image || '',
        });
      }
      //  this.messagesRefs.update({ typinguser: false, typinganother: false ,name :GLOBAL.myname,userid:GLOBAL.user_id});
    }
    //    }
  }

  sendMessage1(message) {
    // alert(JSON.stringify(message));
    //  this.messagesRef.update({ status: true});
    // alert(GLOBAL.chatstatus)
    //         if (GLOBAL.chatstatus == true) {
    //console.log(new Date(firebase.database.ServerValue.TIMESTAMP));
    var today = new Date();
    /* today.setDate(today.getDate() - 30);
            var timestamp = new Date(today).toISOString(); */
    var timestamp = today.toISOString();
    //this.messagesRef = [];
    for (let i = 0; i < message.length; i++) {
      var z = '';
      var k = message[i].hasOwnProperty('image');
      if (k == true) {
        z = message[i].image;
      } else {
        z = '';
      }
      if (message[i].text != '') {
        //  const newMessageRef = push(this.messagesRef);
        push(this.messagesRef, {
          text: message[i].text,
          user: message[i].user,
          createdAt: timestamp,
          user_id: store.getState().user.id,
          anotherid: Global.data.astrologerdetails?.id || '0',
          status: false,
          image: z,
          end: '',
          gift: message[i].gift || '',
          gift_image: message[i].gift_image || '',
        });
      }
      //  this.messagesRefs.update({ typinguser: false, typinganother: false ,name :GLOBAL.myname,userid:GLOBAL.user_id});
    }
    //    }
  }

  // close the connection to the Backend
  closeChat() {
    if (this.messagesRef) {
      //this.messagesRef.off();
    }
  }

  getLimit() {
    var today = new Date();
    //var milliseconds = Date.parse(today);
    //var changed = milliseconds - 86400000; //10 minutes (- 900000) -  86400000 1 day
    today.setDate(today.getDate() - 31); // last 30 Days
    //console.log(today);
    var changedISODate = new Date(today).toISOString();
    //var changedISODate = today.toISOString();
    console.log(changedISODate);
    return changedISODate;
  }
}

export default new Backend();
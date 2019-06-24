import io from 'socket.io-client';
import back_server from '../../../func/back_server';
const socket = io.connect('http://'+back_server.ws_api_base_url(),{path:'/neo4j_rebuild'});

function subscribeToTimer(cb) {
  socket.on('timer', timestamp => cb(null, timestamp));
  socket.emit('subscribeToTimer', 1000);
}

export { subscribeToTimer };
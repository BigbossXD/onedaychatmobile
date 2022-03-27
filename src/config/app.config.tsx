const JoyseImage = require('../assets/userImage/Joyse.png');
const RussellImage = require('../assets/userImage/Russell.png');
const SamImage = require('../assets/userImage/Sam.png');

export const GRAPHQL_URL: string =
  'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql';

export const USERS = [
  {userId: 'Joyse', avatar: JoyseImage},
  {userId: 'Russell', avatar: RussellImage},
  {userId: 'Sam', avatar: SamImage},
];

export const CHANNELS = [
  {
    channelId: '1',
    name: 'General',
  },
  {channelId: '2', name: 'LGTM'},
  {channelId: '3', name: 'Technology'},
];

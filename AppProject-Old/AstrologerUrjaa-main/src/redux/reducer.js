import {AsyncStorageClear} from '../service/Api';
const data = {
  user: {},
  approved: false,
  app_status: false,
  netInfo: {
    details: {},
    isConnected: false,
    isInternetReachable: false,
    isWifiEnabled: false,
    type: '',
  },
  deviceInfo: {
    id: '',
    token: '',
    model: '',
    os: '',
  },
  skillList: [],
  states: [],
  cities: [],
};
const reducer = (state = data, action) => {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.payload,
      };
    case 'logout':
      AsyncStorageClear();
      return {
        ...state,
        user: {},
      };
    case 'setStates':
      return {
        ...state,
        states: action.payload,
      };
    case 'setCities':
      return {
        ...state,
        cities: action.payload,
      };
    case 'setNetInfo':
      return {
        ...state,
        netInfo: action.payload,
      };
    case 'setDeviceInfo':
      return {
        ...state,
        deviceInfo: action.payload,
      };
    case 'skillList':
      return {
        ...state,
        skillList: action.payload,
      };
    // case 'init':
    //     return {
    //         ...state,
    //         created: action.payload.created,
    //         shared_with_me: action.payload.shared_with_me
    //     }
    // case 'modeChange':
    //     window.localStorage.setItem('amsMode', action.payload.mode)
    //     return {
    //         ...state,
    //         mode: action.payload.mode,
    //         program: {}
    //     }
    // case 'onCodeChange':
    //     return {
    //         ...state,
    //         code: action.payload
    //     }

    // case 'openProject':
    //     return {
    //         ...state,
    //         type: action.payload.type,
    //         program: action.payload.program

    //     }
    // case 'newProject':
    //     return {
    //         ...state,
    //         program: action.payload,
    //         created: [...state.created, action.payload]
    //     }
    // case 'updateProject':
    //     return {
    //         ...state,
    //         program: { ...state.program, file_name: action.payload.fileName, code: action.payload.code },
    //         created: state.created.map(obj => obj.program_id !== action.payload.id ? obj : { ...obj, file_name: action.payload.fileName, code: action.payload.code })
    //     }
    // case 'deleteProject':
    //     return {
    //         ...state,
    //         created: state.created.filter(obj => obj.program_id !== action.payload)
    //     }
    // case 'shareCourse':
    //     return {
    //         ...state,
    //         shareCourse: action.payload
    //     }
    default:
      return state;
  }
};

export default reducer;

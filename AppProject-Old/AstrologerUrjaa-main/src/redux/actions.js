export const Login = (user) => ({type: 'login', payload: user ? user : {}});
export const Logout = () => ({type: 'logout'});
export const SetStates = (states) => ({type: 'setStates', payload: states});
export const SetCities = (cities) => ({
  type: 'setCities',
  payload: cities,
});
export const SetDeviceInfo = (deviceInfo) => ({
  type: 'setDeviceInfo',
  payload: deviceInfo,
});

export const SetNetInfo = (netInfo) => ({type: 'setNetInfo', payload: netInfo});
export const SkillList = (list) => ({type: 'skillList', payload: list});

// export const init = (created, shared_with_me) => {
//     store.dispatch({
//         type: 'init',
//         payload: {
//             created: created,
//             shared_with_me: shared_with_me
//         }
//     })
// }
// export const modeChange = mode => store.dispatch({
//     type: 'modeChange',
//     payload: { mode }
// })

// export const openProject = (program, type) => store.dispatch({
//     type: 'openProject',
//     payload: { program, type }
// })
// export const newProject = obj => store.dispatch({
//     type: 'newProject',
//     payload: obj
// })
// export const updateProject = obj => store.dispatch({
//     type: 'updateProject',
//     payload: obj
// })
// export const deleteProject = program_id => store.dispatch({
//     type: 'deleteProject',
//     payload: program_id
// })
// export const shareCourse = shareCourseList => store.dispatch({
//     type: 'shareCourse',
//     payload: shareCourseList
// })

// export const onCodeChange = code => store.dispatch({ type: 'onCodeChange', payload: code })

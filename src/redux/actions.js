/*
actions.js
This file will handle the change of path that's being caught from currently SimulatePathChange
imports the constants from actionTypes
the constants are so redux can differentiate the actions if ever expanded
 */
//import { CHANGE_PATH } from './actionTypes'

let path = './' // change './' to whatever the default path is
// export const changePath = content => ({
//     type: CHANGE_PATH,
//     payload: {
//         path: path === content.path ? path : content.path,
//         content
//     }
// })
/*
file is used to pass the state mappings between files
 */
export const getPathState = store => store.paths

export const getPath = store => getPathState(store) ? getPathState(store).paths.path : './'
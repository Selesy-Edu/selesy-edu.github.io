//Action creator

export const loginFirstStage = (state) => {
  return {
    type: 'FIRST_STAGE_LOGIN',
    payload: state
  };
}

export const userRollPass = (pass) => {
  return {
    type: 'FIRST_STAGE_PASSWORD',
    payload: pass
  };
}

export const loadUserInfo = (snapshot) => {
  return {
    type: 'USER_INFO_LOADED',
    payload: snapshot
  };
}

export const loadUserData = (data) => {
  return {
    type: 'USER_ALREADY_LOGGED',
    payload: data
  };
}

export const loadContent = (data) => {
  return {
    type: 'CONTENT_LOADED',
    payload: data
  };
}

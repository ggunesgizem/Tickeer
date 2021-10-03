export enum ResponseStatus {
  NOT_FOUND = 404,
  SUCCESS = 200,
  INTERNAL_SERVER_ERROR = 500,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
}

export enum WorkoutType {
  AMRAP = 'AMRAP',
  EMOM = 'EMOM',
  FORTIME = 'FORTIME',
  TABATA = 'TABATA',
  COMBINE = 'COMBINE',
  REST = 'REST',
}

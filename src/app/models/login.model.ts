export interface LoginModel {
  email: string
  password: string
  loggedin?: boolean
}

export interface LoginResponse {
  token: string
  rol: string
}

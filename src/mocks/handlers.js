import { http, HttpResponse } from 'msw'

const baseUrl = "https://base-locations-api-29bf40c34f1d.herokuapp.com/"

export const handlers = [
  http.get(`${baseUrl}dj-rest-auth/user/`, () => {
    return HttpResponse.json({
      currentUser: {
        pk: 1,
        username: "jakeo",
        email: "jakeorton99@gmail.com",
        first_name: "",
        last_name: "",
        profile_id: 1,
        profile_image: "https://res.cloudinary.com/dz02qubd3/image/upload/v1/media/images/base-forum-logo_yrtjpd",
      }
    })
  }),
  
  http.post(`${baseUrl}dj-rest-auth/logout/`, () => {
    return new HttpResponse(null, { status: 200 })
  })
]

export const loggedOutHandler = http.get(`${baseUrl}dj-rest-auth/user/`, () => {
  return new HttpResponse(null, { status: 401 });
});
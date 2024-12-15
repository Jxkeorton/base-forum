import { rest } from "msw";

const baseUrl = "https://base-locations-api-29bf40c34f1d.herokuapp.com/";

export const handlers = [
  rest.get(`${baseUrl}dj-rest-auth/user`, (res, req, ctx) => {
    return res(
      ctx.json({
        pk: 1,
        username: "jakeo",
        email: "jakeorton99@gmail.com",
        first_name: "",
        last_name: "",
        profile_id: 1,
        profile_image:
          "https://res.cloudinary.com/dz02qubd3/image/upload/v1/media/images/base-forum-logo_yrtjpd",
      })
    );
  }),
  rest.post(`${baseUrl}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  })
];

import { HttpResponse, delay, http } from 'msw';

const baseUrl = 'https://base-locations-api-29bf40c34f1d.herokuapp.com/';

const mockUser = {
  pk: 1,
  username: 'jakeo',
  email: 'jakeorton99@gmail.com',
  first_name: '',
  last_name: '',
  profile_id: 1,
  profile_image: 'https://res.cloudinary.com/dz02qubd3/image/upload/v1/media/images/base-forum-logo_yrtjpd',
};

const mockLocation = {
  id: 10,
  name: 'La Tête de Chien',
  country: 'France',
  longitude: '7.403012',
  latitude: '43.731660',
  rock_drop: 328,
  total_height: 400,
  access: '0 minutes with shuttle: Park at the Tête de Chien panorama car park.',
  cliff_aspect: 'SE',
  opened_by: 'Gillian Hamcy , David Degrado',
  date_opened: '2018-12-30',
  image: 'https://res.cloudinary.com/dz02qubd3/image/upload/v1733696696/Untitled_design_15_upirhl.png',
};

export const handlers = [
  // User Authentication
  http.get(`${baseUrl}dj-rest-auth/user/`, async () => {
    await delay(100); // Add small delay to simulate network
    return HttpResponse.json(mockUser);
  }),

  http.post(`${baseUrl}dj-rest-auth/login/`, async () => {
    await delay(100);
    return HttpResponse.json({
      user: mockUser,
      access_token: 'fake-access-token',
      refresh_token: 'fake-refresh-token',
    });
  }),

  http.post(`${baseUrl}dj-rest-auth/logout/`, async () => {
    await delay(100);
    return new HttpResponse(null, { status: 200 });
  }),

  http.post(`${baseUrl}dj-rest-auth/token/refresh/`, async () => {
    await delay(100);
    return HttpResponse.json({
      access: 'new-fake-access-token',
    });
  }),

  // Locations
  http.get(`${baseUrl}locations`, async () => {
    await delay(100);
    return HttpResponse.json({
      results: [mockLocation],
      count: 1,
      next: null,
      previous: null,
    });
  }),

  http.get(`${baseUrl}locations/:id`, async () => {
    await delay(100);
    return HttpResponse.json(mockLocation);
  }),

  // Profile
  http.get(`${baseUrl}profile/:id`, async () => {
    await delay(100);
    return HttpResponse.json({
      id: 1,
      owner: 'jakeo',
      name: 'Jake',
      no_of_base_jumps: 10,
      image: mockUser.profile_image,
    });
  }),

  // Reviews
  http.get(`${baseUrl}reviews/`, async () => {
    await delay(100);
    return HttpResponse.json({
      results: [],
      count: 0,
      next: null,
      previous: null,
    });
  }),

  // Saved Locations
  http.get(`${baseUrl}saved-locations/`, async () => {
    await delay(100);
    return HttpResponse.json({
      results: [],
      count: 0,
      next: null,
      previous: null,
    });
  }),
];

// Handler for logged out state
export const loggedOutHandler = http.get(`${baseUrl}dj-rest-auth/user/`, () => {
  return new HttpResponse(null, { status: 403 });
});
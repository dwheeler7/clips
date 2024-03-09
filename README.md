# Seattle Clippings 
A web app for posting and claiming free plant clippings. 

## How it works
- Users can post plants and the amount of clippings they have to share
- Users can see available plants and the number of clippings available
- Users can claim any number of clippings by adding them to a cart and checking out

### Missing functionality needed to launch
- Ability to upload plant images
- Order fullfilment
- User settings page

## API

### Users
Service for creating, logging in, and checking tokens for users. User routes don't require authorization.

- Create user (POST, /api/users)
- Login (POST, /api/users/login)
- Check token (POST, /api/users/check-token)

### Clippings
CRUD operations for clippings. Clippings API requires authorization.

- Create clipping (POST, /api/clippings)
- Read clipping (GET, /api/clippings/:id)
- Update (UT, /api/clippings/:id)
- Delete (DELETE, /api/clippings/:id)

#### Clippings object
Clipping must have the following properties to create:
- Plant name (.plant)
- Description (.description)
- Number of clippings (.clippingsNum)
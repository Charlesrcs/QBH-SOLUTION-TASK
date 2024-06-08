
const BASEURL='http://localhost:3000/api/user-details';
export const environment = {
  production: true,
  baseURL: '',
  deploy_type: 'developing',
  getUserDetails:`${BASEURL}/get-user-details`,
  postUserDetails:`${BASEURL}/post-userDetails`,
  updateUserDetails:`${BASEURL}/update-userDetails`,
  deleteUserDetails:`${BASEURL}/delete-userDetails`,
};

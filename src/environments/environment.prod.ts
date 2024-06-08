const BASEURL='http://localhost:3000/api/user-details';
export const environment = {
  production: false,
  deploy_type: 'production',
  getUserDetails:`${BASEURL}/get-user-details`,
  postUserDetails:`${BASEURL}/post-userDetails`,
  updateUserDetails:`${BASEURL}/update-userDetails`,
  deleteUserDetails:`${BASEURL}/delete-userDetails`,
};

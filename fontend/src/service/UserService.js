import axios from "axios";

const HandleLoginAPI = async (userNmae, userPassword) => {
  return await axios.post("http://localhost:4000/api/login", {
    username: userNmae,
    password: userPassword,
  });
};

const GetAllUsers = (inputId) => {
  return axios.get(`http://localhost:4000/api/get-all-user?id=${inputId}`);
};

const createNewUserService = (data) => {
  console.log("check data", data);
  return axios.post("http://localhost:4000/api/create-new-user", data);
};

const deleteUserService = (userName) => {
  return axios.delete("http://localhost:4000/api/delete-user", {
    data: {
      username: userName,
    },
  });
};

const editUserService = (inputData) => {
  return axios.put("http://localhost:4000/api/edit-user", inputData);
}

export { HandleLoginAPI, GetAllUsers,
  createNewUserService, deleteUserService,
  editUserService,
};

import instance from "../utils/apiServices";
export const postCreateNewUser = (email, password, userName, role, image) => {
    const data = new FormData();
    data.append("email", email);
    data.append("password", password);
    data.append("username", userName);
    data.append("role", role);
    data.append("userImage", image);
    return instance.post("api/v1/participant", data);
};
export const putUpdateUser = (id, userName, role, image) => {
    const data = new FormData();
    data.append("id", id);
    data.append("username", userName);
    data.append("role", role);
    data.append("userImage", image);
    return instance.put("api/v1/participant", data);
};
export const getAllUser = () => {
    return instance.get("api/v1/participant/all");
};

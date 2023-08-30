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
export const getListQuizByUser = () => {
    return instance.get("api/v1/quiz-by-participant");
};
export const getQuizId = (id) => {
    return instance.get(`api/v1/questions-by-quiz?quizId=${id}`);
};
export const postLogin = (email, password) => {
    return instance.post("api/v1/login", { email, password, delay: 3000 });
};
export const postRegister = (email, password, username) => {
    return instance.post("api/v1/register", { email, password, username });
};
export const postSubmitQuiz = (data) => {
    return instance.post("api/v1/quiz-submit", { ...data });
};
export const postCreateQuiz = (description, image, difficulty, name) => {
    const data = new FormData();
    data.append("description", description);
    data.append("name", name);
    data.append("difficulty", difficulty);
    data.append("quizImage", image);
    return instance.post("api/v1/quiz", data);
};
export const getPaginationUser = (page, limit) => {
    return instance.get(`api/v1/participant?page=${page}&limit=${limit}`);
};
export const deleteUser = (userId) => {
    return instance.delete("api/v1/participant", { data: { id: userId } });
};

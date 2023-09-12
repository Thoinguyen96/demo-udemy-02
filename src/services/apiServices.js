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
export const putEditQuiz = (id, type, name, description, image) => {
    const data = new FormData();
    data.append("id", id);
    data.append("difficulty", type);
    data.append("name", name);
    data.append("description", description);
    data.append("quizImage", image);
    return instance.put("api/v1/quiz", data);
};
export const getAllUser = () => {
    return instance.get("api/v1/participant/all");
};
export const getQuizWidthQA = (quizId) => {
    return instance.get(`api/v1/quiz-with-qa/${quizId}`);
};
export const getListQuizByUser = () => {
    return instance.get("api/v1/quiz-by-participant");
};
export const getOverView = () => {
    return instance.get("api/v1/overview");
};
export const getQuizId = (id) => {
    return instance.get(`api/v1/questions-by-quiz?quizId=${id}`);
};
export const getAllDataQuiz = () => {
    return instance.get("api/v1/quiz/all");
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

export const postAssignQuiz = (quizId, userId) => {
    return instance.post("api/v1/quiz-assign-to-user", { quizId, userId });
};
export const postUpdateQuiz = (data) => {
    return instance.post("api/v1/quiz-upsert-qa", { ...data });
};
export const postLogOut = (email, refresh_token) => {
    return instance.post("api/v1/logout", { email, refresh_token });
};
export const postCreateQuiz = (description, image, difficulty, name) => {
    const data = new FormData();
    data.append("description", description);
    data.append("name", name);
    data.append("difficulty", difficulty);
    data.append("quizImage", image);
    return instance.post("api/v1/quiz", data);
};
export const postCreateNewQuestionForQuiz = (quiz_id, description, questionImage) => {
    const data = new FormData();
    data.append("quiz_id", quiz_id);
    data.append("description", description);
    data.append("questionImage", questionImage);
    return instance.post("api/v1/question", data);
};
export const postCreateNewAnswerForQuiz = (description, correct_answer, question_id) => {
    return instance.post("api/v1/answer", { description, correct_answer, question_id });
};
export const getPaginationUser = (page, limit) => {
    return instance.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

export const deleteUser = (userId) => {
    return instance.delete("api/v1/participant", { data: { id: userId } });
};
export const deleteQuiz = (id) => {
    return instance.delete(`api/v1/quiz/${id}`);
};

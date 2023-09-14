import { useTranslation } from "react-i18next";
import { upDatePassWord } from "../../services/apiServices";
import { useState } from "react";
import { toast } from "react-toastify";

function ChangePassWord() {
    const [current_password, setCurrentPassWord] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [newPassWord, setNewPassWord] = useState("");

    const { t } = useTranslation();
    const handleChangePassWord = async () => {
        if (confirmPass === newPassWord) {
            let res = await upDatePassWord(current_password, newPassWord);
            if (res && res.EC === 0) {
                toast.success(res.EM);
            } else {
                toast.error(res.EM);
            }
        } else {
            toast.error(t("ChangePassWord.notConfirm"));
        }
    };
    const handleCurrentPassWord = (e) => {
        setCurrentPassWord(e.target.value);
    };
    const handleNewPassWord = (e) => {
        setNewPassWord(e.target.value);
    };
    const handleConfirmPassWord = (event) => {
        setConfirmPass(event.target.value);
    };
    return (
        <>
            <div className="wrap__change-pass">
                <form className="form-group">
                    <label htmlFor="exampleInputEmail1">{t("ChangePassWord.pass")}</label>
                    <input
                        onChange={(e) => handleCurrentPassWord(e)}
                        type="password"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder={t("ChangePassWord.pass")}
                        value={current_password}
                    />
                </form>
                <form className="form-group">
                    <label htmlFor="exampleInputEmail1">{t("ChangePassWord.newPass")}</label>
                    <input
                        onChange={(e) => handleNewPassWord(e)}
                        type="password"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder={t("ChangePassWord.newPass")}
                        value={newPassWord}
                    />
                </form>

                <form className="form-group">
                    <label htmlFor="exampleInputEmail1">{t("ChangePassWord.confirmPass")}</label>
                    <input
                        onChange={(e) => handleConfirmPassWord(e)}
                        type="password"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder={t("ChangePassWord.confirmPass")}
                        value={confirmPass}
                    />
                </form>
            </div>
            <button onClick={handleChangePassWord} className="btn btn-success mt-3 btn-lg">
                Save
            </button>
        </>
    );
}

export default ChangePassWord;

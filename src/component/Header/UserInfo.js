import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { BiImageAdd } from "react-icons/bi";
import Select from "react-select";
import { useSelector } from "react-redux";
import { UpdateUserInfo } from "../../services/apiServices";
import { toast } from "react-toastify";
import _ from "lodash";

function UserInfo(props) {
    const [userName, setUserName] = useState("");
    const [image, setImage] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("User");
    const [previewImage, setPreviewImage] = useState("");
    const { t } = useTranslation();
    const account = useSelector((state) => state.user.account);

    useEffect(() => {
        if (!_.isEmpty(account)) {
            setUserName(account.username);
            setEmail(account.email);
            setRole(account.role);
            setImage(account.image);
            if (account.image) {
                setPreviewImage(`data:image/png;base64,${account.image}`);
            }
        }
    }, [account]);
    const handleUploadFile = (event) => {
        setPreviewImage(URL.createObjectURL(event.target.files[0]));
        setImage(event.target.files[0]);
    };
    const handleUpdateUserInfo = async () => {
        let res = await UpdateUserInfo(userName, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
        }
    };

    return (
        <>
            <div className="wrap__profile">
                <form className="form-group">
                    <label htmlFor="exampleInputEmail1">{t("UserInfo.username")}</label>
                    <input
                        onChange={(e) => setUserName(e.target.value)}
                        value={userName}
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder={t("UserInfo.username")}
                    />
                </form>
                <form className="form-group">
                    <label htmlFor="exampleInputEmail1">{t("UserInfo.email")}</label>
                    <input
                        value={email}
                        disabled
                        type="email"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder={t("UserInfo.email")}
                    />
                </form>
                <form className="form-group">
                    <label htmlFor="exampleInputEmail1">{t("UserInfo.type")}</label>
                    <Select isDisabled={true} placeholder={role} />
                </form>
            </div>
            <input onChange={(e) => handleUploadFile(e)} hidden id="upload" type="file" />
            <div className="wrapper__upload">
                <label className="image_file btn btn-outline-success mt-3" htmlFor="upload">
                    <BiImageAdd /> Choose file
                </label>
                <div className="preview-image">
                    {previewImage ? <img src={previewImage} /> : <span>Preview Image</span>}
                </div>
                <button onClick={handleUpdateUserInfo} type="submit" className="btn btn-primary mt-3 btn__upload">
                    Update
                </button>
            </div>
        </>
    );
}

export default UserInfo;

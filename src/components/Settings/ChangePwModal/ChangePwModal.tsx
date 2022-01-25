import { ChangeEvent, FC, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import ModalDialog from "../../../container/ModalDialog/ModalDialog";
import { instance } from "../../../util/interceptor";
import { MODAL_ROOT } from "../../../util/util";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const ChangePwModal: FC<ChangePwModalProps> = (props) => {
  const { t } = useTranslation();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const btnClasses =
    "w-full xl:w-1/2 text-center h-10 my-2 md:mx-2 bg-yellow-500 hover:bg-yellow-400 rounded text-white";

  const changePasswordHandler = async () => {
    setIsLoading(true);
    const resp = await instance.post("changepw", { oldPassword, newPassword });
    setIsLoading(false);
    if (resp.status === 200) {
      // TODO
    }
  };

  const changeOldPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setOldPassword(event.target.value);
  };

  const changeNewPasswordHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewPassword(event.target.value);
  };

  if (isLoading) {
    return createPortal(
      <ModalDialog close={props.onClose}>
        <h3 className="font-bold">{t("settings.change_pw")}</h3>
        <LoadingSpinner />
      </ModalDialog>,
      MODAL_ROOT
    );
  }

  return createPortal(
    <ModalDialog close={props.onClose}>
      <h3 className="font-bold">{t("settings.change_pw")}</h3>
      <div className="my-5 flex flex-col items-center justify-center text-center">
        <div className="w-full py-1 md:w-10/12">
          <label htmlFor="oldpw" className="label-underline">
            {t("settings.old_pw")}
          </label>
          <input
            id="oldpw"
            className="input-underline w-full"
            type="password"
            value={oldPassword}
            onChange={changeOldPasswordHandler}
            required
          />
        </div>
        <div className="w-full py-1 md:w-10/12">
          <label htmlFor="newpw" className="label-underline">
            {t("settings.new_pw")}
          </label>
          <input
            id="newpw"
            className="input-underline w-full"
            type="password"
            value={newPassword}
            onChange={changeNewPasswordHandler}
            required
          />
        </div>
        <div className="flex w-full flex-col pt-2 text-white md:w-2/3 xl:flex-row">
          <button className={btnClasses} onClick={props.onClose}>
            {t("settings.cancel")}
          </button>
          <button className={btnClasses} onClick={changePasswordHandler}>
            {t("settings.change_pw")}
          </button>
        </div>
      </div>
    </ModalDialog>,
    MODAL_ROOT
  );
};

export default ChangePwModal;

export interface ChangePwModalProps {
  onClose: () => void;
}

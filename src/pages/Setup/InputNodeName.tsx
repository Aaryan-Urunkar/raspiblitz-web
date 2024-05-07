import ConfirmModal from "@/components/ConfirmModal";
import SetupContainer from "@/layouts/SetupContainer";
import { Button, Input } from "@nextui-org/react";
import { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export type Props = {
  callback: (nodename: string | null) => void;
};

interface IFormInputs {
  inputNodeName: string;
}

export default function InputNodeName({ callback }: Props) {
  const [inputNodeName, setInputNodeName] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { t } = useTranslation();

  const changeNodenameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setInputNodeName(event.target.value);
  };

  const continueHandler = () => {
    callback(inputNodeName);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IFormInputs>({
    mode: "onChange",
  });

  return (
    <>
      {showConfirmModal && (
        <ConfirmModal
          confirmText={`${t("setup.cancel_setup")}?`}
          onClose={() => setShowConfirmModal(false)}
          onConfirm={() => callback(null)}
        />
      )}
      <SetupContainer>
        <form
          onSubmit={handleSubmit(continueHandler)}
          className="flex h-full flex-col items-center justify-center gap-8 p-8"
        >
          <h1 className="m-2 text-center text-3xl font-bold">
            {t("setup.input_node.header")}
          </h1>
          <Input
            className="w-full"
            type="text"
            label={t("setup.input_node.label")}
            placeholder="e.g. MyRaspiBlitz"
            isInvalid={!!errors.inputNodeName}
            errorMessage={errors.inputNodeName?.message}
            {...register("inputNodeName", {
              required: t("setup.input_node.err_empty"),
              onChange: changeNodenameHandler,
              pattern: {
                value: /^[a-zA-Z0-9]*$/,
                message: t("setup.input_node.err_only_chars"),
              },
              minLength: {
                value: 4,
                message: t("setup.input_node.err_min_length"),
              },
              maxLength: {
                value: 32,
                message: t("setup.input_node.err_max_length"),
              },
            })}
          />
          <article className="flex flex-col items-center justify-center gap-10">
            <Button
              type="submit"
              isDisabled={!isValid}
              color="primary"
              className="mt-8 rounded-full px-8 py-6 font-semibold"
            >
              {t("setup.continue")}
            </Button>
            <Button
              type="button"
              color="danger"
              variant="light"
              onClick={() => setShowConfirmModal(true)}
            >
              {t("setup.cancel")}
            </Button>
          </article>
        </form>
      </SetupContainer>
    </>
  );
}